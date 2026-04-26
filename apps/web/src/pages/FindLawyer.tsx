
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LawyerFilters } from "@/components/FindLawyer/LawyerFilters";
import { LawyerGrid } from "@/components/FindLawyer/LawyerGrid";
import { LawyerSearchHeader } from "@/components/FindLawyer/LawyerSearchHeader";

const FindLawyer = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <LawyerFilters />
        <div className="flex-1 flex flex-col">
          <LawyerSearchHeader />
          <main className="flex-1 p-6">
            <LawyerGrid />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FindLawyer;
