
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { LawyerList } from "./LawyerList";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  text: string;
  isUser: boolean;
  sectionNumber?: number;
  title?: string;
  similarity?: number;
}

interface MessageItemProps {
  message: ChatMessage;
  isLoading?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isLoading }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  if (isLoading) {
    return (
      <div className="bg-muted rounded-lg p-4 max-w-[85%] md:max-w-[75%] flex items-center space-x-2">
        <div className="animate-pulse h-3 w-3 bg-primary rounded-full"></div>
        <div className="animate-pulse h-3 w-3 bg-primary rounded-full delay-200"></div>
        <div className="animate-pulse h-3 w-3 bg-primary rounded-full delay-500"></div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg p-4 max-w-[85%] md:max-w-[75%]",
        message.isUser
          ? "ml-auto bg-primary text-primary-foreground"
          : "bg-muted"
      )}
    >
      {/* Display metadata for AI responses */}
      {!message.isUser && (message.sectionNumber || message.title) && (
        <div className="mb-3 flex flex-wrap gap-2">
          {message.sectionNumber && (
            <Badge variant="outline" className="text-xs">
              Section {message.sectionNumber}
            </Badge>
          )}
        </div>
      )}
      
      {/* Message text */}
      <p className="whitespace-pre-wrap break-words">{message.text}</p>
      
      {/* Connect with Lawyers button for AI responses */}
      {!message.isUser && (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() => setIsDrawerOpen(true)}
            >
              Connect with Lawyers
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader className="py-3">
              <DrawerTitle className="text-xl font-semibold">
                Connect with Nyaya.Ai Lawyers
              </DrawerTitle>
            </DrawerHeader>
            <LawyerList />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default MessageItem;
