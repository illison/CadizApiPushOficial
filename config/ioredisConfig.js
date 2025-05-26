const Redis = require("ioredis");

const valkeyPassword = process.env.VALKEY_PASSWORD;
const valkeyHost = process.env.VALKEY_HOST;
const valkeyPort = process.env.VALKEY_PORT;
const valkeyUser = process.env.VALKEY_USER || "default"; //


if (!valkeyPassword || !valkeyHost || !valkeyPort) {
  console.error(
    "FATAL: Variáveis de ambiente do Valkey (PASSWORD, HOST, PORT) não estão configuradas!"
  );
  process.exit(1); // Sai da aplicação se configurações críticas estiverem faltando
}

const serviceUri = `rediss://${valkeyUser}:${valkeyPassword}@${valkeyHost}:${valkeyPort}`;


const valkey = new Redis(serviceUri, {
    tls: {}, // Para conexões SSL
    maxRetriesPerRequest: 3, // Tentar até 3 vezes se um comando falhar
    enableReadyCheck: true, // Garante que o cliente está pronto antes de enviar comandos
});

valkey.on('connect', () => console.log('Valkey: Conectando...'));
valkey.on('ready', () => console.log('Valkey: Cliente conectado e pronto para uso!'));
valkey.on('error', (err) => console.error('Valkey: Erro no cliente ->', err));
valkey.on('end', () => console.log('Valkey: Conexão encerrada.'));
valkey.on('reconnecting', () => console.log('Valkey: Reconectando...'));


async function setBackupConfig(hashKey, data) {
    if (valkey.status !== 'ready') {
        throw new Error('Cliente Redis não está pronto.');
    }
    try {
        const result = await valkey.hmset(hashKey, data);
        console.log(`Dados de configuração definidos para a chave '${hashKey}':`, result); // Deve ser 'OK'
        return result;
    } catch (error) {
        console.error(`Erro ao definir configuração de backup para '${hashKey}' no Redis:`, error);
        throw error;
    }
}


async function getBackupConfig(hashKey) {
    if (valkey.status !== 'ready') {
        throw new Error('Cliente Redis não está pronto.');
    }
    try {
        // HGETALL obtém todos os campos e valores do hash.
        const result = await valkey.hgetall(hashKey);
        if (Object.keys(result).length === 0) {
            console.log(`Nenhum dado encontrado para a chave '${hashKey}' no Redis.`);
            return null; // Ou um objeto vazio {}, dependendo da sua preferência
        }
        console.log(`Dados de configuração obtidos para a chave '${hashKey}':`, result);
        // Lembre-se que todos os valores do Redis são strings.
        // Se precisar de tipos específicos, converta-os aqui ou no chamador.
        // Ex: result.id = parseInt(result.id, 10);
        return result;
    } catch (error) {
        console.error(`Erro ao obter configuração de backup para '${hashKey}' no Redis:`, error);
        throw error;
    }
}


module.exports = {  setBackupConfig, getBackupConfig };