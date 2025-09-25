import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertCompanySchema, 
  insertInternshipSchema, 
  insertApplicationSchema 
} from "@shared/schema";
import { generateCompanies, generateInternships } from "../scripts/generate-pm-dataset.js";

// Automatic database initialization for production
async function initializeProductionDatabase() {
  try {
    // Only run in production or when explicitly needed
    const isProduction = process.env.NODE_ENV === 'production' || process.env.FORCE_SEED === 'true';
    
    if (!isProduction) {
      console.log('🔧 Development environment detected. Skipping automatic seeding.');
      return;
    }
    
    console.log('🔍 Checking database status for production seeding...');
    const existingCompanies = await storage.getCompanies();
    const existingInternships = await storage.getInternships();
    
    // Check if we have the minimum required data (150 companies, 400 internships)
    const hasMinimumCompanies = existingCompanies.length >= 150;
    const hasMinimumInternships = existingInternships.length >= 400;
    
    if (hasMinimumCompanies && hasMinimumInternships) {
      console.log(`✅ Database fully populated: ${existingCompanies.length} companies, ${existingInternships.length} internships. Skipping initialization.`);
      return;
    }
    
    if (existingCompanies.length > 0) {
      console.log(`⚠️  Partial data detected: ${existingCompanies.length} companies, ${existingInternships.length} internships. Proceeding with full reseeding.`);
      // For simplicity, we'll proceed with full seeding which will add to existing data
      // In production, you might want to clear and reseed to ensure clean state
    }
    
    console.log('🌱 Database is empty. Starting comprehensive data generation...');
    console.log('📊 Generating PM Internship Scheme dataset with 150+ companies and 400+ internships...');
    
    // Generate companies (150+ across 24 sectors)
    const companyData = generateCompanies();
    console.log(`📈 Generated ${companyData.length} companies across 24 PM scheme sectors`);
    
    // Create companies in batches
    let createdCompanies = [];
    for (let i = 0; i < companyData.length; i += 10) {
      const batch = companyData.slice(i, i + 10);
      console.log(`📝 Creating companies batch ${Math.floor(i/10) + 1}/${Math.ceil(companyData.length/10)}`);
      
      for (const company of batch) {
        const created = await storage.createCompany(company);
        createdCompanies.push(created);
      }
      
      // Small delay to prevent overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`✅ Created ${createdCompanies.length} companies successfully`);
    
    // Generate internships (2-3 per company = 300-400+ total)
    const internshipData = generateInternships(createdCompanies);
    console.log(`💼 Generated ${internshipData.length} internships with proper skills matching`);
    
    // Create internships in batches
    let createdInternships = [];
    for (let i = 0; i < internshipData.length; i += 15) {
      const batch = internshipData.slice(i, i + 15);
      console.log(`📝 Creating internships batch ${Math.floor(i/15) + 1}/${Math.ceil(internshipData.length/15)}`);
      
      for (const internship of batch) {
        const created = await storage.createInternship(internship);
        createdInternships.push(created);
      }
      
      // Small delay to prevent overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    console.log('🎉 DATABASE INITIALIZATION COMPLETE!');
    console.log(`✅ Successfully created:`);
    console.log(`   📊 ${createdCompanies.length} companies across 24 sectors`);
    console.log(`   💼 ${createdInternships.length} internships with skills matching`);
    console.log(`   🔗 Full PM Internship Scheme coverage achieved`);
    
  } catch (error) {
    console.error('❌ Error during database initialization:', error);
    console.error('⚠️  Server will continue, but manual initialization may be needed');
    // Don't throw - let server continue even if seeding fails
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Automatic database seeding for production (runs once on startup)
  await initializeProductionDatabase();

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
