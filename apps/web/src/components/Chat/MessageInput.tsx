
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  apiKey: string | null;
  onOpenApiKeyDialog: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading,
  apiKey,
  onOpenApiKeyDialog,
}) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput("");
  };

  return (
    <footer className="border-t w-full bg-background">
      <div className="px-4 py-4">
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon" className="rounded-full">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button> */}
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 rounded-md resize-none min-h-[40px] max-h-[120px] py-2"
            rows={1}
          />
          <Button
            onClick={handleSend}
            className="rounded-full p-2 aspect-square"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        {!apiKey && (
          <div className="mt-2 text-center">
            <Button
              variant="outline"
              onClick={onOpenApiKeyDialog}
              className="text-sm text-muted-foreground"
            >
              Set up API Key
            </Button>
          </div>
        )}
        {apiKey && (
          <div className="mt-2 text-center">
            <Button
              variant="ghost"
              onClick={onOpenApiKeyDialog}
              className="text-xs text-muted-foreground"
              size="sm"
            >
              Change API Key
            </Button>
          </div>
        )}
      </div>
    </footer>
  );
};

export default MessageInput;
