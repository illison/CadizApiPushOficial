const admin = require("firebase-admin");
// const serviceAccount = require("./fcmContaAtual2.json");


function getServiceAccount() {
  try {
    // Get the service account key from the environment variable
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (!serviceAccountString) {
      console.error("FIREBASE_SERVICE_ACCOUNT environment variable not found.");
      return null;
    }

    // Parse the JSON string into a JavaScript object
    const serviceAccount = JSON.parse(serviceAccountString);
    return serviceAccount;
  } catch (error) {
    console.error("Error parsing FIREBASE_SERVICE_ACCOUNT:", error);
    return null;
  }
}

const serviceAccount = getServiceAccount();

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

} catch (error) {
  console.log("Firebase Admin initialization error", error.stack);
}

const messagingx = admin.messaging()

module.exports = { messagingx };
