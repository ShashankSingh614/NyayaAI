
import React from "react";
import { Filter, MapPin, Star, DollarSign, Calendar } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const specializations = [
  "Criminal Law",
  "Family Law",
  "Corporate Law",
  "Personal Injury",
  "Real Estate",
  "Immigration",
  "Tax Law",
  "Employment Law",
];

const locations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
];

export const LawyerFilters: React.FC = () => {
  const [priceRange, setPriceRange] = React.useState([100]);
  const [rating, setRating] = React.useState([4]);

  return (
    <Sidebar className="w-80" collapsible="icon">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="font-semibold">Filters</h2>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Specialization</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-3">
            {specializations.map((spec) => (
              <div key={spec} className="flex items-center space-x-2">
                <Checkbox id={spec} />
                <label htmlFor={spec} className="text-sm font-medium leading-none">
                  {spec}
                </label>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Minimum Rating
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2">
              <Slider
                value={rating}
                onValueChange={setRating}
                max={5}
                min={1}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1</span>
                <span className="font-medium">{rating[0]} stars</span>
                <span>5</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Hourly Rate (max)
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                min={50}
                step={25}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>$50</span>
                <span className="font-medium">${priceRange[0]}/hr</span>
                <span>$1000+</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Availability
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="available-today" />
              <label htmlFor="available-today" className="text-sm font-medium leading-none">
                Available Today
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="available-week" />
              <label htmlFor="available-week" className="text-sm font-medium leading-none">
                Available This Week
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="free-consultation" />
              <label htmlFor="free-consultation" className="text-sm font-medium leading-none">
                Free Consultation
              </label>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="pt-4 space-y-2">
          <Button className="w-full">Apply Filters</Button>
          <Button variant="outline" className="w-full">Clear All</Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
