import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useUser } from "@/contexts/UserContext";
import LoginModal from "@/components/auth/LoginModal";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

/**
 * Post Job Page
 * 
 * Allows employers to post new job listings
 * Only accessible to authenticated employers
 */
const PostJob = () => {
  const { ref: pageRef } = useScrollAnimation();
  const { isAuthenticated, user, isRole } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  // Set page title
  useEffect(() => {
    document.title = "Post a Job - JobHive";
  }, []);

  // Check if user is authenticated and has employer role
  useEffect(() => {
    if (isAuthenticated) {
      if (!isRole('employer')) {
        toast({
          title: "Access Restricted",
          description: "Job posting is only available to employer accounts.",
          variant: "destructive"
        });
        navigate("/");
      }
    }
  }, [isAuthenticated, isRole, navigate, toast]);

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <main className="py-20 px-4" ref={pageRef}>
        <div className="container fade-in-up">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Post a Job</h1>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Connect with talented students and fresh graduates by posting your job opportunities.
              Sign in with your employer account to access this feature.
            </p>
            <Button 
              style={{ backgroundColor: "#F6C500", color: "#000000" }}
              onClick={() => setIsLoginModalOpen(true)}
              size="lg"
            >
              Sign In to Post a Job
            </Button>
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Why Post on JobHive?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-[#FFFBEA] rounded-lg">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Access Fresh Talent</h3>
                <p>Connect with motivated students and recent graduates with up-to-date skills.</p>
              </div>
              <div className="p-6 bg-[#FFFBEA] rounded-lg">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Simple Posting Process</h3>
                <p>Post a job in minutes with our streamlined form designed for busy employers.</p>
              </div>
              <div className="p-6 bg-[#FFFBEA] rounded-lg">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Track Applications</h3>
                <p>Review applications and communicate with candidates all in one platform.</p>
              </div>
            </div>
          </div>
          <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => setIsLoginModalOpen(false)} 
            action="login"
            afterLogin={() => {
              toast({
                title: "Welcome!",
                description: "You can now post job opportunities."
              });
            }}
          />
        </div>
      </main>
    );
  }

  // For authenticated employers, show job posting form
  return (
    <main className="py-20 px-4" ref={pageRef}>
      <div className="container fade-in-up">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Post a New Job</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Fill in the details below to post your job opportunity and connect with talented students and graduates.
          </p>
        </div>

        <Card className="mb-10 fade-in-up animate-delay-100 max-w-3xl mx-auto">
          <CardContent className="p-6">
            <form onSubmit={(e) => {
              e.preventDefault();
              toast({
                title: "Job Posted",
                description: "Your job has been successfully posted and is now live."
              });
            }}>
              <div className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input id="jobTitle" placeholder="e.g. Frontend Developer, Marketing Intern" required />
                </div>
                
                {/* Job Type */}
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type *</Label>
                  <Select required>
                    <SelectTrigger id="jobType">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Job Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input id="location" placeholder="e.g. Amman, Jordan" required />
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="isRemote" className="w-4 h-4" />
                      <label htmlFor="isRemote">Remote work available</label>
                    </div>
                  </div>
                </div>
                
                {/* Job Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the role, responsibilities, and ideal candidate..." 
                    rows={6}
                    required
                  />
                </div>
                
                {/* Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements *</Label>
                  <Textarea 
                    id="requirements" 
                    placeholder="List the required skills, experience, and qualifications..." 
                    rows={4}
                    required
                  />
                </div>
                
                {/* Salary Range */}
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input id="salary" placeholder="e.g. $30,000 - $40,000 per year" />
                </div>
                
                {/* Application Deadline */}
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    style={{ backgroundColor: "#F6C500", color: "#000000" }}
                    className="w-full"
                  >
                    Post Job
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            By posting a job, you agree to our terms of service and job posting guidelines.
            All jobs must be appropriate for students and recent graduates.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PostJob;