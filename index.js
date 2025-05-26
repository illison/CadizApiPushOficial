const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const dotenv = require("dotenv").config();

const app = express();
const rotas = require("./routes/notificacaoRota");
const PORT = process.env.PORT || 3000;

console.log(`Projecto ${process.env.PROJECTID}`);

const {
  setBackupConfig,
  getBackupConfig,
  disconnectRedis,
} = require("./controllers/notificacaoConfig"); // Importa do nosso módulo

// nada e agora eh publico
app.use(express.json());
app.use("/api", rotas);
app.get("/", (req, res) => {
  res.send("Funcionanndo");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando ${PORT}`);
});
