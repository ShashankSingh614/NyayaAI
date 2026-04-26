
import React, { createContext, useState, useContext, useEffect } from "react";
import { sendMessageToGemini } from "@/utils/geminiApi";
import { useToast } from "@/components/ui/use-toast";

interface ChatContextType {
  messages: { text: string; isUser: boolean }[];
  isLoading: boolean;
  apiKey: string | null;
  apiKeyInput: string;
  isApiKeyDialogOpen: boolean;
  setApiKeyInput: (key: string) => void;
  setIsApiKeyDialogOpen: (isOpen: boolean) => void;
  sendMessage: (message: string) => Promise<void>;
  saveApiKey: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem("geminiApiKey") || ""
  );
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load API key from localStorage on first render
  useEffect(() => {
    const savedApiKey = localStorage.getItem("geminiApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      // Show dialog to enter API key if not found
      setIsApiKeyDialogOpen(true);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKeyInput.trim()) {
      // Basic validation for API key format (Google API keys are typically ~39 characters)
      if (apiKeyInput.trim().length < 20) {
        toast({
          title: "Invalid API Key",
          description: "The API key seems too short. Please check your key and try again.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      
      localStorage.setItem("geminiApiKey", apiKeyInput.trim());
      setApiKey(apiKeyInput.trim());
      setIsApiKeyDialogOpen(false);
      toast({
        title: "API Key Saved",
        description: "Your Gemini API key has been saved successfully.",
        duration: 3000,
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid API key.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const sendMessage = async (message: string) => {
    // Check if API key is available
    if (!apiKey) {
      setIsApiKeyDialogOpen(true);
      return;
    }

    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setIsLoading(true);

    try {
      // Send message to Gemini API
      const response = await sendMessageToGemini(message, apiKey);
      
      // Add AI response
      setMessages((prev) => [
        ...prev,
        { text: response.text, isUser: false },
      ]);
      
      // Check if the response contains an error message
      if (response.text.startsWith("Error:")) {
        toast({
          title: "API Response Error",
          description: response.text,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      
      // More specific error toast
      toast({
        title: "API Error",
        description: "Failed to get response from Gemini API. Please check your API key and network connection.",
        variant: "destructive",
        duration: 5000,
      });
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        { 
          text: "Sorry, I couldn't process your request. Please check your API key or try again later. Make sure you're using a correct Gemini API key from Google AI Studio.", 
          isUser: false 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    messages,
    isLoading,
    apiKey,
    apiKeyInput,
    isApiKeyDialogOpen,
    setApiKeyInput,
    setIsApiKeyDialogOpen,
    sendMessage,
    saveApiKey,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
