
import React from "react";
import { Star, MapPin, Calendar, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lawyer } from "@/data/lawyers";

interface LawyerProfileHeaderProps {
  lawyer: Lawyer;
}

export const LawyerProfileHeader: React.FC<LawyerProfileHeaderProps> = ({ lawyer }) => {
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

  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={lawyer.profilePhoto}
            alt={lawyer.name}
            className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
          />
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{lawyer.name}</h1>
                <p className="text-xl text-primary font-semibold mb-2">{lawyer.specialization}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{lawyer.location}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{lawyer.rating}</span>
                  <span className="text-gray-500">({lawyer.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end gap-3">
                <Badge className={getAvailabilityColor(lawyer.availability)}>
                  {lawyer.availability}
                </Badge>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${lawyer.hourlyRate}/hr</div>
                  <div className="text-sm text-gray-600">{lawyer.experience} years experience</div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">{lawyer.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {lawyer.badges.map((badge, index) => (
                <Badge key={index} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1" size="lg">
                <Calendar className="h-4 w-4 mr-2" />
                Book Consultation
              </Button>
              <Button variant="outline" className="flex-1" size="lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
