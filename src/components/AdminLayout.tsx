import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Fade, Slide } from 'react-awesome-reveal';
import { 
  LayoutDashboard, 
  ListPlus, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Award
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Outlet } from 'react-router-dom'; // Import Outlet

interface AdminLayoutProps {
  children?: ReactNode; // Make children optional
}

function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // Use jwtToken instead of adminToken to match what's used in login
    window.location.href = '/admin/login';
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/admin/certificates/add', label: 'Add Certificate', icon: <ListPlus className="h-5 w-5" /> },
    { path: '/admin/certificates', label: 'Certificates', icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row w-full">
      {/* Mobile sidebar toggle */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={cn(
          "md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
        )}
      >
        {sidebarOpen ? 
          <X className="h-6 w-6 text-gray-600 dark:text-gray-300" /> : 
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />}
      </button>

      {/* Sidebar */}
      <Slide direction="left" className="w-full md:w-64">
        <aside 
          className={cn(
            "fixed md:sticky top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow-lg z-40 transition-all duration-300 ease-in-out",
            sidebarOpen ? "w-64" : "w-0 md:w-64 -translate-x-full md:translate-x-0"
          )}
        >
          <div className="h-full flex flex-col overflow-hidden">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <Link to="/admin/dashboard" className="flex items-center space-x-2">
                <Award className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-gray-800 dark:text-white">TechCognita</span>
              </Link>
              <div className={cn("transition-opacity duration-300", sidebarOpen ? "opacity-100" : "opacity-0 md:opacity-100")}>
                <ModeToggle />
              </div>
            </div>
            
            {/* Nav Links */}
            <nav className="flex-1 py-6 px-4 overflow-y-auto">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      onClick={() => setSidebarOpen(false)} // Close sidebar on link click
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg transition-colors group",
                        location.pathname === item.path 
                          ? "bg-primary/10 text-primary" 
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                      <ChevronRight className={cn(
                        "ml-auto h-4 w-4 transition-transform",
                        location.pathname === item.path ? "text-primary" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400"
                      )} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </aside>
      </Slide>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-hidden">
        <div className="container mx-auto max-w-full">
          <Fade duration={800}>
            {children || <Outlet />}
          </Fade>
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;