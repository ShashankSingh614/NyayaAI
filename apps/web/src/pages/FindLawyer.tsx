
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { SidebarProvider } from "@/components/ui/sidebar";
import { LawyerGrid } from "@/components/FindLawyer/LawyerGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lawyersData } from "@/data/lawyers";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface FilterState {
  searchQuery: string;
  specializations: string[];
  locations: string[];
  minRating: number;
  maxRate: number;
}

const FindLawyer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    specializations: [],
    locations: [],
    minRating: 1,
    maxRate: 10000,
  });

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <div className="flex-1 flex flex-col">
          {/* Header with Home Button and Search */}
          <div className="bg-white border-b shadow-sm">
            <div className="container mx-auto px-6 py-6">
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2"
                  title="Go to Home"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('common.home')}</span>
                </Button>
                <h1 className="text-3xl font-bold text-legal-blue">{t('findLawyer.title')}</h1>
              </div>
              <p className="text-muted-foreground mb-6">{t('findLawyer.subtitle')}</p>
              
              {/* AI-Powered Search */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <label className="block text-sm font-semibold text-legal-dark mb-3">
                  {t('findLawyer.askAiForLawyers')}
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder={t('findLawyer.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                    disabled={isSearching}
                  />
                  <Button
                    onClick={handleSearchSubmit}
                    disabled={isSearching || !searchQuery.trim()}
                    className="bg-legal-blue hover:bg-legal-blue/90"
                  >
                    {isSearching && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    {t('common.search')}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {t('findLawyer.askAiForLawyers')} - Search by specialization, location, experience, or legal needs
                </p>
              </div>
            </div>
          </div>

          {/* Lawyers Grid */}
          <main className="flex-1 p-6">
            {filters.searchQuery ? (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('common.search')}: <span className="font-semibold text-legal-dark">"{filters.searchQuery}"</span>
                </p>
                <LawyerGrid filters={filters} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  {t('findLawyer.noResults')}
                </p>
                <p className="text-sm text-muted-foreground">
                  Start by describing your legal needs or searching for a lawyer's specialization
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FindLawyer;
