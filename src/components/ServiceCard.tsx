import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, gradient }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative h-80 perspective-1000"
    >
      <div className="relative h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 overflow-hidden transition-all duration-500 hover:border-gray-600/50">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Glow Effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-br ${gradient} rounded-2xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />
        
        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Icon */}
          <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed flex-grow group-hover:text-gray-300 transition-colors duration-300">
            {description}
          </p>
          
          {/* Hover Indicator */}
          <div className="mt-4 flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-medium">Learn More</span>
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r ${gradient} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                animation: `float-${i} 3s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;