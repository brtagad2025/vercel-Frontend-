import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Tagad Platforms
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Vision to Impact — For a Billion and Beyond.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/brtagad2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/b-r-tagad-69816b370/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Services', path: '/services' },
                  { name: 'Portfolio', path: '/portfolio' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact', path: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Services</h3>
              <div className="space-y-2">
                {[
                  'E-Commerce Development',
                  'Mobile App Development',
                  'Business Software',
                  'Digital Marketing',
                  'ERP Solutions',
                  'Project Management',
                ].map((service) => (
                  <div key={service} className="text-gray-400 text-sm">
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400 text-sm">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>info@brtagad.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 text-sm">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>+91 9356961657</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 text-sm">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>Canada: 3070 Rotary Way, Burlington ON L7M 0H1.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Tagad Platforms LLP. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919356961657?text=Hello%20Tagad%20Team%2C%20I%20am%20interested%20in%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-button"
        style={{
          position: 'fixed',
          bottom: 80,
          right: 20,
          zIndex: 9999,
          display: 'block',
        }}
      >
        <img
          src="https://i.ibb.co/6RFWWFjk/whasdsdsdsd.png"
          alt="Chat on WhatsApp"
          style={{
            height: 60,
            width: 60,
            borderRadius: '50%',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            cursor: 'pointer',
          }}
        />
      </a>
    </>
  );
};

export default Footer;
