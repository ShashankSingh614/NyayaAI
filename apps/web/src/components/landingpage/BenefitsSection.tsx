import React from 'react';
import { MessageCircle, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BenefitsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="benefits" className="section-padding bg-legal-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">{t('landing.benefits')}</span> {t('benefits.forAllUsers')}
          </h2>
          <p className="text-legal-gray text-lg">
            {t('benefits.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* For Legal Assistance Seekers */}
          <div className="bg-white rounded-xl p-8 shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-legal-blue bg-opacity-10 p-3 rounded-full">
                <MessageCircle className="h-7 w-7 text-legal-blue" />
              </div>
              <h3 className="text-2xl font-semibold text-legal-blue">{t('benefits.forSeekers')}</h3>
            </div>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">{t('benefits.seeker1')}</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">{t('benefits.seeker2')}</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">{t('benefits.seeker3')}</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">{t('benefits.seeker4')}</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">{t('benefits.seeker5')}</span>
              </li>
            </ul>
          </div>

          {/* For Legal Professionals */}
          <div className="bg-white rounded-xl p-8 shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-legal-blue bg-opacity-10 p-3 rounded-full">
                <User className="h-7 w-7 text-legal-blue" />
              </div>
              <h3 className="text-2xl font-semibold text-legal-blue">{t('benefits.forProfessionals')}</h3>
            </div>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">{t('benefits.pro1')}</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">{t('benefits.pro2')}</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">{t('benefits.pro3')}</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">{t('benefits.pro4')}</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-legal-gold rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-legal-dark">{t('benefits.pro5')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;