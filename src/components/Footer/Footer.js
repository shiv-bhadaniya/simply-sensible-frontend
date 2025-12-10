import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-secondary-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-6 block">
              Simply Sensible
            </span>
            <p className="text-secondary-500 text-sm leading-relaxed">
              Making sense of your snacks with premium quality and sensible choices. Healthy living starts with what you eat.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-secondary-900 tracking-wider uppercase mb-6">Shop</h3>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-secondary-500 hover:text-primary-600 transition-colors text-sm font-medium">All Products</Link></li>
              <li><Link to="/shop" className="text-secondary-500 hover:text-primary-600 transition-colors text-sm font-medium">New Arrivals</Link></li>
              <li><Link to="/shop" className="text-secondary-500 hover:text-primary-600 transition-colors text-sm font-medium">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-secondary-900 tracking-wider uppercase mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-secondary-500 hover:text-primary-600 transition-colors text-sm font-medium">About Us</Link></li>
              <li><Link to="#" className="text-secondary-500 hover:text-primary-600 transition-colors text-sm font-medium">Careers</Link></li>
              <li><a href="mailto:contact@simplysensible.com" className="text-secondary-500 hover:text-primary-600 transition-colors text-sm font-medium">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-secondary-900 tracking-wider uppercase mb-6">Stay Updated</h3>
            <p className="text-secondary-500 text-sm mb-4 leading-relaxed">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 min-w-0 px-4 py-2.5 text-sm text-secondary-900 placeholder-secondary-400 bg-secondary-50 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
              <button className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all hover:shadow-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-400 text-sm">
            &copy; {new Date().getFullYear()} Simply Sensible. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-secondary-400 hover:text-secondary-600 transition-colors">
              <span className="sr-only">Facebook</span>
              {/* Add social icons here if needed */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
