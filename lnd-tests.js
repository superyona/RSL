const lndClient = require('./client/lib/lnd-client');

// lndClient.getInfo()
//     .then(info => console.log(info))
//     .catch(err => console.error(err));
//
// lndClient.listPeers()
//     .then(info => console.log(info))
//     .catch(err => console.error(err));
//
// lndClient.listChannels(new lndClient.ListChannelsRequest())
//     .then(info => console.log(info))
//     .catch(err => console.error(err));

// lndClient.sendPayment('lntb11110n1pd02tc2pp5w0md59vg6jsqm5ulavvr8wtkn232en305gc8fej7edfakjz3ucdqdqqcqzys0uevkkl7njyj9d80ccpe0ftce3hyvnnpmvj6zthx5n6tvn56xg8887e8z75wagfpj92d5rdyn89fx0q8pm985kh2eyrc2c9fp0fs48cp54gc86')
//     .then(info => console.log(info))
//     .catch(err => console.error(err));

// let invoice = new lndClient.Invoice();
// invoice.value = 1000;
// lndClient.addInvoice(invoice)
//     .then(info => console.log(info))
//     .catch(err => console.error(err));

// lndClient.listInvoices({r_hash: '73f6da1588d4a00dd39feb1833b9769aa2acce2fa23074e65ecb53db4851e61a'})
//     .then(info => console.log(info))
//     .catch(err => console.error(err));

lndClient.isInvoiceSettled({payment_request: 'lntb10u1pd022vupp54tgf2pc4rqwpkc55zeuzgckr9udgw5hjqcunsgq2nalcy5yc2y0qdqqcqzyst9c46072qle27t67vqycqm60s60udu8d5jj4mf7yvmljrandf6kp9gach7je42vu3zve4qyz9yjk7e20w3z07dq680qfyjlastxfzvspg3zj2q'})
    .then(info => console.log(info))
    .catch(err => console.error(err));