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

  // Database initialization endpoint (call once in production)
  app.post("/api/init-database", async (req, res) => {
    try {
      console.log('🌱 Starting database initialization...');
      
      // Check if data already exists
      const existingCompanies = await storage.getCompanies();
      if (existingCompanies.length > 0) {
        return res.json({ 
          message: "Database already initialized", 
          companies: existingCompanies.length,
          status: "already_populated"
        });
      }

      // Create companies first
      console.log('📊 Creating companies...');
      const companyData = [
        { name: 'Tata Consultancy Services', description: 'Leading global IT services, consulting and business solutions company', website: 'https://www.tcs.com', industry: 'Information Technology', size: 'Large (10000+ employees)', logo: null, location: 'Mumbai' },
        { name: 'Infosys', description: 'Global leader in next-generation digital services and consulting', website: 'https://www.infosys.com', industry: 'Information Technology', size: 'Large (10000+ employees)', logo: null, location: 'Bangalore' },
        { name: 'Wipro', description: 'Leading technology services and consulting company', website: 'https://www.wipro.com', industry: 'Information Technology', size: 'Large (10000+ employees)', logo: null, location: 'Bangalore' },
        { name: 'State Bank of India', description: 'India\'s largest public sector bank', website: 'https://www.sbi.co.in', industry: 'Banking & Financial Services', size: 'Large (10000+ employees)', logo: null, location: 'Mumbai' },
        { name: 'HDFC Bank', description: 'Leading private sector bank in India', website: 'https://www.hdfcbank.com', industry: 'Banking & Financial Services', size: 'Large (10000+ employees)', logo: null, location: 'Mumbai' },
        { name: 'Reliance Industries', description: 'Leading petrochemicals, oil & gas, and retail conglomerate', website: 'https://www.ril.com', industry: 'Oil & Energy', size: 'Large (10000+ employees)', logo: null, location: 'Mumbai' },
        { name: 'Tata Motors', description: 'Leading automobile manufacturer in India', website: 'https://www.tatamotors.com', industry: 'Automotive', size: 'Large (10000+ employees)', logo: null, location: 'Mumbai' },
        { name: 'Apollo Hospitals', description: 'Leading healthcare provider in India', website: 'https://www.apollohospitals.com', industry: 'Healthcare & Life Sciences', size: 'Large (10000+ employees)', logo: null, location: 'Chennai' },
        { name: 'ITC Limited', description: 'Leading FMCG and consumer goods company', website: 'https://www.itcportal.com', industry: 'Retail & Consumer Goods', size: 'Large (10000+ employees)', logo: null, location: 'Kolkata' },
        { name: 'Asian Paints', description: 'India\'s largest paint company', website: 'https://www.asianpaints.com', industry: 'Chemical', size: 'Large (10000+ employees)', logo: null, location: 'Mumbai' }
      ];

      let createdCompanies = [];
      for (const company of companyData) {
        const created = await storage.createCompany(company);
        createdCompanies.push(created);
      }

      // Create internships
      console.log('💼 Creating internships...');
      const internshipData = [
        { companyId: createdCompanies[0].id, title: 'Software Development Intern', description: 'Work on enterprise software solutions, learn modern development practices, and contribute to real client projects.', requirements: 'Computer Science/IT students. Programming knowledge in Java, Python, or JavaScript preferred.', benefits: 'Industry exposure, mentorship program, potential full-time offer', location: 'Mumbai', remote: true, duration: '6 months', stipend: '25000', skills: '["Software Development", "Java", "Python", "JavaScript", "Programming", "Enterprise Software"]', startDate: new Date('2025-06-01'), applicationDeadline: new Date('2025-05-01'), isActive: true },
        { companyId: createdCompanies[0].id, title: 'Data Analytics Intern', description: 'Work with data analytics teams to analyze business data, create insights, and support decision-making processes.', requirements: 'Engineering/Statistics background. Knowledge of SQL, Python, and data visualization tools.', benefits: 'Data science training, analytics certification, industry exposure', location: 'Bangalore', remote: true, duration: '6 months', stipend: '28000', skills: '["Data Analytics", "SQL", "Python", "Data Visualization", "Business Intelligence", "Statistics"]', startDate: new Date('2025-06-15'), applicationDeadline: new Date('2025-05-15'), isActive: true },
        { companyId: createdCompanies[1].id, title: 'Product Management Intern', description: 'Support product managers in feature development, user research, and product strategy for enterprise software.', requirements: 'Engineering/MBA background. Product thinking, user research skills, analytical mindset.', benefits: 'Product management mentorship, PM certification, industry networking', location: 'Bangalore', remote: true, duration: '6 months', stipend: '30000', skills: '["Product Management", "User Research", "Product Strategy", "Analytics", "Agile", "Market Research"]', startDate: new Date('2025-07-01'), applicationDeadline: new Date('2025-06-01'), isActive: true },
        { companyId: createdCompanies[3].id, title: 'Banking Operations Intern', description: 'Learn banking operations, customer service, and financial products in public sector banking environment.', requirements: 'Any graduate, finance/banking interest, customer service orientation.', benefits: 'Banking industry exposure, financial services training, PSU experience', location: 'Mumbai', remote: false, duration: '6 months', stipend: '22000', skills: '["Banking Operations", "Customer Service", "Financial Services", "Banking Products", "Operations Management", "Financial Analysis"]', startDate: new Date('2025-06-10'), applicationDeadline: new Date('2025-05-10'), isActive: true },
        { companyId: createdCompanies[4].id, title: 'Digital Banking Intern', description: 'Work on digital banking initiatives, fintech solutions, and customer digital experience improvements.', requirements: 'Engineering/IT background, fintech interest, digital innovation mindset.', benefits: 'Digital banking exposure, fintech training, technology career path', location: 'Mumbai', remote: true, duration: '6 months', stipend: '26000', skills: '["Digital Banking", "Fintech", "Mobile Banking", "Digital Innovation", "Customer Experience", "Technology"]', startDate: new Date('2025-06-20'), applicationDeadline: new Date('2025-05-20'), isActive: true }
      ];

      let createdInternships = [];
      for (const internship of internshipData) {
        const created = await storage.createInternship(internship);
        createdInternships.push(created);
      }

      console.log('✅ Database initialization completed!');
      res.json({ 
        message: "Database successfully initialized!", 
        companies: createdCompanies.length,
        internships: createdInternships.length,
        status: "populated"
      });

    } catch (error) {
      console.error("❌ Error initializing database:", error);
      res.status(500).json({ error: "Failed to initialize database", details: error instanceof Error ? error.message : String(error) });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
