const admin = require("firebase-admin");
// const serviceAccount = require("./fcmContaAtual2.json");
const { google } = require("googleapis");
const {JWT} = require('google-auth-library');
const {GoogleAuth} = require('google-auth-library');
const SCOPES = "https://www.googleapis.com/auth/firebase.messaging";

const SCOPES1 = "https://www.googleapis.com/auth/cloud-platform";



function getServiceAccount() {
  try {
    // Get the service account key from the environment variable
    const serviceAccountString = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (!serviceAccountString) {
      console.error("GOOGLE_APPLICATION_CREDENTIALS environment variable not found.");
      return null;
    }

    // Parse the JSON string into a JavaScript object
    const serviceAccount = JSON.parse(serviceAccountString);

    console.log(" -- pegando o getServiceAccount")
    return serviceAccount;
  } catch (error) {
    console.error("Error parsing GOOGLE_APPLICATION_CREDENTIALS:", error);
    return null;
  }
}



const getAccessToken = async () => {
  return new Promise(function (resolve, reject) {
      const key = getServiceAccount(); //require("../config/service-account.json"); // Path to your service account of Project B file (Can store in secret manager)

      const jwtClient = new google.auth.JWT(
          key.client_email,
          null,
          key.private_key,
          SCOPES1,
          null
      );

      console.log(" -- pegando o getAccessToken")

      jwtClient.authorize(function (err, tokens) {
          if (err) {
            console.log(" -- pegando o getAccessToken ERRO")
            console.log(err)
              reject(err);
              return;
          }
          resolve(tokens.access_token);
      });
  });
};


//const serviceAccount = getServiceAccount();

//const servico = Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString('ascii')

const GOOGLE_APPLICATION_CREDENTIALS = JSON.parse(
  Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString('utf-8')
);

try {
  admin.initializeApp({
  //     credential: admin.credential.cert({
  //       projectId: process.env.FIREBASE_PROJECT_ID, // I get no error here
  //     clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // I get no error here
  //     privateKey: process.env.FIREBASE_PRIVATE_KEY,
  //     }),
    credential: admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS),
    //credential: admin.credential.applicationDefault().getAccessToken(),
  });

} catch (error) {
  console.log("Firebase Admin initialization error", error.stack);
}

const messagingx = admin.messaging()

module.exports = { messagingx, getServiceAccount, getAccessToken };
