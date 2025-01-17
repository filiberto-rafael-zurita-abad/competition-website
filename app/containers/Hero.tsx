"use client";

import Link from 'next/link';

export const Hero = () => {
  return (
    <div 
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/image-1.png')" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI Hackathon <span className="text-blue-600">January 2025</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Build cutting-edge AI solutions, collaborate with top talent, 
            and compete for amazing prizes. Use autonomus coding agents to make your submissions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#submission" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Submit Your Project
            </Link>
            <Link href="#about" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
