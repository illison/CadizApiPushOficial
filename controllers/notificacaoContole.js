const admin = require("../firebaseConfig");

// const meuIDCadizTI =
// "cc0to5phS9-M_oWQ5zMJab:APA91bErL9ytMMg0ilzusXakO9Kucj6fPrcdfCu-6qwGAd3vvNLaiz-BK3YJOCB2oKI2hTjZDZdRJipf-NhbIWxHw8K0VlG7bzSsde0cm6nvzdAITlKyivQ"

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

    const response = await admin.messaging.send(message);
    console.log("Mensagem enviada com sucesso:", response);
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

module.exports = { enviarpush , testarendpoint };
