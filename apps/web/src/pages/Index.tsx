import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/landingpage/HeroSection";
import FeaturesSection from "@/components/landingpage/FeaturesSection";
import { DocumentSummarySection } from "@/components/landingpage/DocumentSummarySection";
import BenefitsSection from "@/components/landingpage/BenefitsSection";
import CommunitySection from "@/components/landingpage/CommunitySection";
import CtaSection from "@/components/landingpage/CtaSection";
import Footer from "@/components/Footer";
import { Hero } from "@/components/landingpage/Hero";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <HeroSection />
      <FeaturesSection />
      <DocumentSummarySection />
      <BenefitsSection />
      <CommunitySection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
