const { response } = require("express");
const admin = require("../firebaseConfig");

const {JWT} = require('google-auth-library');

const firebaseEmail = process.env.FIREBASE_EMAIL;
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,"\n");
const project_id = process.env.PROJECTID;

const {GoogleAuth} = require('google-auth-library');


async function mainjwt() {
  const client = new JWT({
    email: firebaseEmail,
    key: firebasePrivateKey,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const url = `https://dns.googleapis.com/dns/v1/projects/${project_id}`;

  const res = await client.request({url});
  console.log(res.data);
}


async function mainx() {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform'
  });
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
  const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
  const res = await client.request({ url });
  console.log(res.data);
}

//const { messaging } = require("firebase-admin/app");

// const meuIDCadizTI =
// "cc0to5phS9-M_oWQ5zMJab:APA91bErL9ytMMg0ilzusXakO9Kucj6fPrcdfCu-6qwGAd3vvNLaiz-BK3YJOCB2oKI2hTjZDZdRJipf-NhbIWxHw8K0VlG7bzSsde0cm6nvzdAITlKyivQ"

async function generateAccessToken() {
  const client = new JWT(
      firebaseEmail,
      null,
      firebasePrivateKey,
      ['https://www.googleapis.com/auth/cloud-platform'],
      null
  );
  await client.authorize();
  return client.getAccessToken();
}


const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;  // Attach user information to the request
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(403).send({ message: 'Forbidden: Invalid token', error: error });
  }
};


const enviarpush = async (req, res) => {
  try {
    const { token, title, body, data } = req.body;

    if (!token) {
      return res.status(400).send({ message: "Missing device token." });
    }

    const message = {
      token: token,
      notification: {
        title: title,
        body: body,
      },
      data: data,
    };

    
      const response = await admin.messagingx.send(message); // .se .messagingx.send(message);
    //const response = await messagingx.  .messaging.send(message);
    //const response = await admin.messaging.send(message);
    // console.log("Mensagem enviada com sucesso:", response);
    
    res
      .status(200)
      .send({
        message: "Notificacao enviada com sucesso",
        messageId: response,
      });
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    res
      .status(500)
      .send({ message: "Erro ao enviar a notificacao", error: error.message });
  }
};

const testarendpoint = async(req, res) => {
  res.status(200).send("Tudo OK")
}

module.exports = { enviarpush, testarendpoint, mainjwt };
