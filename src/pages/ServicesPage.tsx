import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Smartphone, Building, TrendingUp, Settings, BarChart3, Mail, MessageCircleMore as Salesforce, Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  useEffect(() => {
    gsap.fromTo('.service-detail-card',
      { opacity: 0, y: 100, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-container',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const services = [
    {
      icon: ShoppingCart,
      title: 'E-Commerce Development',
      description: 'Complete online store solutions with advanced payment gateways, inventory management, and customer analytics.',
      features: ['Payment Integration', 'Mobile Responsive', 'Inventory Management', 'Analytics Dashboard'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Building,
      title: 'Business Websites',
      description: 'Professional corporate websites designed to showcase your brand and convert visitors into customers.',
      features: ['SEO Optimized', 'Content Management', 'Lead Generation', 'Performance Optimized'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies including SEO, social media, and content marketing.',
      features: ['SEO Services', 'Social Media', 'Content Creation', 'PPC Campaigns'],
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Settings,
      title: 'Business Software',
      description: 'Custom enterprise software solutions tailored to your specific business needs and workflows.',
      features: ['Custom Development', 'Cloud Integration', 'Security Features', 'Scalable Architecture'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Mail,
      title: 'Email Marketing',
      description: 'Automated email campaigns and marketing automation to nurture leads and retain customers.',
      features: ['Campaign Automation', 'A/B Testing', 'Analytics', 'Template Design'],
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'Salesforce Solutions',
      description: 'Salesforce implementation, customization, and integration services for enhanced CRM capabilities.',
      features: ['CRM Setup', 'Custom Objects', 'Workflow Automation', 'Integration Services'],
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: BarChart3,
      title: 'ERP Software',
      description: 'Enterprise Resource Planning solutions to streamline business processes and improve efficiency.',
      features: ['Process Automation', 'Data Integration', 'Real-time Reporting', 'Multi-module System'],
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Project Management',
      description: 'Advanced project management tools and methodologies to ensure successful project delivery.',
      features: ['Task Management', 'Team Collaboration', 'Time Tracking', 'Progress Reports'],
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native iOS and Android applications with cutting-edge features and seamless user experience.',
      features: ['Native Development', 'Cross-platform', 'App Store Optimization', 'Maintenance Support'],
      gradient: 'from-emerald-500 to-green-500'
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
            Our Services
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Comprehensive technology solutions designed to transform your business and drive sustainable growth in the digital age.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-container py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="service-detail-card group relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 overflow-hidden transition-all duration-500 hover:border-gray-600/50">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-br ${service.gradient} rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`} />
                  
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-3`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Get Started</span>
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Ready to Transform Your Business?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 mb-8"
          >
            Let's discuss how our technology solutions can drive your business forward.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 space-x-2"
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;