const mongoose = require('mongoose');

Object.assign(module.exports, {
    doWithRetry,
    tryToConnect
});

function doWithRetry(doFn, delay) {
    return new Promise((resolve, reject) => {
        doFn().then(result => {
            resolve(result);
        }).catch(() => {
            setTimeout(() => {
                utils(doFn, delay)
                    .then(result => resolve(result))
                    .catch(error => reject(error))
            }, delay);
        })
    });
}

function tryToConnect(uri) {
    const options = { useNewUrlParser: true };

    console.log(`tryToConnect => ${uri}`);
    return mongoose.createConnection(uri, options)
        .then(connection => {
            console.log('MongoDB Connected', uri);
            return connection;
        });
}
