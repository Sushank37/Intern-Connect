import { pgTable, text, serial, integer, boolean, timestamp, varchar, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  website: text("website"),
  industry: text("industry"),
  size: text("size"), // "startup", "medium", "large", "enterprise"
  logo: text("logo"),
  location: text("location"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const internships = pgTable("internships", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements"),
  benefits: text("benefits"),
  location: text("location"),
  remote: boolean("remote").default(false),
  duration: text("duration"), // "3 months", "6 months", etc.
  stipend: numeric("stipend", { precision: 10, scale: 2 }),
  applicationDeadline: timestamp("application_deadline"),
  startDate: timestamp("start_date"),
  isActive: boolean("is_active").default(true),
  postedAt: timestamp("posted_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  internshipId: integer("internship_id").notNull().references(() => internships.id),
  status: text("status").notNull().default("pending"), // "pending", "reviewed", "accepted", "rejected"
  coverLetter: text("cover_letter"),
  resume: text("resume"), // URL or file path
  appliedAt: timestamp("applied_at").notNull().defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
}).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
});

export const insertCompanySchema = createInsertSchema(companies).pick({
  name: true,
  description: true,
  website: true,
  industry: true,
  size: true,
  logo: true,
  location: true,
});

export const insertInternshipSchema = createInsertSchema(internships, {
  stipend: z.string().optional(),
}).pick({
  companyId: true,
  title: true,
  description: true,
  requirements: true,
  benefits: true,
  location: true,
  remote: true,
  duration: true,
  stipend: true,
  applicationDeadline: true,
  startDate: true,
});

export const insertApplicationSchema = createInsertSchema(applications).pick({
  userId: true,
  internshipId: true,
  coverLetter: true,
  resume: true,
});

// TypeScript types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

export type InsertInternship = z.infer<typeof insertInternshipSchema>;
export type Internship = typeof internships.$inferSelect;

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

// Extended types for API responses
export type InternshipWithCompany = Internship & {
  company: Company;
};

export type ApplicationWithDetails = Application & {
  internship: InternshipWithCompany;
  user: Omit<User, 'password'>;
};
