import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { BookOpen, Users } from "lucide-react";

export function Hero() {
  const navigate = useNavigate();

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
          <Link
            to="/"
            className="bg-slate-100 border bg-opacity-20 border-slate-400 rounded-full px-3 flex w-max py-1 gap-2 text-slate-700 hover:bg-opacity-40 duration-100 mx-auto"
            rel="noopener noreferrer"
          >
            Try out Naaya.AI 🚀
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Master Legal Knowledge & Connect with Expert Lawyers
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Experience the future of legal learning with our AI-powered
            platform. Get personalized guidance, connect with experienced
            lawyers, and build your legal expertise efficiently.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="group"
              onClick={() => navigate("/chat")}
            >
              <BookOpen className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Learning
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="group"
              onClick={() => navigate("/lawyers")}
            >
              <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Find a Lawyer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
