const { MAIL_SENDER, MAIL_PASS, MAIL_SERVICE, } = require('../config/config');
const Transaction = require('../models/transaction')
const nodemailer = require('nodemailer');
const { SECRET_KEY } = require('../config/config')
const axios = require('axios').default
axios.defaults.headers.common['Authorization'] = `Bearer ${SECRET_KEY}`;
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
            // verify transaction
            let response = await axios.get(`https://api.flutterwave.com/v3/transactions/${req.query.transaction_id}/verify`);

            let data = response.data.data;
            transaction.reference = data.txt_ref;
            if (data.status !== "successful") {
                transaction.status = "failed";
                await transaction.save()
                return res.render("error", { message: "Transaction failed" });
            } else if ((data.status === "successful") && (data.amount < transaction.book.price)) {
                transaction.status = "conflict"
                // initiate refund;
                await transaction.save()
                return res.render("error", { message: "Transaction error, you paid lesser than the book price" });
            }
            else if ((data.status === "successful") && (data.currency !== "NGN")) {
                transaction.status = "conflict"
                // initiate refund;
                await transaction.save()
                return res.render("error", { message: "Transaction error, you paid in a wrong curreny" });
            }
            else {
                transaction.set({ date_paid: new Date(), status: "success" })
                await transaction.save()
                const mailOptions = {
                    to: customer.email,
                    from: MAIL_SENDER,
                    subject: 'Order Completed',
                    html: `<h2>Your order was recived.</h2>
                                    Click <a href = "${transaction.book.artCover}">here</a> to download your ebook`,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log({ message: 'Mail not sent', reason: error.message, MAIL_SENDER })
                    } else {
                        console.log('Mail sent to ' + user.email);
                    }
                })
                return res.render("success", { link: transaction.book.artCover, user: req.user, book: transaction.book, transaction })
            }

        } catch (err) {
            return res.render("error", { message: err.message })
        }
    },
    async fetchAllTransactions(req, res) {
        try {
            let transactions = await Transaction.find({}).populate('book customer').sort({ date_initiated: "asc" })
            return res.render("transactions", { transactions })
        } catch (err) {
            return res.render("error", { message: err.message })
        }

    }
}
