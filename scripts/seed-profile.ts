import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';

const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function seedProfile() {
  console.log("Seeding profile...");
  
  const profileData = {
    name: 'Sivagokulajothi J',
    location: 'Pollachi, Tamil Nadu',
    about: 'Full Stack Developer with over 1 year of experience building and maintaining production-grade web and mobile applications end to end. Skilled in React and React Native on the frontend and Node.js / Express.js with REST APIs on the backend.',
    roles: ['Full Stack Developer', 'Node.js Developer', 'React Developer'],
    email: 'Sivagokulajothi288@gmail.com',
    githubUrl: '',
    linkedinUrl: 'https://linkedin.com/', // placeholder
    resumeUrl: '',
    createdAt: Date.now()
  };

  await db.collection('profiles').doc('main').set(profileData);
  console.log("Profile seeded successfully!");
}

seedProfile().catch(console.error);
