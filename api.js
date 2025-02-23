const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const rotas = require('./routes/notificacaoRota');
const PORT = process.env.PORT || 3001;

// nada
app.use(express.json());
app.use('/api', rotas);
app.get('/', (req, res) => {
    res.send('Funcionanndo')
});

app.listen(PORT, () => {
    console.log(`Servidor rodando ${PORT}`)
});
