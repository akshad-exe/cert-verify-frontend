import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ProtectedRouteProps {
  // You can add props here if needed, e.g., roles or permissions
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  // Frontend authentication check: Simply checks for the presence of the JWT in localStorage.
  // The actual token validation happens on the backend via the Axios interceptor on each API request to protected routes.
  const isAuthenticated = localStorage.getItem('jwtToken'); // Check for the token

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute; 