
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LawyerSearchHeader: React.FC = () => {
  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Find a Lawyer</h1>
          <p className="text-muted-foreground mb-6">
            Connect with experienced legal professionals who can help with your case
          </p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, specialization, or location..."
                className="pl-10"
              />
            </div>
            <Button>Search</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
