// components/LogoSlider.js
'use client';
import React from 'react';
import { motion } from 'framer-motion';

const LogoSlider = () => {
  const logos = [
    {
      name: 'OpenAI',
      icon: (
        <svg viewBox="0 0 24 24" className="w-16 h-16">
          <path fill="#10A37F" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      ),
      color: '#10A37F'
    },
    {
      name: 'Next.js',
      icon: (
        <svg viewBox="0 0 128 128" className="w-16 h-16">
          <path fill="#000" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm38 85.1L80.6 69.6 102 41.8h-7.6L76.1 60.5 58.6 41.8h-27v44.4h27V70.1l10.8 16.1h7.8l-10.8-16.1 26.3-14.5 21.1 31.3H102z"/>
        </svg>
      ),
      color: '#000000'
    },
    {
      name: 'MongoDB',
      icon: (
        <svg viewBox="0 0 256 549" className="w-12 h-12">
          <path fill="#47A248" d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 0 0-1.492 0c-4.048 5.759-23.863 33.487-46.874 60.788-197.507 251.896 31.108 421.89 31.108 421.89l1.917 1.28c1.704 25.234 4.585 51.902 4.585 51.902h17.045s2.881-26.668 4.586-51.902l1.917-1.28c-.001 0 228.615-169.994 31.107-421.89zm-46.967 420.176s-14.403-10.495-17.045-15.272v-.383l17.045-76.012v91.667zm17.045-93.159l-17.045 76.012v-91.667l17.045 15.655z"/>
        </svg>
      ),
      color: '#47A248'
    },
    {
      name: 'Pinecone',
      icon: (
        <svg viewBox="0 0 512 512" className="w-16 h-16">
          <path fill="#4300FF" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.3-208-208S141.3 48 256 48s208 93.3 208 208-93.3 208-208 208zm96-208c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zm-96-64c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64z"/>
          <path fill="#4300FF" d="M256 176c-44.2 0-80 35.8-80 80s35.8 80 80 80 80-35.8 80-80-35.8-80-80-80zm0 128c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"/>
        </svg>
      ),
      color: '#4300FF'
    },
    {
      name: 'Langgraph',
      icon: (
        <svg viewBox="0 0 512 512" className="w-16 h-16">
          <path fill="#FF6B00" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.3-208-208S141.3 48 256 48s208 93.3 208 208-93.3 208-208 208z"/>
          <path fill="#FF6B00" d="M368 144H144c-17.7 0-32 14.3-32 32v160c0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32V176c0-17.7-14.3-32-32-32zm-224 32h224v160H144V176zm64 64v96h-32v-96h32zm96 0v96h-32v-96h32zm96 0v96h-32v-96h32z"/>
        </svg>
      ),
      color: '#FF6B00'
    }
  ];

  // Duplicate logos for seamless looping
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Powered by Cutting-Edge Technologies
        </h2>
        
        <div className="relative w-full">
          <motion.div
            className="flex"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 mx-6 flex flex-col items-center justify-center"
                style={{ minWidth: '150px' }}
              >
                <div 
                  className="flex items-center justify-center w-28 h-28 rounded-xl bg-white shadow-md p-4 transform hover:scale-105 transition-transform duration-300"
                  style={{ borderBottom: `4px solid ${logo.color}` }}
                >
                  {logo.icon}
                </div>
                <div 
                  className="mt-3 text-lg font-medium"
                  style={{ color: logo.color }}
                >
                  {logo.name}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            QanoonAI leverages the latest of industry, most advanced technologies to deliver 
            unparalleled legal advisory services through sophisticated AI agents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;