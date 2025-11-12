// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { DigitalTwinProvider } from "./contexts/DigitalTwinContext";
import ProtectedRoute from "./contexts/ProtectedRoute";
import HomeAllPage from "./pages/LandingPages/HomeAllPage";
import Navigation from "./pages/LandingPages/Navbar";
import AppFooter from "./pages/LandingPages/Footer";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DigitalTwinProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-slate-950">
              {/* Permanent Navigation */}
              <Navigation />
              
              {/* All Routes */}
              <Routes>
                <Route path="/" element={<HomeAllPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/chatbot/:id" element={<Chatbot />} />
                <Route path="/wizard" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Permanent Footer */}
              <AppFooter />
            </div>
          </BrowserRouter>
        </DigitalTwinProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;