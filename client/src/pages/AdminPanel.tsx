import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Admin Panel Page
 * 
 * Comprehensive dashboard for platform administrators
 * Features user management, content moderation, and analytics
 * Only accessible to authenticated admins
 */
const AdminPanel = () => {
  const { isAuthenticated, user, isRole } = useUser();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Set page title
  useEffect(() => {
    document.title = "Admin Panel - JobHive";
  }, []);

  // Check if user is authenticated and has admin role
  useEffect(() => {
    if (isAuthenticated) {
      if (!isRole('admin')) {
        toast({
          title: "Access Restricted",
          description: "Admin Panel is only available to administrators.",
          variant: "destructive"
        });
        navigate("/");
      }
    }
  }, [isAuthenticated, isRole, navigate, toast]);

  // Mock data for the admin panel
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "student", status: "active", joinDate: "2025-03-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "employer", status: "active", joinDate: "2025-02-20" },
    { id: 3, name: "Alex Johnson", email: "alex@example.com", role: "student", status: "pending", joinDate: "2025-05-01" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "employer", status: "inactive", joinDate: "2025-01-10" },
    { id: 5, name: "Michael Brown", email: "michael@example.com", role: "student", status: "active", joinDate: "2025-04-05" }
  ];

  const jobs = [
    { id: 1, title: "Frontend Developer", company: "TechCorp", status: "approved", postedDate: "2025-04-25" },
    { id: 2, title: "Data Analyst", company: "AnalyticsPro", status: "pending", postedDate: "2025-05-02" },
    { id: 3, title: "UX Designer", company: "DesignHub", status: "approved", postedDate: "2025-04-18" },
    { id: 4, title: "Marketing Specialist", company: "GrowthGenius", status: "rejected", postedDate: "2025-05-03" },
    { id: 5, title: "Software Engineer", company: "CodeMasters", status: "approved", postedDate: "2025-04-30" }
  ];

  const reports = [
    { id: 1, type: "Job", title: "Suspicious Job Listing", status: "pending", reportedDate: "2025-05-04" },
    { id: 2, type: "User", title: "Inappropriate Behavior", status: "resolved", reportedDate: "2025-05-01" },
    { id: 3, type: "Content", title: "Copyright Violation", status: "investigating", reportedDate: "2025-05-03" }
  ];

  // Filter function for search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <main className="py-20 px-4">
        <div className="container">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admin Panel</h1>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Please sign in with administrator credentials to access the admin panel.
            </p>
            <Button 
              style={{ backgroundColor: "#F6C500", color: "#000000" }}
              onClick={() => navigate("/login")}
              size="lg"
            >
              Sign In to Access Admin Panel
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // Admin Panel for authenticated admins
  return (
    <main className="py-20 px-4">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Panel</h1>
            <p className="text-gray-600">Platform management and analytics dashboard</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Admin Access
            </span>
            <span className="text-gray-600">
              Welcome, {user?.name}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">586</div>
              <p className="text-sm text-gray-500">+12 this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">143</div>
              <p className="text-sm text-gray-500">+8 this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">872</div>
              <p className="text-sm text-gray-500">+35 this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Pending Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">4</div>
              <p className="text-sm text-gray-500">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="w-full border-b mb-8">
            <TabsTrigger value="users" className="flex-1">Users</TabsTrigger>
            <TabsTrigger value="jobs" className="flex-1">Jobs</TabsTrigger>
            <TabsTrigger value="reports" className="flex-1">Reports</TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="relative w-full sm:w-64">
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <i className="fas fa-search"></i>
                    </div>
                  </div>
                  <Button style={{ backgroundColor: "#F6C500", color: "#000000" }}>
                    Add New User
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              user.status === 'active' ? 'bg-green-100 text-green-800' :
                              user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex justify-between">
                  <h3 className="text-xl font-bold">Job Management</h3>
                  <Button style={{ backgroundColor: "#F6C500", color: "#000000" }}>
                    Add New Job
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Posted Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>{job.id}</TableCell>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              job.status === 'approved' ? 'bg-green-100 text-green-800' :
                              job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{job.postedDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Edit</Button>
                            {job.status === 'pending' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-green-500"
                              >
                                Approve
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Reported Content</h3>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reported Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.id}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                              report.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.reportedDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Review</Button>
                            {report.status !== 'resolved' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-green-500"
                              >
                                Resolve
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Platform Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">User Growth Chart</p>
                  </div>
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Job Postings Chart</p>
                  </div>
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Application Success Rate</p>
                  </div>
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Website Traffic</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Platform Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium mb-3">General Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input id="siteName" defaultValue="JobHive" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="siteDescription">Site Description</Label>
                        <Input id="siteDescription" defaultValue="Job Portal for Students and Fresh Graduates" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-3">Email Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="adminEmail">Admin Email</Label>
                        <Input id="adminEmail" defaultValue="admin@jobhive.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supportEmail">Support Email</Label>
                        <Input id="supportEmail" defaultValue="support@jobhive.com" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button style={{ backgroundColor: "#F6C500", color: "#000000" }}>
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default AdminPanel;