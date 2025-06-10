const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const dotenv = require("dotenv").config();

const app = express();
const rotasPush = require("./routes/push.Rotas");
const rotasIOT = require("./routes/iot.Rotas");
const PORT = process.env.PORT || 3000;

// nada e agora eh publico
app.use(express.json());
app.use("/api/push", rotasPush);
app.use("/api/iot", rotasIOT);
app.get("/", (req, res) => {
  res.send("Funcionanndo");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando ${PORT}`);
});
