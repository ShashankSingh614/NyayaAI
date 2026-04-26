
import React from "react";
import { Button } from "@/components/ui/button";

interface Lawyer {
  id: number;
  name: string;
  profilePhoto: string;
  specialization: string;
  description: string;
}

const lawyers: Lawyer[] = [
  {
    id: 1,
    name: "John Doe",
    profilePhoto: "https://via.placeholder.com/150",
    specialization: "Criminal Law",
    description:
      "Experienced criminal defense attorney with 10+ years of practice in high-profile cases.",
  },
  {
    id: 2,
    name: "Jane Smith",
    profilePhoto: "https://via.placeholder.com/150",
    specialization: "Family Law",
    description:
      "Specialized in divorce, custody, and family dispute resolution with a compassionate approach.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    profilePhoto: "https://via.placeholder.com/150",
    specialization: "Corporate Law",
    description:
      "Expert in business law, mergers & acquisitions, and corporate governance.",
  },
];

export const LawyerList: React.FC = () => {
  return (
    <div className="px-4 pb-4 space-y-4">
      {lawyers.map((lawyer) => (
        <div
          key={lawyer.id}
          className="flex items-start gap-3 p-3 border rounded-lg"
        >
          <img
            src={lawyer.profilePhoto}
            alt={lawyer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base">
              {lawyer.name}
            </h3>
            <p className="text-sm text-primary/80">
              {lawyer.specialization}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {lawyer.description}
            </p>
          </div>
          <Button size="sm" className="shrink-0">
            Connect
          </Button>
        </div>
      ))}
    </div>
  );
};
