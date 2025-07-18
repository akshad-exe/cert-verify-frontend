import techcognitaLogo from '@/assets/techcognita.svg';
import { ModeToggle } from '@/components/mode-toggle';

export const Header = () => (
  <header className="bg-primary text-primary-foreground py-4 shadow-md sticky top-0 z-10">
    <div className="container mx-auto flex flex-row justify-between items-center px-4">
      <div className="flex items-center gap-3">
        <a href="/" tabIndex={0} aria-label="Go to homepage" className="focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">
          <img src={techcognitaLogo} alt="TechCognita Logo" className="h-9 w-auto drop-shadow-md" />
        </a>
        <span className="text-2xl font-bold">TechCognita Certificate Verification</span>
      </div>
      <div className="ml-4">
        <ModeToggle />
      </div>
    </div>
  </header>
);

export default Header; 