import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Protected API routes
  app.get("/api/dashboard", isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const user = await storage.getUser(userId);
    
    // Return different dashboard data based on user role
    if (user?.role === 'student') {
      res.json({ 
        message: "Student Dashboard",
        appliedJobs: [],
        savedJobs: [],
        recentSearches: []
      });
    } else if (user?.role === 'employer') {
      res.json({ 
        message: "Employer Dashboard",
        postedJobs: [],
        applications: [],
        analytics: {}
      });
    } else {
      res.json({ 
        message: "Admin Dashboard",
        stats: {}
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
