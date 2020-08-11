const { MAIL_SENDER, MAIL_PASS, MAIL_SERVICE, } = require('../config/config');
const Transaction = require('../models/transaction')
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: String(MAIL_SERVICE),
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
        user: String(MAIL_SENDER),
        pass: String(MAIL_PASS)
    }
});
module.exports = {
    async fetchAfterPurchase(req, res) {
        try {
            let transaction = await Transaction.findById(req.params.transactionId).populate('customer book');
            const mailOptions = {
                to: customer.email,
                from: MAIL_SENDER,
                subject: 'Order Completed',
                html: `<h2>Your order was recived.</h2>
                                    Click <a href = "${transaction.book.artCover}">here</a> to download your ebook`,
            };
            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log({ message: 'Mail not sent', reason: error.message, MAIL_SENDER })
                } else {
                    console.log('Mail sent to ' + user.email);
                }
            })
            transaction.status = "success"
        } catch (err) {

        }
    },
}
