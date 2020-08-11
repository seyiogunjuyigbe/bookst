const { MAIL_PASS, MAIL_SENDER, baseurl } = require('../config/config')
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
        user: MAIL_SENDER,
        pass: MAIL_PASS
    }
});

function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
}

module.exports = { sendEmail };

