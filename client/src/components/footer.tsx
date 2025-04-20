import { Icons, getIcon } from "./icons";
import React from "react";
import { useLocation } from "wouter";

const Footer = () => {
  const [_, setLocation] = useLocation();
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Icons.logo className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl">MockPrep.online</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your comprehensive platform for competitive exam preparation. Get realistic mock tests with in-depth analytics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icons.facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icons.twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icons.instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icons.youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Exam Categories</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setLocation("/exam/jee")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  IIT JEE (Main & Advanced)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLocation("/exam/neet")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  NEET UG
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLocation("/exam/cat")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  CAT & MBA Entrance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLocation("/exam/upsc")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  UPSC Civil Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLocation("/exam-syllabus")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Exam Syllabus
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setLocation("/about-us")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLocation("/college-rankings")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  College Rankings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLocation("/exam-syllabus")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Exam Syllabus
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLocation("/exam-updates")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Exam Updates
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLocation("/terms-of-service")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLocation("/privacy-policy")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400">
                <Icons.mail className="h-5 w-5 mr-3 text-primary" />
                <span>support@mockprep.online</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Icons.phone className="h-5 w-5 mr-3 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Icons.mapPin className="h-5 w-5 mr-3 text-primary" />
                <span>Cyber Hub, Gurugram, India</span>
              </li>
              <li className="mt-4">
                <h5 className="font-medium mb-2">Subscribe to our newsletter</h5>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                  />
                  <button className="bg-primary px-3 py-2 rounded-r-md">
                    <Icons.send className="h-5 w-5" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} MockPrep.online. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={() => setLocation("/privacy-policy")}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setLocation("/terms-of-service")}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => setLocation("/about-us")}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                About Us
              </button>
              <button 
                onClick={() => setLocation("/home")}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>MockPrep.online is not affiliated with any official examination boards. All exam names are trademarks of their respective owners.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;