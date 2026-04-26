import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChatProvider, useChat } from "@/context/ChatContext";
import ApiKeyDialog from "./ApiKeyDialog";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatAreaContent = () => {
  const {
    messages,
    isLoading,
    apiKey,
    apiKeyInput,
    isApiKeyDialogOpen,
    setApiKeyInput,
    setIsApiKeyDialogOpen,
    sendMessage,
    saveApiKey,
  } = useChat();

  return (
    <div className="flex h-full flex-col w-full">
      {/* Main Content */}
      <main className="flex-1 overflow-hidden pt-16">
        <div className="flex h-full flex-col">
          {/* API Key Dialog */}
          <ApiKeyDialog 
            isOpen={isApiKeyDialogOpen} 
            onOpenChange={setIsApiKeyDialogOpen}
            apiKeyInput={apiKeyInput}
            setApiKeyInput={setApiKeyInput}
            saveApiKey={saveApiKey}
          />

          {/* Chat messages container with proper scrolling */}
          <MessageList messages={messages} isLoading={isLoading} />
        </div>
      </main>

      {/* Footer */}
      <MessageInput 
        onSendMessage={sendMessage}
        isLoading={isLoading}
        apiKey={apiKey}
        onOpenApiKeyDialog={() => setIsApiKeyDialogOpen(true)}
      />

      {/* Mobile Dialog */}
      <Dialog>
        <DialogContent>
          {/* Add your dialog content here */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Main component that provides the context
export default function ChatArea() {
  return (
    <ChatProvider>
      <ChatAreaContent />
    </ChatProvider>
  );
}
