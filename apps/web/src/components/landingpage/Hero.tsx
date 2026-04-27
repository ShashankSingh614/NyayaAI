import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Users, Scale } from "lucide-react";
import { useTranslation } from 'react-i18next';

export function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative bg-white pt-40 pb-16 sm:pt-32 sm:pb-24">
      <div className="absolute pt-10 inset-0">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
          alt="Law Library"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* <Link
            to="/"
            className="bg-slate-100 border bg-opacity-20 border-slate-400 rounded-full px-3 flex w-max py-1 gap-2 text-slate-700 hover:bg-opacity-40 duration-100 mx-auto"
            rel="noopener noreferrer"
          >
            Try out Naaya.AI 🚀
          </Link> */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {t('landing.heroTitle')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            {t('landing.heroDescription')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="group"
              onClick={() => navigate("/chat")}
            >
              <Scale className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t('landing.feature1Title')}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="group"
              onClick={() => navigate("/lawyers")}
            >
              <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t('common.findLawyer')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}