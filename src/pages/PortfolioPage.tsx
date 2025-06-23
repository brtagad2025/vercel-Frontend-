import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ExternalLink, Github, Filter } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link: string;
}

const PortfolioPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with advanced payment integration and inventory management.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication and real-time transactions.',
      image: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Node.js'],
      link: '#'
    },
    {
      id: 3,
      title: 'Business Dashboard',
      description: 'Comprehensive business analytics dashboard with real-time data visualization.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
      category: 'web',
      technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
      link: '#'
    },
    {
      id: 4,
      title: 'ERP System',
      description: 'Enterprise resource planning system for manufacturing companies.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      category: 'enterprise',
      technologies: ['Angular', 'Java', 'Spring Boot', 'Oracle'],
      link: '#'
    },
    {
      id: 5,
      title: 'Social Media App',
      description: 'Cross-platform social media application with real-time messaging and content sharing.',
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
      category: 'mobile',
      technologies: ['Flutter', 'Firebase', 'Node.js'],
      link: '#'
    },
    {
      id: 6,
      title: 'Project Management Tool',
      description: 'Collaborative project management platform with advanced reporting and team features.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
      category: 'web',
      technologies: ['React', 'GraphQL', 'Node.js', 'MongoDB'],
      link: '#'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'enterprise', name: 'Enterprise Solutions' }
  ];

  useEffect(() => {
    const filtered = activeFilter === 'all'
      ? projects
      : projects.filter(project => project.category === activeFilter);
    setFilteredProjects(filtered);
  }, [activeFilter]);

  useEffect(() => {
    gsap.fromTo(
      '.portfolio-card',
      { opacity: 0, y: 100, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }
    );
  }, [filteredProjects]);

  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Explore our collection of successful projects that demonstrate our expertise in delivering cutting-edge technology solutions.
          </motion.p>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="inline w-4 h-4 mr-2" />
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="portfolio-card group relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex space-x-4">
                          <a
                            href={project.link}
                            className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                          >
                            <ExternalLink className="h-5 w-5 text-white" />
                          </a>
                          <a
                            href="#"
                            className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                          >
                            <Github className="h-5 w-5 text-white" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full border border-blue-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Project Success Metrics</h2>
            <p className="text-gray-400">Our track record speaks for itself</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: 'First', label: 'Clients Onboarded' },
              { number: '100%', label: 'Commitment  to Quality' },
              { number: '0', label: 'Limits to Our Ambition ' },
              { number: '1', label: 'Mission: Make an Impact' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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

export default PortfolioPage;
