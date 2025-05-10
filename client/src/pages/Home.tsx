import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import JobListings from "@/components/JobListings";
import ResumeSection from "@/components/ResumeSection";
import Testimonials from "@/components/Testimonials";
import EmployerCTA from "@/components/EmployerCTA";
import { useEffect } from "react";

/**
 * Home Page Component
 * 
 * Main landing page for JobHive
 * Assembles various sections to create a complete landing page experience
 * Each section is a separate component to maintain modularity and reusability
 */
const Home = () => {
  // Set page title
  useEffect(() => {
    document.title = "JobHive - Sweet opportunities for the NewBees!";
  }, []);

  return (
    <main>
      <Hero />
      <Stats />
      <Features />
      <JobListings />
      <ResumeSection />
      <Testimonials />
      <EmployerCTA />
    </main>
  );
};

export default Home;
