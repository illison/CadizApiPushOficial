const sql = require("../models/model.BancoDados");
//const axios = require("axios");
//const qs = require("querystring");
//const admin = require("firebase-admin");
require("dotenv").config();

const meuId =
  "cTi2qykKSEer7-_1p_iRzG:APA91bFEGVFuTuK0J5xxEduR-noB_pAgloXDJ6wiIL2In-80EwVI0PMmDGLyRUN2CrlSRWQTQ7wis1rWW1flao2qfmzlA42-bvs8FQTyBjwEZksUaOEqYr9GraNf9hg9Nd9iUyhMEW9W";


//   exports.logModuloTanque = (req, res) => {
//   let query =
//     "SELECT DATE_FORMAT(sync, '%d/%m/%Y %H:%i:%S') as last_sync, device, detectado, modulo from arduino WHERE modulo <> 'prt' ORDER BY sync DESC LIMIT 12";

//   sql.query(query, (err, data) => {
//     if (err) {
//       res.status(500).json({ erro: true, mensagem: err.message });
//     } else {
//       res.status(200).json({ resultados: data });
//     }
//   });
// };


const mensagemRetorno = async (req, res) => {
  let query =
    "SELECT rede, modulo, valor, mensagem, DATE_FORMAT(last_sync, '%d/%m/%Y %H:%i:%S') as datahora FROM cadizhomed";

  sql.query(query, (err, data) => {
    if (err) {
      res.status(500).json({ erro: true, mensagem: err.message });
    } else {
      //res.status(200).send(data);
      res.status(200).json({ resultados: data });
    }
  });
};  


const gravarInteracao = async (req, res) => {
  var jsondata = req.body;
  var values = [];
  var valuesLog = [];
  var mensagem = ".";
  var enviar = false;

  for (var i = 0; i < jsondata.length; i++) {
    values.push([
      jsondata[i].rede,
      jsondata[i].modulo,
      jsondata[i].valor,
      jsondata[i].mensagem,
    ]);

    valuesLog.push(["xxx", jsondata[i].mensagem, jsondata[i].modulo]);

    if (jsondata[i].modulo == "prt") {
      mensagem = jsondata[i].mensagem;
      enviar = true;
    }
  }

  console.log(values);

  const jsonSOld = {
    registration_ids: [`${meuId}`],
    data: {
      id: "634593412479",
      message: `${mensagem}`,
      campo_extra: ".",
    },
  };

  const jsonS = {
    token: `${meuId}`,
    data: {
      body: `${mensagem}`,
      title: "Portão",
      subtitle: ".",
    },
  };

  sql.query(
    "REPLACE INTO cadizhomed (rede, modulo, valor, mensagem) VALUES ?",
    [values],
    function (err, result) {
      if (err) {
        res.status(500).send({ mensage: err.message });
      } else {
        if (enviar) {
          res.status(200).send({"mensagem":"enviada"});
        } else {
          res.send(200);
        }
      }
    }
  );

  sql.query(
    "INSERT INTO arduino (device, detectado, modulo) VALUES ?",
    [valuesLog],
    function (err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
    }
  );
};

module.exports = { gravarInteracao, mensagemRetorno };
