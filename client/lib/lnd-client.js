console.log(require('dotenv').config({path: '../.env'}));
const grpc = require('grpc'),
    fs = require('fs'),
    lnrpcDescriptor = grpc.load('../rpc.proto'),
    _ = require('lodash'),
    ByteBuffer = require('bytebuffer');

const certPath = `${process.env.LNSERVICE_LND_DIR}/tls.cert`,
    cert = fs.readFileSync(certPath),
    credentials = grpc.credentials.createSsl(cert),
    lightning = new lnrpcDescriptor.lnrpc.Lightning(process.env.LNDSERVICE_ADDRESS, credentials);

function getInfo() {
    return new Promise((resolve, reject) => {
        lightning.GetInfo({}, function (err, response) {
            if (err)
                reject(err);
            else
                resolve(response);
        });
    });
}

function listPeers() {
    return new Promise((resolve, reject) => {
        lightning.ListPeers({}, function (err, response) {
            if (err)
                reject(err);
            else
                resolve(response);
        });
    });
}

function listChannels(active_only = true, inactive_only = false, public_only = false, private_only = false) {
    return new Promise((resolve, reject) => {
        lightning.ListChannels({
            active_only,
            inactive_only,
            public_only,
            private_only,
        }, function (err, response) {
            if (err)
                reject(err);
            else
                resolve(response);
        });
    });
}

function sendPayment(destPubKey, amount) {
    return new Promise((resolve, reject) => {
        if (!destPubKey)
            return reject(new Error('destPubKey must be provided.'));
        if (!amount || amount <= 0 || !_.isInteger(amount))
            return reject(new Error('amount must be a positive integer'));
        let destPubKeyBytes = ByteBuffer.fromHex(destPubKey);

        var call = lightning.sendPayment();
        call.on('data', function (payment) {
            console.log('Payment sent:');
            console.log(payment);
            call.end();
            resolve(payment);
        });
        call.on('end', function () {
            console.log('END');
        });

        call.write({
            dest: destPubKeyBytes,
            amt: amount,
        });
    });
}

module.exports = {
    getInfo,
    listPeers,
    listChannels,
    sendPayment,
};
