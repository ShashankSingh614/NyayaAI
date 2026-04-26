import React, { useState } from "react";
import { Filter, MapPin, Star, DollarSign } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterState } from "@/pages/FindLawyer";

const specializations = [
  "Criminal Law",
  "Family Law",
  "Corporate Law",
  "Personal Injury",
  "Real Estate",
  "Immigration Law",
  "Tax Law",
  "Employment Law",
];

const indianCities = [
  "New Delhi",
  "Mumbai",
  "Bangalore",
  "Ahmedabad",
  "Chandigarh",
  "Pune",
  "Kolkata",
  "Chennai",
];

interface LawyerFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const LawyerFilters: React.FC<LawyerFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [priceRange, setPriceRange] = useState([filters.maxRate]);
  const [rating, setRating] = useState([filters.minRating]);
  const [selectedLocation, setSelectedLocation] = useState(
    filters.locations[0] || ""
  );

  const handleSpecializationChange = (spec: string, checked: boolean) => {
    const newSpecs = checked
      ? [...filters.specializations, spec]
      : filters.specializations.filter((s) => s !== spec);
    onFilterChange({ ...filters, specializations: newSpecs });
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    onFilterChange({ ...filters, locations: location ? [location] : [] });
  };

  const handleRatingChange = (value: number[]) => {
    setRating(value);
    onFilterChange({ ...filters, minRating: value[0] });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onFilterChange({ ...filters, maxRate: value[0] });
  };

  const handleResetFilters = () => {
    setSelectedLocation("");
    setRating([1]);
    setPriceRange([5000]);
    onFilterChange({
      searchQuery: filters.searchQuery,
      specializations: [],
      locations: [],
      minRating: 1,
      maxRate: 5000,
    });
  };

  return (
    <Sidebar className="w-80" collapsible="icon">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="font-semibold">Filters</h2>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6">
        {/* Location */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4" />
            Location
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Select value={selectedLocation} onValueChange={handleLocationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cities</SelectItem>
                {indianCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Specialization */}
        <SidebarGroup>
          <SidebarGroupLabel className="mb-3">
            Specialization
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-3">
            {specializations.map((spec) => (
              <div key={spec} className="flex items-center space-x-2">
                <Checkbox
                  id={spec}
                  checked={filters.specializations.includes(spec)}
                  onCheckedChange={(checked) =>
                    handleSpecializationChange(spec, checked as boolean)
                  }
                />
                <label htmlFor={spec} className="text-sm cursor-pointer">
                  {spec}
                </label>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Rating */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4" />
            Minimum Rating
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Slider
              value={rating}
              onValueChange={handleRatingChange}
              max={5}
              min={1}
              step={0.5}
            />
            <div className="flex justify-between text-sm mt-2">
              <span>1★</span>
              <span>{rating[0]}★</span>
              <span>5★</span>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Price */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4" />
            Max Hourly Rate
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={5000}
              min={500}
              step={100}
            />
            <div className="flex justify-between text-sm mt-2">
              <span>₹500</span>
              <span>₹{priceRange[0]}</span>
              <span>₹5000</span>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Buttons */}
        <SidebarGroup className="space-y-2">
          <Button className="w-full">Apply Filters</Button>
          <Button variant="outline" className="w-full" onClick={handleResetFilters}>
            Clear All
          </Button>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};