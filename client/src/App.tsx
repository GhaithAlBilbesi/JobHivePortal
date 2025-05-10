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
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProfilePage from "@/pages/ProfilePage";
import AdminPanel from "@/pages/AdminPanel";
import CompanyInfo from "@/pages/EmployerRegister/CompanyInfo";
import FoundingInfo from "@/pages/EmployerRegister/FoundingInfo";
import SocialMedia from "@/pages/EmployerRegister/SocialMedia";
import Contact from "@/pages/EmployerRegister/Contact";
import Complete from "@/pages/EmployerRegister/Complete";
import StudentRegister from "@/pages/StudentRegister";
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
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/register/employer" component={CompanyInfo} />
        <Route path="/register/employer/founding-info" component={FoundingInfo} />
        <Route path="/register/employer/social-media" component={SocialMedia} />
        <Route path="/register/employer/contact" component={Contact} />
        <Route path="/register/employer/complete" component={Complete} />
        <Route path="/register/student" component={StudentRegister} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/admin" component={AdminPanel} />
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
