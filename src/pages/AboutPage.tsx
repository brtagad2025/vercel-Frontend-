import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChatbotWidget from '../components/ChatbotWidget';

import { 
  Target, 
  Globe, 
  Lightbulb, 
  Shield, 
  Clock, 
  Heart 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  useEffect(() => {
    gsap.fromTo('.about-card',
      { opacity: 0, y: 100, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-container',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and innovative approaches to solve complex business challenges.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Your data security and privacy are our top priorities in every solution we develop.',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Clock,
      title: 'Reliability',
      description: 'We deliver projects on time and provide ongoing support to ensure your success.',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our team is passionate about technology and committed to your business growth.',
      gradient: 'from-pink-500 to-red-500'
    }
  ];

  // Only Aniket Baswade as the team member
  const teamMembers = [
  {
    name: 'Aniket Baswade',
    role: 'Director of Technology',
    image: 'https://i.ibb.co/4wFMGHc9/Untitled-design-12.png', // <-- Your own image URL
    expertise: 'Technology Leadership & Innovation'
  }
];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            We are Tagad Platforms LLP, a forward-thinking software technology company dedicated to transforming businesses through innovative digital solutions.
          </motion.p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Founded with a vision to bridge the gap between technology and business success, 
                Tagad Platforms LLP has grown from a small startup to a leading software technology company. 
                Our journey began with a simple belief: that the right technology can transform any business.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Today, we serve clients across various industries, delivering custom software solutions, 
                mobile applications, and digital marketing services that drive real business results. 
                Our team of experts combines technical excellence with creative innovation to solve 
                complex challenges and accelerate growth.
              </p>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">2025</div>
                  <div className="text-gray-500 text-sm">Year Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">100%</div>
                  <div className="text-gray-500 text-sm">Projects Delievery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">3</div>
                  <div className="text-gray-500 text-sm">Core Team Members</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                alt="Team working"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Target className="h-16 w-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To empower businesses with innovative technology solutions that drive growth, 
                efficiency, and competitive advantage in an ever-evolving digital landscape.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <Globe className="h-16 w-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To be the global leader in software technology services, recognized for our 
                innovation, quality, and commitment to client success across all industries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-container py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              Our Core Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              The principles that guide everything we do and shape our company culture.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={value.title} className="about-card group">
                <div className="relative h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 text-center overflow-hidden transition-all duration-500 hover:border-gray-600/50">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${value.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              The passionate professional behind our success, dedicated to delivering excellence in every project.
            </motion.p>
          </div>
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group text-center max-w-xs"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img
                  src={teamMembers[0].image}
                  alt={teamMembers[0].name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{teamMembers[0].name}</h3>
              <p className="text-blue-400 font-medium mb-2">{teamMembers[0].role}</p>
              <p className="text-gray-400 text-sm">{teamMembers[0].expertise}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    <ChatbotWidget />
  );
};

export default AboutPage;
