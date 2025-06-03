import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Fade, Bounce } from 'react-awesome-reveal';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface ErrorPageProps {
  message?: string; // message is optional
  statusCode?: number; // Add optional status code
}

function Error({ message, statusCode }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Fade duration={800}>
        <Card className="w-[400px] overflow-hidden shadow-xl border-gray-200 dark:border-gray-700">
          <div className="bg-red-500 h-2 w-full"></div>
          <CardHeader className="pb-2">
            <Bounce delay={300}>
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <AlertTriangle className="h-12 w-12 text-red-500" />
                </div>
              </div>
            </Bounce>
            <CardTitle className="text-3xl font-bold text-center text-red-600 dark:text-red-400">
              Error Encountered
            </CardTitle>
            <CardDescription className="text-center text-gray-500 dark:text-gray-400 mt-2">
              {statusCode === 404 ? "Page Not Found" : "Something went wrong"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {statusCode === 404 ? "The page you are looking for doesn't exist." : message || 'An unexpected error occurred.'}
              </p>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Please try again or contact support if the problem persists.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline" 
                className="flex-1 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </Button>
              
              <Link to="/" className="flex-1"> 
                <Button className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Go Home</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </Fade>
    </div>
  );
}

export default Error;