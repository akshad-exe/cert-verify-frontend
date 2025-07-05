import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { adminLogin } from '../../api/admin';
import { useNavigate } from 'react-router-dom';
import { Fade, Zoom } from 'react-awesome-reveal';
import { User, Lock, LogIn, AlertCircle } from 'lucide-react';
import { castError } from '@/types/error';

function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await adminLogin(username, password);

      // Assuming the backend returns a JWT in the response data under a 'token' key
      const token = response.data.token;

      if (token) {
        localStorage.setItem('jwtToken', token); // Store the JWT
        navigate('/admin/dashboard'); // Redirect to the admin dashboard
      } else {
        setError('Login failed: No token received');
      }
    } catch (err: unknown) {
      // Handle login errors (e.g., invalid credentials, network issues)
      const error = castError(err);
      if (error.response) {
        setError(error.response.data?.message || 'Login failed. Please check your credentials.');
      } else {
        setError('An unexpected error occurred during login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Fade duration={1000}>
        <Card className="w-[400px] overflow-hidden shadow-xl border-gray-200 dark:border-gray-700">
          <div className="bg-primary h-2 w-full"></div>
          <CardHeader className="space-y-2 pb-2">
            <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">
              <Zoom duration={800} delay={300}>
                <div className="flex items-center justify-center gap-2">
                  <LogIn className="h-6 w-6 text-primary" />
                  <span>Admin Login</span>
                </div>
              </Zoom>
            </CardTitle>
            <CardDescription className="text-center text-gray-500 dark:text-gray-400">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">Username</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="pl-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-visible:ring-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-visible:ring-primary"
                    />
                  </div>
                </div>
              </div>
              
              {error && (
                <Zoom duration={300}>
                  <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                </Zoom>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 flex items-center justify-center gap-2" 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Fade>
    </div>
  );
}

export default AdminLoginPage;