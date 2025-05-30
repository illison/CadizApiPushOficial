const { response } = require("express");
const admin = require("../firebaseConfig");


const testarendpoint = async (req, res) => {
  res.status(200).send({ mesagem: "Alguma Coisa" });
};

const enviarpush2 = async (req, res) => {
  const { token, title, body, data } = req.body;
  if (!token) {
    return res.status(400).send({ message: "Missing device token." });
  }

  const messageX = {
    token: token,
    notification: {
      title: title,
      body: body,
    },
    data: data,
  };

  // Send a message to the device corresponding to the provided registration token.
  admin.messagingx
    .send(messageX)
    .then((response) => {
      // Response is a message ID string.
      res.status(200).send({
        mensagem: "Notificacao enviada com sucesso",
        messageId: response,
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      res
        .status(200)
        .send({ mensagem: "Error sending message:", messageId: error });
    });
};



module.exports = { enviarpush2, testarendpoint };

// {
//   "token": "cc0to5phS9-M_oWQ5zMJab:APA91bErL9ytMMg0ilzusXakO9Kucj6fPrcdfCu-6qwGAd3vvNLaiz-BK3YJOCB2oKI2hTjZDZdRJipf-NhbIWxHw8K0VlG7bzSsde0cm6nvzdAITlKyivQ",
//   "title": "Hello from Node.js! Illison",
//   "body": "Illison Matos Node.js",
//   "data": {
//     "key1": "value1",
//     "key2": "value2"
//   }
// }
