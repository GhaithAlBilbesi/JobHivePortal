import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useUser } from "@/contexts/UserContext";
import LoginModal from "@/components/auth/LoginModal";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

/**
 * Resume Builder Page
 * 
 * A comprehensive tool for students and graduates to create professional resumes
 * Features step-by-step process with templates and guidance for each section
 * Only accessible to authenticated students
 */
const ResumeBuilder = () => {
  const { ref: pageRef } = useScrollAnimation();
  const { isAuthenticated, user, isRole } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  // Set page title
  useEffect(() => {
    document.title = "Resume Builder - JobHive";
  }, []);

  // Check if user is authenticated and has student role
  useEffect(() => {
    if (isAuthenticated) {
      if (!isRole('student')) {
        toast({
          title: "Access Restricted",
          description: "Resume Builder is only available to student accounts.",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Resume Builder</h1>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Our resume builder is designed specifically for students and fresh graduates.
              Sign in with your student account to access this feature.
            </p>
            <Button 
              style={{ backgroundColor: "#F6C500", color: "#000000" }}
              onClick={() => setIsLoginModalOpen(true)}
              size="lg"
            >
              Sign In to Access Resume Builder
            </Button>
          </div>
          <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => setIsLoginModalOpen(false)} 
            action="login"
            afterLogin={() => {
              toast({
                title: "Welcome!",
                description: "You can now access the Resume Builder."
              });
            }}
          />
        </div>
      </main>
    );
  }

  // For authenticated students, show resume builder
  return (
    <main className="py-20 px-4" ref={pageRef}>
      <div className="container fade-in-up">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Your Professional Resume</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Our resume builder is designed specifically for students and fresh graduates.
            Highlight your skills, education, and projects in a professional format that stands out to employers.
          </p>
        </div>

        <Card className="mb-10 fade-in-up animate-delay-100">
          <CardContent className="p-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-5 mb-8 w-full">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              
              {/* Personal Information Tab */}
              <TabsContent value="personal" className="mt-4">
                <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
                <p className="mb-6 text-gray-600">
                  This information will be displayed at the top of your resume. Make sure to include accurate contact details.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+1 234 567 8900" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="linkedIn">LinkedIn Profile (Optional)</Label>
                    <Input id="linkedIn" placeholder="https://linkedin.com/in/yourprofile" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea id="summary" placeholder="Write a brief professional summary..." rows={4} />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button style={{ backgroundColor: "#F6C500", color: "#000000" }}>
                    Save & Continue
                  </Button>
                </div>
              </TabsContent>
              
              {/* Education Tab */}
              <TabsContent value="education" className="mt-4">
                <h2 className="text-2xl font-bold mb-4">Education</h2>
                <p className="mb-6 text-gray-600">
                  Add your educational background, starting with the most recent. Include relevant coursework and achievements.
                </p>
                
                <Card className="mb-6 border-dashed">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution Name</Label>
                        <Input id="institution" placeholder="University or College Name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="degree">Degree / Program</Label>
                        <Input id="degree" placeholder="B.Sc, M.Sc, Diploma, etc." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" type="month" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date (or Expected)</Label>
                        <Input id="endDate" type="month" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="relevantCourses">Relevant Coursework (Optional)</Label>
                        <Input id="relevantCourses" placeholder="List relevant courses separated by commas" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="achievements">Achievements / Activities (Optional)</Label>
                        <Textarea id="achievements" placeholder="Describe your academic achievements, clubs, or activities..." rows={3} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Button style={{ backgroundColor: "#FFFBEA", color: "#000000", border: "1px dashed #F6C500" }} className="w-full mb-6">
                  <i className="fas fa-plus mr-2"></i> Add Another Education
                </Button>
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline">
                    Previous: Personal Info
                  </Button>
                  <Button style={{ backgroundColor: "#F6C500", color: "#000000" }}>
                    Save & Continue
                  </Button>
                </div>
              </TabsContent>
              
              {/* Other tabs would be implemented similarly */}
              <TabsContent value="experience" className="mt-4">
                <h2 className="text-2xl font-bold mb-4">Experience</h2>
                <p className="mb-6 text-gray-600">
                  Add your work experience, internships, or volunteer work. For students, include projects or part-time jobs.
                </p>
                {/* Experience form fields would go here */}
                <div className="mt-6 flex justify-between">
                  <Button variant="outline">
                    Previous: Education
                  </Button>
                  <Button style={{ backgroundColor: "#F6C500", color: "#000000" }}>
                    Save & Continue
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="skills" className="mt-4">
                <h2 className="text-2xl font-bold mb-4">Skills & Certifications</h2>
                <p className="mb-6 text-gray-600">
                  List your technical skills, soft skills, languages, and any relevant certifications.
                </p>
                {/* Skills form fields would go here */}
                <div className="mt-6 flex justify-between">
                  <Button variant="outline">
                    Previous: Experience
                  </Button>
                  <Button style={{ backgroundColor: "#F6C500", color: "#000000" }}>
                    Save & Continue
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="mt-4">
                <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>
                <p className="mb-6 text-gray-600">
                  Preview your resume and make any final adjustments before downloading.
                </p>
                <div className="bg-white p-8 border rounded-lg min-h-[500px] mb-6">
                  <p className="text-center text-gray-400">Resume preview will appear here</p>
                </div>
                <div className="mt-6 flex justify-between">
                  <Button variant="outline">
                    Previous: Skills
                  </Button>
                  <Button style={{ backgroundColor: "#F6C500", color: "#000000" }}>
                    Download PDF
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Resume Tips Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-up animate-delay-200">
          <Card>
            <CardContent className="p-6">
              <div className="bg-[#FFFBEA] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <i className="fas fa-lightbulb text-[#F6C500] text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Resume Tips</h3>
              <p className="text-gray-600">
                Keep your resume to one page, use action verbs, and quantify your achievements whenever possible.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="bg-[#FFFBEA] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <i className="fas fa-file-alt text-[#F6C500] text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">ATS Optimization</h3>
              <p className="text-gray-600">
                Use keywords from the job description to help your resume pass through Applicant Tracking Systems.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="bg-[#FFFBEA] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <i className="fas fa-check-double text-[#F6C500] text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Proofreading</h3>
              <p className="text-gray-600">
                Always proofread your resume for spelling and grammar errors. Ask a friend or mentor to review it as well.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilder;
