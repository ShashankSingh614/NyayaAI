
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LawyerFilters } from "@/components/FindLawyer/LawyerFilters";
import { LawyerGrid } from "@/components/FindLawyer/LawyerGrid";
import { LawyerSearchHeader } from "@/components/FindLawyer/LawyerSearchHeader";

export interface FilterState {
  searchQuery: string;
  specializations: string[];
  locations: string[];
  minRating: number;
  maxRate: number;
}

const FindLawyer = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    specializations: [],
    locations: [],
    minRating: 1,
    maxRate: 5000,
  });

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <LawyerFilters filters={filters} onFilterChange={handleFilterChange} />
        <div className="flex-1 flex flex-col">
          <LawyerSearchHeader onSearch={handleSearch} />
          <main className="flex-1 p-6">
            <LawyerGrid filters={filters} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FindLawyer;
