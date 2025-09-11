import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, and, desc, like, ilike } from "drizzle-orm";
import { 
  users, 
  companies, 
  internships, 
  applications,
  type User, 
  type InsertUser,
  type Company,
  type InsertCompany,
  type Internship,
  type InsertInternship,
  type InternshipWithCompany,
  type Application,
  type InsertApplication
} from "@shared/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Company methods
  getCompanies(): Promise<Company[]>;
  getCompany(id: number): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;

  // Internship methods
  getInternships(filters?: {
    search?: string;
    location?: string;
    remote?: boolean;
    companyId?: number;
  }): Promise<InternshipWithCompany[]>;
  getInternship(id: number): Promise<InternshipWithCompany | undefined>;
  createInternship(internship: InsertInternship): Promise<Internship>;
  
  // Application methods
  getApplications(userId?: number, internshipId?: number): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplicationStatus(id: number, status: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Company methods
  async getCompanies(): Promise<Company[]> {
    return await db.select().from(companies).orderBy(desc(companies.createdAt));
  }

  async getCompany(id: number): Promise<Company | undefined> {
    const result = await db.select().from(companies).where(eq(companies.id, id));
    return result[0];
  }

  async createCompany(company: InsertCompany): Promise<Company> {
    const result = await db.insert(companies).values(company).returning();
    return result[0];
  }

  // Internship methods
  async getInternships(filters?: {
    search?: string;
    location?: string;
    remote?: boolean;
    companyId?: number;
  }): Promise<InternshipWithCompany[]> {
    // Build where conditions
    const conditions = [eq(internships.isActive, true)];
    
    if (filters?.search) {
      conditions.push(ilike(internships.title, `%${filters.search}%`));
    }
    
    if (filters?.location) {
      conditions.push(ilike(internships.location, `%${filters.location}%`));
    }
    
    if (filters?.remote !== undefined) {
      conditions.push(eq(internships.remote, filters.remote));
    }
    
    if (filters?.companyId) {
      conditions.push(eq(internships.companyId, filters.companyId));
    }

    const results = await db
      .select({
        id: internships.id,
        companyId: internships.companyId,
        title: internships.title,
        description: internships.description,
        requirements: internships.requirements,
        benefits: internships.benefits,
        location: internships.location,
        remote: internships.remote,
        duration: internships.duration,
        stipend: internships.stipend,
        applicationDeadline: internships.applicationDeadline,
        startDate: internships.startDate,
        isActive: internships.isActive,
        postedAt: internships.postedAt,
        createdAt: internships.createdAt,
        company: companies,
      })
      .from(internships)
      .leftJoin(companies, eq(internships.companyId, companies.id))
      .where(and(...conditions))
      .orderBy(desc(internships.postedAt));
    
    return results.map(result => ({
      ...result,
      company: result.company || { 
        id: 0, 
        name: "Unknown Company", 
        description: null,
        website: null,
        industry: null,
        size: null,
        logo: null,
        location: null,
        createdAt: new Date()
      }
    }));
  }

  async getInternship(id: number): Promise<InternshipWithCompany | undefined> {
    const results = await db
      .select({
        id: internships.id,
        companyId: internships.companyId,
        title: internships.title,
        description: internships.description,
        requirements: internships.requirements,
        benefits: internships.benefits,
        location: internships.location,
        remote: internships.remote,
        duration: internships.duration,
        stipend: internships.stipend,
        applicationDeadline: internships.applicationDeadline,
        startDate: internships.startDate,
        isActive: internships.isActive,
        postedAt: internships.postedAt,
        createdAt: internships.createdAt,
        company: companies,
      })
      .from(internships)
      .leftJoin(companies, eq(internships.companyId, companies.id))
      .where(eq(internships.id, id));

    const result = results[0];
    if (!result) return undefined;

    return {
      ...result,
      company: result.company || { 
        id: 0, 
        name: "Unknown Company", 
        description: null,
        website: null,
        industry: null,
        size: null,
        logo: null,
        location: null,
        createdAt: new Date()
      }
    };
  }

  async createInternship(internship: InsertInternship): Promise<Internship> {
    const result = await db.insert(internships).values(internship).returning();
    return result[0];
  }

  // Application methods
  async getApplications(userId?: number, internshipId?: number): Promise<Application[]> {
    if (userId && internshipId) {
      return await db.select().from(applications)
        .where(and(eq(applications.userId, userId), eq(applications.internshipId, internshipId)))
        .orderBy(desc(applications.appliedAt));
    } else if (userId) {
      return await db.select().from(applications)
        .where(eq(applications.userId, userId))
        .orderBy(desc(applications.appliedAt));
    } else if (internshipId) {
      return await db.select().from(applications)
        .where(eq(applications.internshipId, internshipId))
        .orderBy(desc(applications.appliedAt));
    } else {
      return await db.select().from(applications)
        .orderBy(desc(applications.appliedAt));
    }
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const result = await db.insert(applications).values(application).returning();
    return result[0];
  }

  async updateApplicationStatus(id: number, status: string): Promise<void> {
    await db.update(applications)
      .set({ status })
      .where(eq(applications.id, id));
  }
}

export const storage = new DatabaseStorage();
