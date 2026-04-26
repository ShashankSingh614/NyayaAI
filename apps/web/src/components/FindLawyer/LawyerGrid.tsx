
import React, { useMemo, useState } from "react";
import { LawyerCard } from "./LawyerCard";
import { lawyersData } from "@/data/lawyers";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterState } from "@/pages/FindLawyer";

interface LawyerGridProps {
  filters: FilterState;
}

type SortOption = "relevance" | "rating" | "price-low" | "experience";

export const LawyerGrid: React.FC<LawyerGridProps> = ({ filters }) => {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  const filteredAndSortedLawyers = useMemo(() => {
    let result = [...lawyersData];

    // Apply search query filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter((lawyer) =>
        lawyer.name.toLowerCase().includes(query) ||
        lawyer.specialization.toLowerCase().includes(query) ||
        lawyer.location.toLowerCase().includes(query) ||
        lawyer.city.toLowerCase().includes(query) ||
        lawyer.state.toLowerCase().includes(query)
      );
    }

    // Apply specialization filter
    if (filters.specializations.length > 0) {
      result = result.filter((lawyer) =>
        filters.specializations.includes(lawyer.specialization)
      );
    }

    // Apply location filter
    if (filters.locations.length > 0) {
      result = result.filter((lawyer) =>
        filters.locations.includes(lawyer.city)
      );
    }

    // Apply rating filter
    result = result.filter((lawyer) => lawyer.rating >= filters.minRating);

    // Apply price filter
    result = result.filter((lawyer) => lawyer.hourlyRate <= filters.maxRate);

    // Apply sorting
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        result.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case "experience":
        result.sort((a, b) => b.experience - a.experience);
        break;
      case "relevance":
      default:
        // Keep original order
        break;
    }

    return result;
  }, [filters, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header and Sort */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Find Your Lawyer</h2>
          <p className="text-gray-600 mt-1">
            {filteredAndSortedLawyers.length} lawyer{filteredAndSortedLawyers.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Sort by: Relevance</SelectItem>
            <SelectItem value="rating">Rating (High to Low)</SelectItem>
            <SelectItem value="price-low">Price (Low to High)</SelectItem>
            <SelectItem value="experience">Experience (Most to Least)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lawyer Grid */}
      {filteredAndSortedLawyers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fadeIn">
          {filteredAndSortedLawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg font-medium">No lawyers found</p>
          <p className="text-gray-500 text-sm mt-2">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
    </div>
  );
};
