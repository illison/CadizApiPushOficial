const admin = require("firebase-admin");
const serviceAccount = require("./fcmContaAtual2.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //projectId: process.env.FIREBASE_PROJECT_ID,
  });
} catch (error) {
  console.log("Firebase Admin initialization error", error.stack);
}

const messaging = admin.messaging();

module.exports = { messaging };
