const { doWithRetry, tryToConnect } = require("./utils");

const mongoDefaultHost = process.env.MONGO_DEFAULT_HOSTNAME || 'mongo';
const URI = `mongodb://${mongoDefaultHost}:27017/docker-node-mongo`;


module.exports = () => {
    return doWithRetry(() => {
        return tryToConnect(URI)
    }, 3000);
};
