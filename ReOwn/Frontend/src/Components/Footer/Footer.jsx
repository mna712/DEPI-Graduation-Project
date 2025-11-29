import React from 'react';
import { Facebook, Linkedin, MessageCircle, Mail, Phone, MapPin, Instagram, Twitter, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="fixed relative overflow-hidden text-white bg-gradient-to-br from-green-900 via-green-800 to-teal-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 bg-yellow-400 rounded-full left-1/4 w-72 h-72 blur-3xl"></div>
        <div className="absolute bottom-0 bg-teal-400 rounded-full right-1/4 w-96 h-96 blur-3xl"></div>
      </div>

      {/* Footer Content */}
      <div className="relative px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-green-900 transform bg-yellow-400 rounded-lg shadow-lg -rotate-12">
                R
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                eOwn
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-green-100">
              Give your items a new home and contribute to a sustainable future. Buy, sell, and discover amazing pre-loved treasures.
            </p>
            <div className="flex pt-2 space-x-3">
              <a href="#" className="p-2 transition-all duration-300 transform rounded-lg bg-white/10 hover:bg-yellow-400 hover:text-green-900 hover:scale-110 hover:-rotate-6">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 transition-all duration-300 transform rounded-lg bg-white/10 hover:bg-yellow-400 hover:text-green-900 hover:scale-110 hover:rotate-6">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 transition-all duration-300 transform rounded-lg bg-white/10 hover:bg-yellow-400 hover:text-green-900 hover:scale-110 hover:-rotate-6">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 transition-all duration-300 transform rounded-lg bg-white/10 hover:bg-yellow-400 hover:text-green-900 hover:scale-110 hover:rotate-6">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2 text-xl font-bold text-yellow-400">
              <div className="w-1 h-6 bg-yellow-400 rounded-full"></div>
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-2">
              {['About Us', 'How It Works', 'Success Stories', 'Blog', 'Careers'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="flex items-center space-x-2 text-green-100 transition-all duration-300 hover:text-yellow-400 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300"></span>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2 text-xl font-bold text-yellow-400">
              <div className="w-1 h-6 bg-yellow-400 rounded-full"></div>
              <span>Support</span>
            </h3>
            <ul className="space-y-2">
              {['Help Center', 'Safety Tips', 'Terms & Conditions', 'Privacy Policy', 'Report Issue'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="flex items-center space-x-2 text-green-100 transition-all duration-300 hover:text-yellow-400 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300"></span>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2 text-xl font-bold text-yellow-400">
              <div className="w-1 h-6 bg-yellow-400 rounded-full"></div>
              <span>Get In Touch</span>
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:support@reown.com" className="flex items-center space-x-3 text-green-100 transition-colors duration-300 hover:text-yellow-400 group">
                <div className="p-2 transition-all duration-300 rounded-lg bg-white/10 group-hover:bg-yellow-400 group-hover:text-green-900">
                  <Mail size={18} />
                </div>
                <span className="text-sm">support@reown.com</span>
              </a>
              
              <a href="tel:+201234567890" className="flex items-center space-x-3 text-green-100 transition-colors duration-300 hover:text-yellow-400 group">
                <div className="p-2 transition-all duration-300 rounded-lg bg-white/10 group-hover:bg-yellow-400 group-hover:text-green-900">
                  <Phone size={18} />
                </div>
                <span className="text-sm">+20 123 456 7890</span>
              </a>
              
              <div className="flex items-start space-x-3 text-green-100">
                <div className="p-2 rounded-lg bg-white/10">
                  <MapPin size={18} />
                </div>
                <span className="text-sm">Cairo, Egypt</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="mb-3 text-sm text-green-100">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 text-white placeholder-green-200 transition-colors duration-300 border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:border-yellow-400"
                />
                <button className="p-2 text-green-900 transition-all duration-300 transform bg-yellow-400 rounded-lg shadow-lg hover:bg-yellow-300 hover:scale-105">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/20">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-green-200">
              © 2026 ReOwn. All rights reserved. Made with 💚 in Egypt
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-green-200 transition-colors duration-300 hover:text-yellow-400">
                Sitemap
              </a>
              <a href="#" className="text-sm text-green-200 transition-colors duration-300 hover:text-yellow-400">
                Cookies
              </a>
              <a href="#" className="text-sm text-green-200 transition-colors duration-300 hover:text-yellow-400">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
    </footer>
  );
}


