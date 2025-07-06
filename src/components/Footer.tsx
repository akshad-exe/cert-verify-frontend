import { Linkedin, Globe, Mail } from 'lucide-react';
import techcognitaLogo from '@/assets/techcognita.svg';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 bg-gradient-to-t from-gray-950 via-gray-900 to-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-10 md:gap-0">
          {/* Logo & Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
            <img src={techcognitaLogo} alt="TechCognita Logo" className="h-14 w-auto mb-2 drop-shadow-lg" />
            <a href="https://www.techcognita.com" target="_blank" rel="noopener noreferrer" className="text-2xl font-extrabold text-orange-400 hover:underline tracking-tight mb-1">
              TechCognita
            </a>
            <p className="text-gray-300 text-base font-medium max-w-md leading-snug mt-1">
              Transforming tech education and delivering innovative IT solutions. Bridging the gap between theory and real-world application.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.linkedin.com/in/atharvshinde212022" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.techcognita.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Website"
                className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@techcognita.com"
                aria-label="Contact us"
                className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Legal & Made by */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right justify-center flex-1 w-full">
            <div className="w-full flex flex-col items-center md:items-end">
              <hr className="w-24 border-t border-gray-700 mb-4 md:mb-6 mt-8 md:mt-0" />
              <h4 className="text-base font-semibold mb-2 text-orange-400">Legal</h4>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div className="mt-4 text-gray-400 text-xs font-medium">Made by TechCognita</div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-300 text-xs flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <p className="tracking-tight">&copy; {new Date().getFullYear()} TechCognita. All rights reserved.</p>
          <span className="text-[11px] text-gray-500 font-medium">Empowering Minds, Innovating the Future!</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;