#!/usr/bin/env node

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { companies, internships } from '../shared/schema.js';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

const companiesData = [
  // IT & Technology Companies (Companies 1-25)
  { id: 1, name: 'Tata Consultancy Services', description: 'Leading global IT services, consulting and business solutions company', website: 'https://www.tcs.com', industry: 'Information Technology', size: 'Large (10000+ employees)', logo: null, location: 'Mumbai' },
  { id: 2, name: 'Infosys', description: 'Global leader in next-generation digital services and consulting', website: 'https://www.infosys.com', industry: 'Information Technology', size: 'Large (10000+ employees)', logo: null, location: 'Bangalore' },
  { id: 3, name: 'Wipro', description: 'Leading technology services and consulting company', website: 'https://www.wipro.com', industry: 'Information Technology', size: 'Large (10000+ employees)', logo: null, location: 'Bangalore' },
  { id: 4, name: 'HCL Technologies', description: 'Global technology company offering comprehensive services', website: 'https://www.hcltech.com', industry: 'Information Technology', size: 'Large (10000+ employees)', logo: null, location: 'Noida' },
  { id: 5, name: 'Tech Mahindra', description: 'Leading provider of digital transformation, consulting and business re-engineering services', website: 'https://www.techmahindra.com', industry: 'Information Technology', size: 'Large (10000+ employees)', logo: null, location: 'Pune' },
];

const internshipsData = [
  { id: 1, companyId: 1, title: 'Software Development Intern', description: 'Work on enterprise software solutions, learn modern development practices, and contribute to real client projects.', requirements: 'Computer Science/IT students. Programming knowledge in Java, Python, or JavaScript preferred.', benefits: 'Industry exposure, mentorship program, potential full-time offer', location: 'Mumbai', remote: true, duration: '6 months', stipend: '25000', skills: JSON.stringify(['Software Development', 'Java', 'Python', 'JavaScript', 'Programming', 'Enterprise Software']), startDate: new Date('2025-06-01'), applicationDeadline: new Date('2025-05-01'), isActive: true },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Insert a sample company first
    console.log('📊 Inserting companies...');
    await db.insert(companies).values(companiesData).onConflictDoNothing();
    
    // Insert a sample internship
    console.log('💼 Inserting internships...');
    await db.insert(internships).values(internshipsData).onConflictDoNothing();

    console.log('✅ Database seeding completed successfully!');
    console.log('📈 Added sample data - you can now add more through the API or SQL runner');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();