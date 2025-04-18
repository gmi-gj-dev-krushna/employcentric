
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages - Public
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import PlanComparison from "./pages/PlanComparison";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Pages - Tenant
import Dashboard from "./pages/tenant/Dashboard";
import Attendance from "./pages/tenant/Attendance";
import Employees from "./pages/tenant/Employees";
import Leave from "./pages/tenant/Leave";
import Payroll from "./pages/tenant/Payroll";
import Recruitment from "./pages/tenant/Recruitment";

// Pages - SuperAdmin
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import Tenants from "./pages/superadmin/Tenants";
import SystemSettings from "./pages/superadmin/SystemSettings";
import TenantUserManagement from "./pages/TenantUserManagement";
import TenantSettings from "./pages/TenantSettings";
import TenantApprovals from "./pages/TenantApprovals";
import TenantDetails from "./pages/TenantDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" />
                </ProtectedRoute>
              } />
              <Route path="/landing" element={<Landing />} />
              <Route path="/index" element={<Navigate to="/" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/plans" element={<PlanComparison />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/superadmin" 
                element={
                  <ProtectedRoute allowedRoles={["superadmin"]}>
                    <SuperAdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/tenants" 
                element={
                  <ProtectedRoute allowedRoles={["superadmin"]}>
                    <Tenants />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/system-settings" 
                element={
                  <ProtectedRoute allowedRoles={["superadmin"]}>
                    <SystemSettings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/tenant-user-management/:tenantId" 
                element={
                  <ProtectedRoute allowedRoles={["superadmin"]}>
                    <TenantUserManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/tenant-settings/:tenantId" 
                element={
                  <ProtectedRoute allowedRoles={["superadmin"]}>
                    <TenantSettings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/tenant-approvals" 
                element={
                  <ProtectedRoute allowedRoles={["superadmin"]}>
                    <TenantApprovals />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/tenant-details/:tenantId" 
                element={
                  <ProtectedRoute allowedRoles={["superadmin"]}>
                    <TenantDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employees" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "hr", "manager"]}>
                    <Employees />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/attendance" 
                element={
                  <ProtectedRoute>
                    <Attendance />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/leave" 
                element={
                  <ProtectedRoute>
                    <Leave />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/payroll" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "hr"]}>
                    <Payroll />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/recruitment" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "hr"]}>
                    <Recruitment />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
