import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertCompanySchema, 
  insertInternshipSchema, 
  insertApplicationSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Internship routes
  app.get("/api/internships", async (req, res) => {
    try {
      const { search, location, remote, company_id } = req.query;
      
      const filters: any = {};
      if (search) filters.search = search as string;
      if (location) filters.location = location as string;
      if (remote !== undefined) filters.remote = remote === 'true';
      if (company_id) filters.companyId = parseInt(company_id as string);

      const internships = await storage.getInternships(filters);
      res.json(internships);
    } catch (error) {
      console.error("Error fetching internships:", error);
      res.status(500).json({ error: "Failed to fetch internships" });
    }
  });

  app.get("/api/internships/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const internship = await storage.getInternship(id);
      
      if (!internship) {
        return res.status(404).json({ error: "Internship not found" });
      }
      
      res.json(internship);
    } catch (error) {
      console.error("Error fetching internship:", error);
      res.status(500).json({ error: "Failed to fetch internship" });
    }
  });

  app.post("/api/internships", async (req, res) => {
    try {
      const validatedData = insertInternshipSchema.parse(req.body);
      const internship = await storage.createInternship(validatedData);
      res.status(201).json(internship);
    } catch (error) {
      console.error("Error creating internship:", error);
      res.status(400).json({ error: "Failed to create internship" });
    }
  });

  // Company routes
  app.get("/api/companies", async (req, res) => {
    try {
      const companies = await storage.getCompanies();
      res.json(companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      res.status(500).json({ error: "Failed to fetch companies" });
    }
  });

  app.get("/api/companies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const company = await storage.getCompany(id);
      
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      
      res.json(company);
    } catch (error) {
      console.error("Error fetching company:", error);
      res.status(500).json({ error: "Failed to fetch company" });
    }
  });

  app.post("/api/companies", async (req, res) => {
    try {
      const validatedData = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(validatedData);
      res.status(201).json(company);
    } catch (error) {
      console.error("Error creating company:", error);
      res.status(400).json({ error: "Failed to create company" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ error: "Failed to create user" });
    }
  });

  // Application routes
  app.get("/api/applications", async (req, res) => {
    try {
      const { user_id, internship_id } = req.query;
      
      let userId: number | undefined;
      let internshipId: number | undefined;
      
      if (user_id) userId = parseInt(user_id as string);
      if (internship_id) internshipId = parseInt(internship_id as string);
      
      const applications = await storage.getApplications(userId, internshipId);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(400).json({ error: "Failed to create application" });
    }
  });

  app.patch("/api/applications/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !['pending', 'reviewed', 'accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      
      await storage.updateApplicationStatus(id, status);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating application status:", error);
      res.status(500).json({ error: "Failed to update application status" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
