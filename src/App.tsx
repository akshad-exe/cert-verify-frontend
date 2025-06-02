import { Routes, Route } from 'react-router-dom';
import Verify from './pages/Verify.tsx';
import Error from './pages/Error.tsx';
import Landing from './pages/Landing.tsx';
import AdminLogin from './pages/admin/Login.tsx';
import AdminDashboard from './pages/admin/Dashboard.tsx';
import AdminAddCertificate from './pages/admin/AddCertificate.tsx';
import AdminListCertificates from './pages/admin/ListCertificates.tsx';
import AdminEditCertificate from './pages/admin/EditCertificate.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx'; // Import ProtectedRoute
import AdminLayout from './components/AdminLayout.tsx'; // Import AdminLayout
import { Toaster } from 'react-hot-toast'; // Import Toaster
import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"; // Import SidebarProvider

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App min-h-screen">
        <Toaster /> {/* Add Toaster component here */}
        <Routes>
          <Route path="/" element={<Landing />} /> {/* Set Landing for the root route */}
          <Route path="/verify" element={<Verify />} /> {/* Set Verify for the /verify route */}

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />} > {/* Use ProtectedRoute to wrap protected routes */}
            {/* Wrap the AdminLayout route with SidebarProvider and render AdminLayout directly */}
            <Route element={
              <SidebarProvider defaultOpen={true}> {/* Set default open state as needed */}
                <AdminLayout /> {/* Render AdminLayout directly */}
              </SidebarProvider>
            }>
              {/* Nested admin routes remain here */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/certificates" element={<AdminListCertificates />} /> {/* Route for listing certificates */}
              <Route path="/admin/certificates/add" element={<AdminAddCertificate />} /> {/* Route for adding a certificate */}
              <Route path="/admin/certificates/edit/:id" element={<AdminEditCertificate />} /> {/* Route for editing a certificate */}
            </Route>
          </Route>

          <Route path="*" element={<Error />} /> {/* This route will catch all unmatched paths and render the Error */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
