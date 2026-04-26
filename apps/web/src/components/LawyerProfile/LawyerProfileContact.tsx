
import React from "react";
import { Mail, Phone, Linkedin, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lawyer } from "@/data/lawyers";

interface LawyerProfileContactProps {
  lawyer: Lawyer;
}

export const LawyerProfileContact: React.FC<LawyerProfileContactProps> = ({ lawyer }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <a href={`mailto:${lawyer.email}`} className="text-primary hover:underline">
                {lawyer.email}
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <a href={`tel:${lawyer.phone}`} className="text-primary hover:underline">
                {lawyer.phone}
              </a>
            </div>
          </div>
          
          {lawyer.linkedinUrl && (
            <div className="flex items-center gap-3">
              <Linkedin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">LinkedIn</p>
                <a 
                  href={lawyer.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full" size="sm">
            Schedule Consultation
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            Request Quote
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            Download Resume
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              lawyer.availability === 'Available' 
                ? 'bg-green-100 text-green-800' 
                : lawyer.availability === 'Busy'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {lawyer.availability}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {lawyer.availability === 'Available' 
                ? 'Ready to take new cases'
                : lawyer.availability === 'Busy'
                ? 'Limited availability'
                : 'Not currently available'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
