
import React, { createContext, useState, useContext } from "react";
import { sendMessageToHuggingFace } from "@/utils/huggingfaceApi";
import { useToast } from "@/components/ui/use-toast";

interface ChatMessage {
  text: string;
  isUser: boolean;
  sectionNumber?: number;
  title?: string;
  similarity?: number;
}

interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (query: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: query, isUser: true }]);
    setIsLoading(true);

    try {
      // Send query to Hugging Face Chat API (BNS Chatbot)
      const response = await sendMessageToHuggingFace(query);
      
      if (response.status === "success") {
        // Extract the AI-generated explanation
        const responseText = response.explanation || "No explanation available";
        
        // Add AI response with metadata
        setMessages((prev) => [
          ...prev,
          { 
            text: responseText, 
            isUser: false,
            sectionNumber: response.section_number,
            title: response.title,
            similarity: response.similarity_score
          },
        ]);
      } else if (response.status === "no_match") {
        // No matching section found
        setMessages((prev) => [
          ...prev,
          { 
            text: `${response.message}\n\n${response.suggestion}`, 
            isUser: false 
          },
        ]);
        
        toast({
          title: "No Match Found",
          description: "Could not find a matching legal section. Try rephrasing your query.",
          variant: "default",
          duration: 4000,
        });
      } else {
        throw new Error(response.message || "Unknown error from API");
      }
    } catch (error) {
      console.error("Error sending message to Hugging Face:", error);
      
      // More specific error toast
      toast({
        title: "API Error",
        description: error instanceof Error ? error.message : "Failed to get response from the chat API.",
        variant: "destructive",
        duration: 5000,
      });
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        { 
          text: error instanceof Error 
            ? `Sorry, I encountered an error: ${error.message}` 
            : "Sorry, I couldn't process your request. Please try again.",
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
    sendMessage,
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
