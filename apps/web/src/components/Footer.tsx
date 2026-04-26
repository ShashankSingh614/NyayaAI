
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-legal-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Nyaya<span className="text-legal-gold">.ai</span></h3>
            <p className="text-gray-300 mb-4">
              AI-powered legal assistance platform connecting people with answers and professionals.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-legal-gold transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-legal-gold transition-colors">For Individuals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-legal-gold transition-colors">For Professionals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-legal-gold transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-legal-gold transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-legal-gold transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-legal-gold transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-legal-gold transition-colors">Legal Guides</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-legal-gold transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-legal-gold transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-legal-gold transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-legal-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Nyaya.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
