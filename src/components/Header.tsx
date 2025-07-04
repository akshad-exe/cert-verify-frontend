
import { Award } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

export const Header = () => (
  <header className="bg-primary text-primary-foreground py-4 shadow-md sticky top-0 z-10">
    <div className="container mx-auto flex flex-row justify-between items-center px-4">
      <div className="flex items-center gap-3">
        <Award className="h-8 w-8 text-orange-400" />
        <span className="text-2xl font-bold">TechCognita Certificate Verification</span>
      </div>
      <div className="ml-4">
        <ModeToggle />
      </div>
    </div>
  </header>
);

export default Header; 