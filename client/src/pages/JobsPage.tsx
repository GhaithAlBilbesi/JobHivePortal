import { useEffect, useState } from "react";
import JobListings from "@/components/JobListings";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

/**
 * Jobs Page Component
 * 
 * Dedicated page for job listings with expanded filtering capabilities
 * Features more comprehensive search and filter options than the homepage version
 */
const JobsPage = () => {
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    experience: "",
    search: ""
  });

  // Set page title
  useEffect(() => {
    document.title = "Explore Jobs - JobHive";
  }, []);

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <main className="py-20 px-4">
      <div className="container">
        <div className="mb-10 fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Job</h1>
          <p className="text-lg max-w-2xl">
            Explore our extensive list of jobs and internships tailored for students and fresh graduates.
            Use the filters below to narrow down your search.
          </p>
        </div>

        {/* Advanced Filters */}
        <Card className="mb-8 fade-in-up animate-delay-100">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
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

              <div className="space-y-2">
                <Label htmlFor="job-type">Job Type</Label>
                <Select value={filters.jobType} onValueChange={(value) => handleFilterChange("jobType", value)}>
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

              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Select value={filters.experience} onValueChange={(value) => handleFilterChange("experience", value)}>
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

              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <Input 
                  id="search" 
                  type="text" 
                  placeholder="Keywords, Job Title, Company..." 
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings Component (same as homepage but with applied filters) */}
        <JobListings filters={filters} fullPage={true} />
      </div>
    </main>
  );
};

export default JobsPage;
