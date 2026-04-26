import React from "react";
import { Button } from "@/components/ui/button";
import { Headphones, MessageCircle, Languages } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-white to-legal-light">
      <div className="container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:pr-10">
            <div className="relative w-max rounded-full bg-gradient-to-r from-legal-blue to-legal-gold p-[2px]">
              {/* <Link
                to="/"
                className="bg-white rounded-full px-3 py-1 gap-2 text-slate-700 flex items-center w-max hover:bg-slate-100 transition-colors duration-150"
                rel="noopener noreferrer"
              >
                Try out Naaya.AI 🚀
              </Link> */}
            </div>

            {/* <div className="relative w-max group">
              <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-legal-blue to-legal-gold group-hover:opacity-100 opacity-50 transition-opacity duration-100"></div>
              <Link
                to="/"
                className="relative bg-slate-100 bg-opacity-20 rounded-full px-3 py-1 gap-2 text-slate-700 flex w-max group-hover:bg-opacity-40 duration-100"
                rel="noopener noreferrer"
              >
                Try out Naaya.AI 🚀
              </Link>
            </div> */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="gradient-text">Legal Assistance</span> Powered by
              AI
            </h1>

            <p className="text-lg text-legal-gray md:text-xl mt-4">
              Get instant legal answers, solutions, and professional
              recommendations in multiple languages using voice or text.
            </p>

            {/* <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-legal-blue hover:bg-opacity-90 text-white px-8 py-6 text-lg">
                Try Now
              </Button>
              <Button
                variant="outline"
                className="border-legal-blue text-legal-blue hover:bg-legal-blue hover:text-white px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </div> */}

            {/* <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-legal-gold" />
                <span className="text-legal-dark">AI Chatbot</span>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-legal-gold" />
                <span className="text-legal-dark">Multilingual</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-legal-gold" />
                <span className="text-legal-dark">Voice Enabled</span>
              </div>
            </div> */}
          </div>

          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-legal-blue to-legal-gold rounded-2xl shadow-2xl overflow-hidden relative">
              <div className="absolute inset-1 bg-white rounded-xl flex items-center justify-center">
                <div className="max-w-xs mx-auto p-5">
                  <div className="bg-legal-light p-4 rounded-lg mb-4 shadow-sm">
                    <p className="text-legal-dark">
                      What are my rights as a tenant if my landlord hasn't fixed
                      a major plumbing issue?
                    </p>
                  </div>
                  <div className="bg-legal-blue bg-opacity-10 p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-legal-dark">
                      According to tenant laws in most jurisdictions, landlords
                      are required to maintain habitable living conditions. For
                      a major plumbing issue, you typically have the right to:
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-sm text-legal-dark">
                      <li>Formal written notice to repair</li>
                      <li>Withhold rent in some cases</li>
                      <li>Repair and deduct costs</li>
                      <li>Break lease without penalty</li>
                    </ul>
                    <p className="text-xs text-legal-gray mt-3 italic">
                      Would you like me to recommend a tenant rights attorney in
                      your area?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-full shadow-soft">
              <div className="bg-legal-gold rounded-full p-2">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-white p-3 rounded-full shadow-soft animate-float">
              <div className="bg-legal-blue rounded-full p-2">
                <Headphones className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
