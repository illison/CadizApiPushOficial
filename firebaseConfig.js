const admin = require("firebase-admin");
// const { google } = require("googleapis");
// const {JWT} = require('google-auth-library');
// const {GoogleAuth} = require('google-auth-library');

const GOOGLE_APPLICATION_CREDENTIALS = JSON.parse(
  Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString('utf-8')
);

try {
  admin.initializeApp({
    credential: admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS),
  });

} catch (error) {
  console.log("Firebase Admin initialization error", error.stack);
}

const messagingx = admin.messaging()

module.exports = { messagingx };
