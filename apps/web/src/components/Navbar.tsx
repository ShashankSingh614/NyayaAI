import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white bg-opacity-95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-legal-blue">
                Nyaya<span className="text-legal-gold">.Ai</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#features"
              className="text-legal-dark hover:text-legal-gold transition-colors"
            >
              {t('landing.features')}
            </a>
            <a
              href="#benefits"
              className="text-legal-dark hover:text-legal-gold transition-colors"
            >
              {t('landing.benefits')}
            </a>
            <a
              href="#community"
              className="text-legal-dark hover:text-legal-gold transition-colors"
            >
              {t('landing.community')}
            </a>
            <LanguageSelector />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User size={16} />
                    {user.name.split(' ')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200">
                  <DropdownMenuLabel>{t('navbar.profile')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === 'lawyer' ? (
                    <>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/lawyer-dashboard')}>
                        {t('lawyerDashboard.title')}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-default text-legal-gold">
                        {t('lawyerProfile.availability')}: {user.application_status}
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/chat')}>
                      {t('chat.title')}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                    <LogOut size={16} className="mr-2" />
                    {t('navbar.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-legal-blue text-legal-blue hover:bg-legal-blue hover:text-white"
                  >
                    {t('auth.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-legal-blue hover:bg-opacity-90 text-white">
                    {t('auth.register')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3 animate-fade-in">
            <a
              href="#features"
              className="block py-2 text-legal-dark hover:text-legal-gold"
              onClick={toggleMenu}
            >
              {t('landing.features')}
            </a>
            <a
              href="#benefits"
              className="block py-2 text-legal-dark hover:text-legal-gold"
              onClick={toggleMenu}
            >
              {t('benefits.forAllUsers')}
            </a>
            <a
              href="#community"
              className="block py-2 text-legal-dark hover:text-legal-gold"
              onClick={toggleMenu}
            >
              {t('landing.community')}
            </a>
            <div className="py-2 border-t border-gray-200 pt-3">
              <div className="text-sm font-semibold text-legal-dark mb-2 px-2">{t('navbar.selectLanguage')}</div>
              <LanguageSelector />
            </div>
            {user ? (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center px-2 py-2 mb-2 text-legal-blue font-medium">
                  <User size={18} className="mr-2" />
                  {user.name}
                  {user.role === 'lawyer' && (
                    <span className="ml-2 text-xs bg-legal-gold/20 text-legal-gold px-2 py-1 rounded-full">
                      {user.application_status}
                    </span>
                  )}
                </div>
                {user.role === 'lawyer' ? (
                  <Link to="/lawyer-dashboard" onClick={toggleMenu} className="block py-2 px-2 text-legal-dark hover:text-legal-gold">
                    {t('lawyerDashboard.title')}
                  </Link>
                ) : (
                  <Link to="/chat" onClick={toggleMenu} className="block py-2 px-2 text-legal-dark hover:text-legal-gold">
                    {t('chat.title')}
                  </Link>
                )}
                <Button
                  onClick={() => { handleLogout(); toggleMenu(); }}
                  className="w-full mt-2 bg-red-50 text-red-600 hover:bg-red-100 border-none justify-start"
                  variant="outline"
                >
                  <LogOut size={18} className="mr-2" />
                  {t('navbar.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="w-full border-legal-blue text-legal-blue hover:bg-legal-blue hover:text-white"
                    onClick={toggleMenu}
                  >
                    {t('auth.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    className="w-full bg-legal-blue hover:bg-opacity-90 text-white"
                    onClick={toggleMenu}
                  >
                    {t('auth.register')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;