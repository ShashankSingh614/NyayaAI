
import React from 'react';
import { MessageCircle, Languages, Headphones, User, Share, ThumbsUp } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageCircle className="h-10 w-10 text-legal-gold" />,
      title: "AI Legal Assistant",
      description: "Get instant answers to your legal questions through our intelligent chatbot trained on legal precedents and regulations."
    },
    {
      icon: <Languages className="h-10 w-10 text-legal-gold" />,
      title: "Multilingual Support",
      description: "Access legal assistance in multiple languages, breaking down communication barriers for diverse users."
    },
    {
      icon: <Headphones className="h-10 w-10 text-legal-gold" />,
      title: "Voice Interaction",
      description: "Speak your legal questions and receive voiced responses for a natural and accessible experience."
    },
    {
      icon: <User className="h-10 w-10 text-legal-gold" />,
      title: "Lawyer Recommendations",
      description: "Receive curated recommendations for legal professionals specialized in your specific needs."
    },
    {
      icon: <Share className="h-10 w-10 text-legal-gold" />,
      title: "Case Sharing",
      description: "Legal professionals can share anonymized cases and insights to foster a collaborative community."
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-legal-gold" />,
      title: "Community Engagement",
      description: "Engage with content through comments, likes, and shares to build a vibrant professional network."
    }
  ];

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Powerful <span className="gradient-text">Features</span> for Everyone
          </h2>
          <p className="text-legal-gray text-lg">
            Our platform bridges the gap between legal assistance seekers and professionals with innovative tools and technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-legal-light p-6 rounded-xl shadow-soft hover-scale"
            >
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-5 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-legal-dark">{feature.title}</h3>
              <p className="text-legal-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
