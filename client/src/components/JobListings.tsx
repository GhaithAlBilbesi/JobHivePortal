import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import JobCard from "./JobCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

/**
 * Interface for Job data
 */
export interface Job {
  id: number;
  title: string;
  company: string;
  type: string;
  location: string;
  schedule: string;
  salary: string;
  skills: string[];
  icon: string;
  industry?: string;
  description?: string;
  postedDate?: string;
}

/**
 * Interface for JobListings props
 */
interface JobListingsProps {
  filters?: any;
  fullPage?: boolean;
  onApplyClick?: () => boolean;
}

/**
 * Job Listings Component
 * 
 * Displays a grid of job postings with filter controls
 * Can be used both on the homepage (limited view) or on a dedicated jobs page
 * Supports filtering by various criteria including skills and industries
 * Integrates with authentication flow for job applications
 */
const JobListings = ({ filters = {}, fullPage = false, onApplyClick }: JobListingsProps) => {
  const { ref: jobsRef } = useScrollAnimation();
  const [localFilters, setLocalFilters] = useState({
    location: filters.location || "all_locations",
    jobType: filters.jobType || "all_types",
    experience: filters.experience || "all_levels",
    industry: filters.industry || "all_industries",
    search: filters.search || "",
    skills: filters.skills || []
  });
  
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const { toast } = useToast();
  
  const headingRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  
  // Update local filters when parent filters change
  useEffect(() => {
    setLocalFilters({
      location: filters.location || "all_locations",
      jobType: filters.jobType || "all_types",
      experience: filters.experience || "all_levels",
      industry: filters.industry || "all_industries",
      search: filters.search || "",
      skills: filters.skills || []
    });
  }, [filters]);
  
  // Sample job data
  const allJobs: Job[] = [
    {
      id: 1,
      title: "UI/UX Design Intern",
      company: "TechBee Company",
      type: "Internship",
      location: "Amman, Jordan",
      schedule: "Part-time, 20 hours/week",
      salary: "300-500 JOD/month",
      skills: ["Figma", "UI Design", "Wireframing", "Adobe XD"],
      industry: "tech",
      icon: "fa-laptop-code",
      postedDate: "2025-04-25"
    },
    {
      id: 2,
      title: "Junior Web Developer",
      company: "Tech Solutions Inc.",
      type: "Full-time",
      location: "Cairo, Egypt",
      schedule: "Full-time, 40 hours/week",
      salary: "5000-7000 EGP/month",
      skills: ["React", "JavaScript", "HTML", "CSS"],
      industry: "tech",
      icon: "fa-code",
      postedDate: "2025-04-28"
    },
    {
      id: 3,
      title: "Marketing Assistant",
      company: "BeeMarketing Agency",
      type: "Entry Level",
      location: "Dubai, UAE",
      schedule: "Full-time, 40 hours/week",
      salary: "4000-6000 AED/month",
      skills: ["Social Media", "Content Creation", "Analytics"],
      industry: "marketing",
      icon: "fa-chart-bar",
      postedDate: "2025-05-01"
    },
    {
      id: 4,
      title: "Graphic Design Intern",
      company: "Creative Design Studio",
      type: "Internship",
      location: "Remote",
      schedule: "Part-time, 25 hours/week",
      salary: "400-600 USD/month",
      skills: ["Photoshop", "Illustrator", "Graphic Design", "Typography"],
      industry: "marketing",
      icon: "fa-paint-brush",
      postedDate: "2025-05-05"
    },
    {
      id: 5,
      title: "Data Analyst",
      company: "DataBee Analytics",
      type: "Full-time",
      location: "Riyadh, Saudi Arabia",
      schedule: "Full-time, 40 hours/week",
      salary: "8000-12000 SAR/month",
      skills: ["SQL", "Python", "Excel", "Data Visualization"],
      industry: "tech",
      icon: "fa-chart-line",
      postedDate: "2025-05-03"
    },
    {
      id: 6,
      title: "Front-end Developer",
      company: "WebHive Tech",
      type: "Full-time",
      location: "Istanbul, Turkey",
      schedule: "Full-time, 40 hours/week",
      salary: "15000-20000 TRY/month",
      skills: ["React", "TypeScript", "JavaScript", "HTML/CSS"],
      industry: "tech",
      icon: "fa-laptop-code",
      postedDate: "2025-05-02"
    },
    {
      id: 7,
      title: "Customer Service Representative",
      company: "SupportBee",
      type: "Part-time",
      location: "Remote",
      schedule: "Part-time, 20 hours/week",
      salary: "8-12 USD/hour",
      skills: ["Communication", "Problem Solving", "Customer Support"],
      industry: "retail",
      icon: "fa-headset",
      postedDate: "2025-05-04"
    },
    {
      id: 8,
      title: "Junior Financial Analyst",
      company: "FinanceBee",
      type: "Full-time",
      location: "Amman, Jordan",
      schedule: "Full-time, 40 hours/week",
      salary: "800-1200 JOD/month",
      skills: ["Financial Analysis", "Excel", "Accounting", "Finance"],
      industry: "finance",
      icon: "fa-chart-pie",
      postedDate: "2025-05-01"
    },
    {
      id: 9,
      title: "Content Creator",
      company: "ContentHive Media",
      type: "Freelance",
      location: "Remote",
      schedule: "Flexible hours",
      salary: "Pay per project",
      skills: ["Content Writing", "SEO", "Social Media", "Research"],
      industry: "marketing",
      icon: "fa-pen",
      postedDate: "2025-05-06"
    }
  ];
  
  // Filter jobs based on selected filters
  useEffect(() => {
    let result = [...allJobs];
    
    // Location filter
    if (localFilters.location !== "all_locations") {
      result = result.filter(job => job.location.toLowerCase().includes(localFilters.location.toLowerCase()));
    }
    
    // Job type filter
    if (localFilters.jobType !== "all_types") {
      result = result.filter(job => job.type.toLowerCase() === localFilters.jobType.toLowerCase());
    }
    
    // Experience filter - this would require more job data structure
    if (localFilters.experience !== "all_levels") {
      // Sample implementation - could be enhanced with actual experience data
      if (localFilters.experience === "entry") {
        result = result.filter(job => job.type.includes("Entry") || job.type.includes("Internship"));
      } else if (localFilters.experience === "internship") {
        result = result.filter(job => job.type.includes("Internship"));
      }
      // Additional experience filtering logic would go here
    }
    
    // Industry filter
    if (localFilters.industry !== "all_industries" && localFilters.industry) {
      result = result.filter(job => job.industry?.toLowerCase() === localFilters.industry.toLowerCase());
    }
    
    // Search text
    if (localFilters.search) {
      const searchLower = localFilters.search.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    // Skills filter
    if (localFilters.skills && localFilters.skills.length > 0) {
      result = result.filter(job => 
        localFilters.skills.some((skill: string) => 
          job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }
    
    // Sort by most recent
    result.sort((a, b) => {
      if (a.postedDate && b.postedDate) {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      }
      return 0;
    });
    
    setFilteredJobs(result);
  }, [localFilters]);
  
  // Handle filter changes (if used in a controlled component)
  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle apply to job
  const handleApply = () => {
    if (onApplyClick) {
      // Callback should return true if action can proceed, false if authentication needed
      if (!onApplyClick()) {
        return;
      }
    }
    
    // Logic for applying to job
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted.",
    });
  };

  // Simulate loading more jobs
  const handleLoadMore = () => {
    setLoadingMore(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoadingMore(false);
      toast({
        description: "All available jobs have been loaded",
      });
    }, 1000);
  };

  // Limit jobs shown on homepage
  const displayedJobs = fullPage ? filteredJobs : filteredJobs.slice(0, 6);

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
                    <SelectItem value="riyadh">Riyadh, Saudi Arabia</SelectItem>
                    <SelectItem value="istanbul">Istanbul, Turkey</SelectItem>
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
                    <SelectItem value="freelance">Freelance</SelectItem>
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
        
        {/* No jobs found message */}
        {displayedJobs.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">😞</div>
            <h3 className="text-xl font-semibold mb-2">No matching jobs found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to find more opportunities</p>
            {fullPage && (
              <Button 
                variant="outline" 
                className="border-[#F6C500] text-black hover:bg-[#FFFBEA]"
                onClick={() => {
                  setLocalFilters({
                    location: "all_locations",
                    jobType: "all_types",
                    experience: "all_levels",
                    industry: "all_industries",
                    search: "",
                    skills: []
                  });
                }}
              >
                Reset Filters
              </Button>
            )}
          </div>
        )}
        
        {/* Job Cards */}
        {displayedJobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedJobs.map((job, index) => (
              <JobCard 
                key={job.id} 
                job={job} 
                animationDelay={index % 3 * 100}
                onApply={handleApply}
              />
            ))}
          </div>
        )}
        
        {/* Load more button */}
        {fullPage && displayedJobs.length > 0 && (
          <div className="text-center mt-10 opacity-0 fade-in-up animate-delay-300">
            <Button 
              className="bg-white border-2 border-[#F6C500] text-[#F6C500] hover:bg-[#FFFBEA] rounded-full font-bold transition-colors duration-200"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? 'Loading...' : 'Load More Jobs'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
