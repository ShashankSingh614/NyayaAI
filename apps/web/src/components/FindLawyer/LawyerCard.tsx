
import React from "react";
import { Star, MapPin, Clock, MessageCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lawyer } from "@/data/lawyers";
import { useNavigate } from "react-router-dom";

interface LawyerCardProps {
  lawyer: Lawyer;
}

export const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer }) => {
  const navigate = useNavigate();
  
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Busy":
        return "bg-yellow-100 text-yellow-800";
      case "Offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewProfile = () => {
    navigate(`/lawyer/${lawyer.id}`);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={handleViewProfile}>
      <CardContent className="p-6 flex-1">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={lawyer.profilePhoto}
            alt={lawyer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {lawyer.name}
            </h3>
            <p className="text-primary font-medium text-sm mb-2">
              {lawyer.specialization}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{lawyer.location}</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">{lawyer.rating}</span>
              <span className="text-gray-500 text-sm">({lawyer.reviewCount} reviews)</span>
            </div>
          </div>
          <Badge className={getAvailabilityColor(lawyer.availability)}>
            {lawyer.availability}
          </Badge>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {lawyer.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {lawyer.badges.map((badge, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {badge}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{lawyer.experience} years exp.</span>
          </div>
          <div className="font-semibold text-lg text-gray-900">
            ${lawyer.hourlyRate}/hr
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            // Handle message action
          }}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button 
          className="flex-1" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            // Handle book consultation action
          }}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Book Consultation
        </Button>
      </CardFooter>
    </Card>
  );
};
