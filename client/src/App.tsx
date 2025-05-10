import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import JobsPage from "@/pages/JobsPage";
import ResumeBuilder from "@/pages/ResumeBuilder";
import EmployerPage from "@/pages/EmployerPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Router component that handles all application routes
 * Sets up main routes for the application, including home, jobs, resume builder, 
 * employer page, and a fallback 404 page
 */
function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/jobs" component={JobsPage} />
        <Route path="/resume-builder" component={ResumeBuilder} />
        <Route path="/for-employers" component={EmployerPage} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

/**
 * Main App component
 * Sets up QueryClientProvider for data fetching
 * Includes TooltipProvider for tooltips and Toaster for notifications
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
