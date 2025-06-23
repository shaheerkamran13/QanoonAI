// components/Header.js
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-lg bg-gray-100"
            initial={{ 
              opacity: 0.05,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.05, 0.08, 0.05],
              y: [0, -20, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              rotate: Math.random() * 20,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 mb-16 lg:mb-0">
            <motion.div 
              className="inline-block bg-gray-200 px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="flex items-center text-gray-700">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                <span>AI-Powered Legal Platform</span>
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="block">Transform Your Legal</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                Experience with QanoonAI
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              First Pakistan AI-powered legal advisory platform that delivers precise, 
              instant legal guidance through intelligent agents. Experience the future 
              of legal consultation today.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 px-8 rounded-lg text-lg transition-all shadow-md hover:shadow-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="flex items-center justify-center">
                  <span>Start Free Consultation</span>
                  <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    className="ml-2"
                  >
                    →
                  </motion.span>
                </span>
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-8 rounded-lg text-lg transition-all shadow-sm">
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 3a3 3 0 00-3 3v10a1 1 0 001.447.894L9 14.382V17a1 1 0 001.447.894l4-2A1 1 0 0015 15v-2.382l4.553 2.276A1 1 0 0021 14V6a3 3 0 00-3-3H6z" />
                  </svg>
                  Watch Demo
                </span>
              </button>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center">
                <div className="bg-gray-100 p-3 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">24/7 AI Legal Agents</h3>
                  <p className="text-gray-600">Instant answers anytime</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-gray-100 p-3 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Confidential & Secure</h3>
                  <p className="text-gray-600">Military-grade encryption</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* AI Chat Demo */}
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-lg">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
              
              <motion.div 
                className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-10 h-10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-xl">QanoonAI Assistant</h3>
                    <p className="text-gray-500">Legal Advisory Platform</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">Q</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex-1">
                      <p>Hello, I am your AI legal assistant. How can I help you today?</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-gray-100 rounded-lg p-4 max-w-xs md:max-w-md">
                      <p>I need to draft a rental agreement for my apartment. Can you help?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-3">
                      <span className="text-gray-800 font-bold text-sm">Y</span>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">Q</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex-1">
                      <p>Certainly! I can generate a customized rental agreement based on your location and requirements.</p>
                      <div className="mt-3 flex items-center">
                        <div className="bg-green-500/10 p-2 rounded-md mr-2">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Generating your legal document...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <motion.div 
        className="relative bg-white border-t border-gray-200 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">10,000+</div>
              <div className="text-gray-600">Legal Cases Analyzed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">98.7%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">50+</div>
              <div className="text-gray-600">Legal Domains Covered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">24/7</div>
              <div className="text-gray-600">AI Assistance</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;