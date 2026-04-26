
import React, { useMemo } from "react";
import { LawyerCard } from "./LawyerCard";
import { lawyersData } from "@/data/lawyers";

interface LawyerGridProps {
  searchQuery?: string;
}

export const LawyerGrid: React.FC<LawyerGridProps> = ({ searchQuery = "" }) => {
  const filteredLawyers = useMemo(() => {
    if (!searchQuery.trim()) {
      return lawyersData;
    }
    
    const query = searchQuery.toLowerCase();
    return lawyersData.filter((lawyer) => 
      lawyer.name.toLowerCase().includes(query) ||
      lawyer.specialization.toLowerCase().includes(query) ||
      lawyer.location.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Available Lawyers</h2>
          <p className="text-gray-600">{filteredLawyers.length} lawyers found</p>
        </div>
        <select className="border rounded-md px-3 py-2">
          <option>Sort by: Relevance</option>
          <option>Rating (High to Low)</option>
          <option>Price (Low to High)</option>
          <option>Experience</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLawyers.length > 0 ? (
          filteredLawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 text-lg">No lawyers found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
