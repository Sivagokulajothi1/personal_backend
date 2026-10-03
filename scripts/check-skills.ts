import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';

// Load service account key
const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function checkSkills() {
  const snapshot = await db.collection('skills').get();
  console.log(`Found ${snapshot.docs.length} skills in database.`);
  snapshot.docs.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

checkSkills().catch(console.error);
