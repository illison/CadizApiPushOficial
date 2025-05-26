const ioredis = require("../config/ioredis");
const HASH_KEY_CONFIG_BACKUP = 'config:backup:dfexml';


const gravar = async (req, res) => {
    const dataToSet = {
        id: "392",
        last_sync: "2000-09-12",
    };

    try {
        await ioredis.setBackupConfig(HASH_KEY_CONFIG_BACKUP, dataToSet);
        res.status(200).send({ message: 'Configuração de backup definida com sucesso.', data: dataToSet });
    } catch (error) {
        res.status(500).send({ error: 'Falha ao definir configuração de backup.', details: error.message });
    }
};

const buscar = async (req, res) => {
    try {
        const configData = await ioredis.getBackupConfig(HASH_KEY_CONFIG_BACKUP);
        if (configData) {
            res.status(200).send({ message: 'Configuração de backup obtida com sucesso.', data: configData });
        } else {
            res.status(404).send({ message: 'Configuração de backup não encontrada.' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Falha ao obter configuração de backup.', details: error.message });
    }
};

module.exports = {  gravar, buscar };