const mongoose = require('mongoose');

const mongoDefaultHost = process.env.MONGO_DEFAULT_HOSTNAME || 'mongo';

// Connect to MongoDB
function tryToConnect() {
    console.log(`tryToConnect => mongodb://${mongoDefaultHost}:27017/docker-node-mongo`);
    return mongoose
        .connect(
            `mongodb://${mongoDefaultHost}:27017/docker-node-mongo`,
            { useNewUrlParser: true }
        )
        .then(() => console.log('MongoDB Connected'));
}

function doWithRetry(doFn, delay) {
    return new Promise((resolve, reject) => {
        doFn().then(success => {
            resolve(success);
        }).catch(() => {
            setTimeout(() => {
                doWithRetry(doFn, delay)
                    .then(success => resolve(success))
                    .catch(error => reject(error))
            }, delay);
        })
    });
}

module.exports = () => {
    return doWithRetry(tryToConnect, 3000);
};
