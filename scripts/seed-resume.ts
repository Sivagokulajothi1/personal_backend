import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';

const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function clearCollection(collectionPath: string) {
  const snapshot = await db.collection(collectionPath).get();
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  if (snapshot.size > 0) {
    await batch.commit();
    console.log(`Cleared ${snapshot.size} documents from ${collectionPath}`);
  }
}

async function seedData() {
  console.log("Starting database seed with Resume data...");

  // Clear existing
  await clearCollection('skills');
  await clearCollection('experience');
  await clearCollection('education');
  await clearCollection('projects');

  // 1. SKILLS
  const skillsData = [
    // Frontend
    { name: 'React', category: 'Frontend', level: 90, order: 1, visible: true },
    { name: 'React Native', category: 'Frontend', level: 85, order: 2, visible: true },
    { name: 'Flutter', category: 'Frontend', level: 80, order: 3, visible: true },
    { name: 'HTML5', category: 'Frontend', level: 95, order: 4, visible: true },
    { name: 'CSS3', category: 'Frontend', level: 90, order: 5, visible: true },
    { name: 'Responsive Web Design', category: 'Frontend', level: 95, order: 6, visible: true },
    // Backend
    { name: 'Node.js', category: 'Backend', level: 90, order: 7, visible: true },
    { name: 'Express.js', category: 'Backend', level: 90, order: 8, visible: true },
    { name: 'REST APIs', category: 'Backend', level: 95, order: 9, visible: true },
    { name: 'Sequelize ORM', category: 'Backend', level: 85, order: 10, visible: true },
    { name: 'JWT', category: 'Backend', level: 90, order: 11, visible: true },
    // Databases
    { name: 'MySQL', category: 'Database', level: 85, order: 12, visible: true },
    { name: 'MongoDB', category: 'Database', level: 85, order: 13, visible: true },
    // Languages
    { name: 'JavaScript', category: 'Tools', level: 95, order: 14, visible: true },
    { name: 'TypeScript', category: 'Tools', level: 85, order: 15, visible: true },
    { name: 'Dart', category: 'Tools', level: 80, order: 16, visible: true },
    // Tools
    { name: 'Git & GitHub', category: 'Tools', level: 90, order: 17, visible: true },
  ];

  for (const skill of skillsData) {
    await db.collection('skills').add(skill);
  }
  console.log(`Added ${skillsData.length} skills`);

  // 2. EXPERIENCE
  const experienceData = [
    {
      company: 'KnowledgeQ Interactive Consultancy Services Pvt. Ltd.',
      role: 'Junior Software Engineer',
      startDate: 'June 2025',
      endDate: 'Present',
      description: 'Develop and maintain full-stack, production-ready web and mobile applications using React, React Native, Flutter, and Node.js/Express.js REST APIs for B2B and manufacturing clients.\nBuild and integrate REST APIs and backend services, including third-party API integrations, to support real-time application data flows.\nIdentify, troubleshoot, and resolve application issues across the frontend, backend, and database layers to improve stability and reliability.',
      location: 'Madukkarai, Tamil Nadu',
      visible: true,
      order: 1
    },
    {
      company: 'KnowledgeQ Interactive Consultancy Services Pvt. Ltd.',
      role: 'Software Engineer Trainee',
      startDate: 'February 2025',
      endDate: 'May 2025',
      description: 'Built application features using DSA-driven logic, with efficient REST API integration and state management.\nAdopted Git, Agile/Scrum workflows, and clean-code standards — promoted to Junior Software Engineer within four months based on consistent performance.',
      location: 'Madukkarai, Tamil Nadu',
      visible: true,
      order: 2
    }
  ];

  for (const exp of experienceData) {
    await db.collection('experience').add(exp);
  }
  console.log(`Added ${experienceData.length} experience entries`);

  // 3. EDUCATION
  const educationData = [
    {
      institution: 'Bharathiar University, Coimbatore',
      degree: 'Bachelor of Science in Computer Science',
      field: 'Computer Science',
      startDate: 'June 2021',
      endDate: 'May 2024',
      description: 'Graduated with First Class (75%).',
      visible: true,
      order: 1
    }
  ];

  for (const edu of educationData) {
    await db.collection('education').add(edu);
  }
  console.log(`Added ${educationData.length} education entries`);

  // 4. PROJECTS
  const projectsData = [
    {
      title: 'Fintech Application',
      slug: 'fintech-application',
      category: 'Mobile App',
      description: 'B2B Payment Infrastructure across iOS and Android.',
      longDescription: 'Built core application pages and screens end to end, contributing to the full payment application experience across iOS and Android.\nIntegrated backend REST APIs to support payment workflows and real-time data handling.\nDebugged and resolved critical production issues to ensure a stable, reliable experience.\nImproved and optimized existing features, enhancing performance, usability, and overall efficiency.',
      technologies: ['React Native', 'Node.js', 'REST APIs'],
      features: ['B2B Payments', 'Cross-platform mobile', 'Real-time data handling'],
      featured: true,
      published: true,
      order: 1,
      createdAt: Date.now()
    },
    {
      title: 'Traceability Application',
      slug: 'traceability-application',
      category: 'Full Stack',
      description: 'Industrial Manufacturing Tracking System for a global Tier-1 automotive supplier.',
      longDescription: 'Worked on application flow design from the ground up, contributing to both architecture planning and implementation.\nDeveloped backend services and REST APIs to support real-time tracking of raw materials through to finished goods, with efficient database handling.\nBuilt frontend screens for the mobile application and the admin web portal, delivering consistent UX across platforms.\nImplemented barcode and QR code scanning, real-time dashboards, and compliance-ready audit records.',
      technologies: ['Flutter', 'Node.js', 'REST APIs', 'MySQL'],
      features: ['Barcode & QR Scanning', 'Real-time Dashboards', 'Admin Web Portal', 'Audit Records'],
      featured: true,
      published: true,
      order: 2,
      createdAt: Date.now()
    }
  ];

  for (const proj of projectsData) {
    await db.collection('projects').add(proj);
  }
  console.log(`Added ${projectsData.length} projects`);

  console.log("Successfully seeded resume data to Firebase!");
}

seedData().catch(console.error);
