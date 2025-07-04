
import { Linkedin, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-orange-400">TechCognita</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming tech education and delivering innovative IT solutions.
              Bridging the gap between theoretical knowledge and real-world applications.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://www.linkedin.com/in/atharvshinde212022" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://www.techcognita.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
              >
                <Globe className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Services</h4>
            <ul className="space-y-3 text-gray-300">
              <li>Website & App Development</li>
              <li>Digital Marketing</li>
              <li>AI & Automation</li>
              <li>IT Consulting</li>
              <li>Corporate Training</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Contact</h4>
            <p className="text-gray-300 mb-3">
              Founded by Atharv Shinde
            </p>
            <p className="text-gray-300">
              5+ years experience in Java, Python, and web development
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2024 TechCognita. All rights reserved. Empowering Minds, Innovating the Future!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;