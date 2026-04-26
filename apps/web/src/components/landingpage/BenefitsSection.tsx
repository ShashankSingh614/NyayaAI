
import React from 'react';
import { MessageCircle, User } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section id="benefits" className="section-padding bg-legal-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">Benefits</span> for All Users
          </h2>
          <p className="text-legal-gray text-lg">
            Whether you're seeking legal assistance or a legal professional, our platform offers unique advantages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* For Legal Assistance Seekers */}
          <div className="bg-white rounded-xl p-8 shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-legal-blue bg-opacity-10 p-3 rounded-full">
                <MessageCircle className="h-7 w-7 text-legal-blue" />
              </div>
              <h3 className="text-2xl font-semibold text-legal-blue">For Assistance Seekers</h3>
            </div>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">Get instant answers to legal questions anytime</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">Break language barriers with multilingual support</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">Use voice commands for hands-free assistance</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">Connect with verified legal professionals when needed</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">Access simplified explanations of complex legal concepts</span>
              </li>
            </ul>
          </div>

          {/* For Legal Professionals */}
          <div className="bg-white rounded-xl p-8 shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-legal-blue bg-opacity-10 p-3 rounded-full">
                <User className="h-7 w-7 text-legal-blue" />
              </div>
              <h3 className="text-2xl font-semibold text-legal-blue">For Legal Professionals</h3>
            </div>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">Share research and insights with the legal community</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">Publish anonymized case studies to demonstrate expertise</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">Engage with other professionals through comments and discussions</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">Receive client referrals based on expertise and location</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">Build reputation through contribution and engagement metrics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
