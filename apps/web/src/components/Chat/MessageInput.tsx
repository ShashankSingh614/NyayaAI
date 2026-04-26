
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading,
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
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="rounded-full p-2 aspect-square"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default MessageInput;
