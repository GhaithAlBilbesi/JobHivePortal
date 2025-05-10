import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useUser } from "@/contexts/UserContext";
import LoginModal from "@/components/auth/LoginModal";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Progress } from "@/components/ui/progress";

/**
 * Dashboard Page
 * 
 * Displays a role-specific dashboard for users
 * Features different content based on user role (student, employer, admin)
 * Only accessible to authenticated users
 */
const Dashboard = () => {
  const { ref: pageRef } = useScrollAnimation();
  const { isAuthenticated, user, isRole } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  // Set page title
  useEffect(() => {
    document.title = "Dashboard - JobHive";
  }, []);

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <main className="py-20 px-4" ref={pageRef}>
        <div className="container fade-in-up">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Dashboard</h1>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Sign in to access your personalized dashboard with job applications, saved jobs, and more.
            </p>
            <Button 
              style={{ backgroundColor: "#F6C500", color: "#000000" }}
              onClick={() => setIsLoginModalOpen(true)}
              size="lg"
            >
              Sign In to Access Dashboard
            </Button>
          </div>
          <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => setIsLoginModalOpen(false)} 
            action="login"
            afterLogin={() => {
              toast({
                title: "Welcome!",
                description: "You can now access your dashboard."
              });
            }}
          />
        </div>
      </main>
    );
  }

  // Student Dashboard
  if (isRole('student')) {
    return (
      <main className="py-20 px-4" ref={pageRef}>
        <div className="container fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Student Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={() => navigate("/resume-builder")}
                style={{ backgroundColor: "#F6C500", color: "#000000" }}
              >
                Update Resume
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">3</div>
                <p className="text-sm text-gray-500">Jobs you've applied for</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Saved Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">8</div>
                <p className="text-sm text-gray-500">Jobs you've bookmarked</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Resume Completeness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">65%</div>
                <Progress value={65} className="h-2 mb-2" />
                <p className="text-sm text-gray-500">Complete your profile to improve visibility</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="applications">
            <TabsList className="w-full border-b mb-8">
              <TabsTrigger value="applications" className="flex-1">My Applications</TabsTrigger>
              <TabsTrigger value="saved" className="flex-1">Saved Jobs</TabsTrigger>
              <TabsTrigger value="recommended" className="flex-1">Recommended Jobs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">Frontend Developer</h3>
                          <p className="text-gray-600">WebHive Tech • Istanbul, Turkey</p>
                        </div>
                        <Badge>Applied</Badge>
                      </div>
                      <p className="text-sm text-gray-500">Applied on May 4, 2025 • Status: Under Review</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">UI/UX Design Intern</h3>
                          <p className="text-gray-600">TechBee Company • Amman, Jordan</p>
                        </div>
                        <Badge variant="outline">Interview Scheduled</Badge>
                      </div>
                      <p className="text-sm text-gray-500">Applied on May 1, 2025 • Interview: May 12, 2025</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">Content Creator</h3>
                          <p className="text-gray-600">ContentHive Media • Remote</p>
                        </div>
                        <Badge variant="secondary">Rejected</Badge>
                      </div>
                      <p className="text-sm text-gray-500">Applied on April 25, 2025 • Status: Not Selected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="saved">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">Data Analyst</h3>
                          <p className="text-gray-600">DataBee Analytics • Riyadh, Saudi Arabia</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-xs">SQL</Badge>
                            <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-xs">Python</Badge>
                            <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-xs">Data Visualization</Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Apply</Button>
                      </div>
                    </div>
                    {/* Additional saved jobs would be listed here */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommended">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">Junior Web Developer</h3>
                          <p className="text-gray-600">HiveWorks Solutions • Cairo, Egypt</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-xs">React</Badge>
                            <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-xs">JavaScript</Badge>
                            <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-xs">HTML/CSS</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Save</Button>
                          <Button variant="default" size="sm" style={{ backgroundColor: "#F6C500", color: "#000000" }}>Apply</Button>
                        </div>
                      </div>
                    </div>
                    {/* Additional recommended jobs would be listed here */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    );
  }

  // Employer Dashboard
  if (isRole('employer')) {
    return (
      <main className="py-20 px-4" ref={pageRef}>
        <div className="container fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Employer Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={() => navigate("/post-job")}
                style={{ backgroundColor: "#F6C500", color: "#000000" }}
              >
                Post New Job
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Posted Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">5</div>
                <p className="text-sm text-gray-500">Active job listings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Total Applicants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">42</div>
                <p className="text-sm text-gray-500">Across all job postings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Profile Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">138</div>
                <p className="text-sm text-gray-500">In the last 30 days</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="jobs">
            <TabsList className="w-full border-b mb-8">
              <TabsTrigger value="jobs" className="flex-1">My Job Postings</TabsTrigger>
              <TabsTrigger value="applicants" className="flex-1">Recent Applicants</TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="jobs">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">Frontend Developer</h3>
                          <p className="text-gray-600">Full-time • Istanbul, Turkey</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>
                      <div className="flex justify-between mt-4">
                        <p className="text-sm text-gray-500">Posted on May 2, 2025 • 12 applicants</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">View Applicants</Button>
                        </div>
                      </div>
                    </div>
                    {/* Additional job postings would be listed here */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="applicants">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">Sarah Johnson</h3>
                          <p className="text-gray-600">Applied for: Frontend Developer</p>
                          <p className="text-sm text-gray-500 mt-1">Computer Science Graduate • 3 years experience</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Resume</Button>
                          <Button variant="default" size="sm" style={{ backgroundColor: "#F6C500", color: "#000000" }}>Message</Button>
                        </div>
                      </div>
                    </div>
                    {/* Additional applicants would be listed here */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Job Posting Performance</h3>
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Analytics visualization will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    );
  }

  // Admin Dashboard
  if (isRole('admin')) {
    return (
      <main className="py-20 px-4" ref={pageRef}>
        <div className="container fade-in-up">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Platform management and analytics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">1,254</div>
                <p className="text-sm text-gray-500">+24 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Active Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">87</div>
                <p className="text-sm text-gray-500">Across all employers</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">563</div>
                <p className="text-sm text-gray-500">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">42%</div>
                <p className="text-sm text-gray-500">Placement rate</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users">
            <TabsList className="w-full border-b mb-8">
              <TabsTrigger value="users" className="flex-1">User Management</TabsTrigger>
              <TabsTrigger value="jobs" className="flex-1">Job Listings</TabsTrigger>
              <TabsTrigger value="reports" className="flex-1">Reports</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">System Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">User Accounts</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Export Data</Button>
                      <Button variant="default" size="sm" style={{ backgroundColor: "#F6C500", color: "#000000" }}>Add User</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">Ahmad Al-Najjar</h3>
                          <p className="text-gray-600">Student • Registered on April 10, 2025</p>
                        </div>
                        <Badge>Student</Badge>
                      </div>
                    </div>
                    {/* Additional users would be listed here */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="jobs">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Platform Job Listings</h3>
                  <p className="text-gray-500">Job management interface will be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">System Reports</h3>
                  <p className="text-gray-500">Reports and analytics will be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">System Configuration</h3>
                  <p className="text-gray-500">Settings management interface will be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    );
  }

  // Fallback for unknown role
  return (
    <main className="py-20 px-4" ref={pageRef}>
      <div className="container fade-in-up">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Welcome to your dashboard. We're preparing your experience.
          </p>
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;