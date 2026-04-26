
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { lawyersData } from "@/data/lawyers";
import { LawyerProfileHeader } from "@/components/LawyerProfile/LawyerProfileHeader";
import { LawyerProfileTimeline } from "@/components/LawyerProfile/LawyerProfileTimeline";
import { LawyerProfileContact } from "@/components/LawyerProfile/LawyerProfileContact";

const LawyerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const lawyer = lawyersData.find(l => l.id === Number(id));

  if (!lawyer) {
    return <Navigate to="/find-lawyer" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <LawyerProfileHeader lawyer={lawyer} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <LawyerProfileTimeline lawyer={lawyer} />
          </div>
          <div className="lg:col-span-1">
            <LawyerProfileContact lawyer={lawyer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;
