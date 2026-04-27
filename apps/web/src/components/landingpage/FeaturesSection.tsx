import React from 'react';
import { MessageCircle, Languages, Headphones, User, Share, ThumbsUp } from "lucide-react";
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <MessageCircle className="h-10 w-10 text-legal-gold" />,
      title: t('landing.feature1Title'),
      description: t('landing.feature1Desc')
    },
    {
      icon: <Languages className="h-10 w-10 text-legal-gold" />,
      title: t('features.multilingualTitle'),
      description: t('features.multilingualDesc')
    },
    // {
    //   icon: <Headphones className="h-10 w-10 text-legal-gold" />,
    //   title: t('features.voiceTitle'),
    //   description: t('features.voiceDesc')
    // },
    {
      icon: <User className="h-10 w-10 text-legal-gold" />,
      title: t('features.lawyerRecommendationsTitle'),
      description: t('features.lawyerRecommendationsDesc')
    },
    {
      icon: <Share className="h-10 w-10 text-legal-gold" />,
      title: t('landing.feature3Title'),
      description: t('landing.feature3Desc')
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-legal-gold" />,
      title: t('features.communityTitle'),
      description: t('features.communityDesc')
    }
  ];

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('features.heading')} <span className="gradient-text">{t('landing.features')}</span> {t('features.forEveryone')}
          </h2>
          <p className="text-legal-gray text-lg">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-legal-light p-6 rounded-xl shadow-soft hover-scale flex flex-col items-center text-center h-full"
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