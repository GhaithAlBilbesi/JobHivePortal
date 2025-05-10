import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/contexts/UserContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import JobsPage from "@/pages/JobsPage";
import ResumeBuilder from "@/pages/ResumeBuilder";
import PostJob from "@/pages/PostJob";
import Dashboard from "@/pages/Dashboard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Router component that handles all application routes
 * Sets up main routes for the application, including home, jobs, resume builder, 
 * post job, and role-specific pages
 */
function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/jobs" component={JobsPage} />
        <Route path="/resume-builder" component={ResumeBuilder} />
        <Route path="/post-job" component={PostJob} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={() => <div className="pt-32 pb-20 min-h-screen container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">User Profile</h1>
          <p className="text-gray-600">Profile management functionality is coming soon.</p>
        </div>} />
        <Route path="/admin" component={() => <div className="pt-32 pb-20 min-h-screen container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
          <p className="text-gray-600">Admin panel functionality is coming soon.</p>
        </div>} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

/**
 * Main App component
 * Sets up providers for the application:
 * - QueryClientProvider for data fetching
 * - UserProvider for authentication and user management
 * - TooltipProvider for tooltips
 * - Toaster for notifications
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
