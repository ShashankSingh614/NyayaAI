
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { LawyerList } from "./LawyerList";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lawyer } from "@/data/lawyers";
import { Star, MapPin, Briefcase } from "lucide-react";

interface ChatMessage {
  text: string;
  isUser: boolean;
  sectionNumber?: number;
  title?: string;
  similarity?: number;
  recommendedLawyers?: Lawyer[];
}

interface MessageItemProps {
  message: ChatMessage;
  isLoading?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isLoading }) => {
  const { t } = useTranslation();
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
      
      {/* Recommended Lawyers */}
      {!message.isUser && message.recommendedLawyers && message.recommendedLawyers.length > 0 && (
        <div className="mt-4 space-y-3">
          <div className="text-sm font-semibold text-muted-foreground">
            {t('chat.recommendedLawyers')}
          </div>
          {message.recommendedLawyers.map((lawyer) => (
            <Card key={lawyer.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{lawyer.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Briefcase className="w-3 h-3" />
                      {lawyer.specialization}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{lawyer.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {lawyer.city}, {lawyer.state}
                </div>
                <div className="text-muted-foreground">
                  {lawyer.experience} years experience • ₹{lawyer.hourlyRate}/hour
                </div>
                <Button size="sm" className="w-full mt-2 bg-legal-gold hover:bg-legal-gold/90 text-white">
                  {t('findLawyer.contactLawyer')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Connect with Lawyers button for AI responses */}
      {!message.isUser && (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() => setIsDrawerOpen(true)}
            >
              {t('chat.connectWithLawyers')}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader className="py-3">
              <DrawerTitle className="text-xl font-semibold">
                {t('chat.connectWithLawyers')}
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
