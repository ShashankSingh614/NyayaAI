
import React from "react";
import { Star, MapPin, MessageCircle, Phone, Award } from "lucide-react";
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

  // Generate initials avatar from lawyer name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleViewProfile = () => {
    navigate(`/lawyer/${lawyer.id}`);
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle message action
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${lawyer.phone}`;
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-200">
      <CardContent className="p-6 flex-1">
        {/* Header with photo and availability */}
        <div className="flex items-start gap-4 mb-4">
          {lawyer.profilePhoto ? (
            <img
              src={lawyer.profilePhoto}
              alt={lawyer.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-legal-gold/20"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-legal-gold/20 ring-2 ring-legal-gold/20 flex items-center justify-center">
              <span className="text-lg font-bold text-legal-gold">{getInitials(lawyer.name)}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">
              {lawyer.name}
            </h3>
            <p className="text-legal-gold font-semibold text-sm mb-2">
              {lawyer.specialization}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
              <MapPin className="h-3.5 w-3.5 text-legal-gold" />
              <span className="truncate">{lawyer.city}, {lawyer.state}</span>
            </div>
          </div>
          <Badge className={`${getAvailabilityColor(lawyer.availability)} whitespace-nowrap`}>
            {lawyer.availability}
          </Badge>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1 mb-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(lawyer.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="font-bold text-sm ml-1">{lawyer.rating}</span>
          <span className="text-xs text-gray-500">({lawyer.reviewCount})</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {lawyer.description}
        </p>

        {/* Badge highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {lawyer.badges.slice(0, 2).map((badge, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-legal-gold/10 text-legal-gold border-legal-gold/20">
              {badge}
            </Badge>
          ))}
        </div>

        {/* Experience and Languages */}
        <div className="space-y-2 text-sm mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-700">
            <Award className="h-4 w-4 text-legal-gold" />
            <span className="font-medium">{lawyer.experience} years experience</span>
          </div>
          {lawyer.languages.length > 0 && (
            <div className="text-xs text-gray-600">
              <span className="font-medium">Languages:</span> {lawyer.languages.join(", ")}
            </div>
          )}
        </div>

        {/* Price and Specializations */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="text-xl font-bold text-gray-900">₹{lawyer.hourlyRate}</span>
            <span className="text-gray-500">/hour</span>
          </div>
          <Badge variant="outline" className="bg-blue-50 border-blue-200">
            {lawyer.state}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-4 flex gap-2">
        <Button 
          className="flex-1 bg-legal-gold hover:bg-legal-gold/90 text-white"
          size="sm"
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleCall}
          title={lawyer.phone}
        >
          <Phone className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleMessage}
          title={lawyer.email}
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
