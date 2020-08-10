const Ravepay = require('flutterwave-node');
const { PUBLIC_KEY, SECRET_KEY } = require('../config/config')
const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY);
module.exports = {
    createCustomer(req, res) {

    }
}