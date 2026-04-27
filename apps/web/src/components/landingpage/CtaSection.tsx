import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const CtaSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-legal-blue to-legal-blue/90 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-lg mb-8 text-white/80">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-legal-gold hover:bg-opacity-90 text-white border-none px-8 py-6 text-lg" asChild>
              <Link to="/register">{t('cta.getStarted')}</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-legal-blue px-8 py-6 text-lg">
              {t('cta.scheduleDemo')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;