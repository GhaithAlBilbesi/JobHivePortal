import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import JobCard from "./JobCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Job Listings Component
 * 
 * Displays a grid of job postings with filter controls
 * Can be used both on the homepage (limited view) or on a dedicated jobs page
 */
const JobListings = ({ filters = {}, fullPage = false }: { filters?: any, fullPage?: boolean }) => {
  const { ref: jobsRef } = useScrollAnimation();
  const [localFilters, setLocalFilters] = useState({
    location: filters.location || "all_locations",
    jobType: filters.jobType || "all_types",
    experience: filters.experience || "all_levels",
    search: filters.search || ""
  });
  
  const headingRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  
  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "UI/UX Design Intern",
      company: "TechBee Company",
      type: "Internship",
      location: "Amman, Jordan (Remote)",
      schedule: "Part-time, 20 hours/week",
      salary: "300-500 JOD/month",
      skills: ["Figma", "UI Design", "Wireframing", "Adobe XD"],
      icon: "fa-laptop-code"
    },
    {
      id: 2,
      title: "Junior Web Developer",
      company: "HiveWorks Solutions",
      type: "Full-time",
      location: "Cairo, Egypt (Hybrid)",
      schedule: "Full-time, 40 hours/week",
      salary: "5000-7000 EGP/month",
      skills: ["React", "JavaScript", "HTML", "CSS"],
      icon: "fa-code"
    },
    {
      id: 3,
      title: "Marketing Assistant",
      company: "BeeMarketing Agency",
      type: "Entry Level",
      location: "Dubai, UAE (On-site)",
      schedule: "Full-time, 40 hours/week",
      salary: "4000-6000 AED/month",
      skills: ["Social Media", "Content Creation", "Analytics"],
      icon: "fa-chart-bar"
    }
  ];
  
  // Handle filter changes (if used in a controlled component)
  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <section id="jobs" className={`py-16 bg-white ${fullPage ? 'pt-0' : ''}`} ref={jobsRef}>
      <div className="container mx-auto px-4">
        {!fullPage && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 opacity-0 fade-in-up" ref={headingRef}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Job Opportunities</h2>
              <p className="text-gray-600">Discover fresh opportunities perfect for your career start</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild variant="link" className="flex items-center text-[#F6C500] font-semibold hover:text-[#FFD700] transition-colors duration-200">
                <Link href="/jobs">
                  View All Jobs <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </Button>
            </div>
          </div>
        )}
        
        {!fullPage && (
          <div className="mb-8 p-4 bg-[#FFFBEA] rounded-lg opacity-0 fade-in-up animate-delay-100" ref={filtersRef}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</Label>
                <Select
                  value={localFilters.location}
                  onValueChange={(value) => handleFilterChange("location", value)}
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_locations">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="amman">Amman, Jordan</SelectItem>
                    <SelectItem value="cairo">Cairo, Egypt</SelectItem>
                    <SelectItem value="dubai">Dubai, UAE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="job-type" className="block text-sm font-medium text-gray-700 mb-1">Job Type</Label>
                <Select
                  value={localFilters.jobType}
                  onValueChange={(value) => handleFilterChange("jobType", value)}
                >
                  <SelectTrigger id="job-type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_types">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</Label>
                <Select
                  value={localFilters.experience}
                  onValueChange={(value) => handleFilterChange("experience", value)}
                >
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_levels">All Levels</SelectItem>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="1-2">1-2 Years</SelectItem>
                    <SelectItem value="3+">3+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</Label>
                <Input 
                  id="search" 
                  type="text" 
                  placeholder="Keywords, Job Title, Company..." 
                  value={localFilters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <JobCard 
              key={job.id} 
              job={job} 
              animationDelay={index % 3 * 100}
            />
          ))}
        </div>
        
        <div className="text-center mt-10 opacity-0 fade-in-up animate-delay-300">
          <Button className="bg-white border-2 border-[#F6C500] text-[#F6C500] hover:bg-[#FFFBEA] rounded-full font-bold transition-colors duration-200">
            Load More Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobListings;
