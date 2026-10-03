import * as admin from 'firebase-admin';
import * as path from 'path';

// 1. Initialize Firebase Admin SDK using the service account key
// Make sure you have downloaded 'serviceAccountKey.json' from Firebase Console
// (Project Settings -> Service Accounts -> Generate New Private Key)
// and placed it in the personal_backend directory.
try {
  const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (error) {
  console.error("❌ Error: Could not load serviceAccountKey.json.");
  console.error("Please download it from Firebase Console (Project Settings -> Service Accounts -> Generate New Private Key) and place it in the 'personal_backend' folder.");
  process.exit(1);
}

const setAdminClaim = async (email: string) => {
  try {
    // 2. Get the user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // 3. Set the custom claim { admin: true }
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    console.log(`✅ Success! Granted admin privileges to user: ${email} (UID: ${user.uid})`);
    console.log("You may need to log out and log back in for the changes to take effect.");
  } catch (error) {
    console.error(`❌ Error setting admin claim for ${email}:`, error);
  }
};

// 4. Run the script with the email provided via command line argument
const emailArg = process.argv[2];

if (!emailArg) {
  console.error("❌ Please provide an email address.");
  console.error("Usage: npm run set-admin <user-email>");
  process.exit(1);
}

setAdminClaim(emailArg);
