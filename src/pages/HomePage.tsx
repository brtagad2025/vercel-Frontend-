import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Scene3D from '../components/Scene3D';
import ServiceCard from '../components/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Hero animations
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.2 }
      );

      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
      );

      gsap.fromTo('.hero-cta',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 1, ease: 'back.out(1.7)' }
      );

      // Scroll indicator animation
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

      // Services section animation
      gsap.fromTo('.service-card',
        { opacity: 0, y: 100, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: 'E-Commerce Development',
      description: 'Full-featured online stores with advanced payment integration and inventory management.',
      icon: '🛒',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Mobile App Development',
      description: 'Native iOS and Android applications with cutting-edge features and seamless UX.',
      icon: '📱',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Business Software',
      description: 'Custom enterprise solutions tailored to streamline your business operations.',
      icon: '💼',
      gradient: 'from-pink-500 to-red-600'
    },
    {
      title: 'Digital Marketing',
      description: 'Comprehensive digital strategies to boost your online presence and engagement.',
      icon: '📈',
      gradient: 'from-red-500 to-orange-600'
    },
    {
      title: 'ERP Solutions',
      description: 'Integrated business management systems for enhanced productivity and efficiency.',
      icon: '⚙️',
      gradient: 'from-orange-500 to-yellow-600'
    },
    {
      title: 'Project Management',
      description: 'Advanced project tracking and collaboration tools for teams of all sizes.',
      icon: '📊',
      gradient: 'from-yellow-500 to-green-600'
    }
  ];

  return (
    <div ref={heroRef} className="relative">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/70 to-gray-900" />
        </div>

        {/* 3D Scene */}
        <Scene3D />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="hero-title"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                TAGAD
              </span>
              <span className="block text-white">PLATFORMS</span>
            </h1>
          </motion.div>

          <div className="hero-subtitle">
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Transforming businesses through cutting-edge software technology, 
              From Vision to Impact — For a Billion and Beyond.
            </p>
          </div>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/services"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Explore Services</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/portfolio"
              className="group border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>View Portfolio</span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              Our Expertise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              We deliver comprehensive technology solutions that drive growth and innovation for businesses worldwide.
            </motion.p>
          </div>

          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.title} className="service-card">
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
             
              { number: '2025', label: 'Year Founded' },
              { number: '3', label: 'Core Team Members' },
              { number: '1', label: 'Projects Launched' },
              { number: '∞', label: 'Ideas in Progress' }


            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;