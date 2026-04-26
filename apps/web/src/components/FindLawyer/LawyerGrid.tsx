
import React from "react";
import { LawyerCard } from "./LawyerCard";
import { lawyersData } from "@/data/lawyers";

export const LawyerGrid: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Available Lawyers</h2>
          <p className="text-gray-600">{lawyersData.length} lawyers found</p>
        </div>
        <select className="border rounded-md px-3 py-2">
          <option>Sort by: Relevance</option>
          <option>Rating (High to Low)</option>
          <option>Price (Low to High)</option>
          <option>Experience</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {lawyersData.map((lawyer) => (
          <LawyerCard key={lawyer.id} lawyer={lawyer} />
        ))}
      </div>
    </div>
  );
};
