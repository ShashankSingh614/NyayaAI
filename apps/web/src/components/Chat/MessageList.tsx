
import React, { useRef, useEffect } from "react";
import MessageItem from "./MessageItem";

interface ChatMessage {
  text: string;
  isUser: boolean;
  sectionNumber?: number;
  title?: string;
  similarity?: number;
}

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto px-4 pb-4"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      <div className="space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Start a conversation with Nyaya.Ai legal assistant
            </p>
          </div>
        )}
        
        {messages.map((message, i) => (
          <MessageItem key={i} message={message} />
        ))}
        
        {isLoading && <MessageItem message={{ text: "", isUser: false }} isLoading={true} />}
        
        <div ref={messagesEndRef} /> {/* Scroll anchor */}
      </div>
    </div>
  );
};

export default MessageList;
