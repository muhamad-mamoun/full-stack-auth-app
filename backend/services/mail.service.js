const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_SERVICE_EMAIL,
        pass: process.env.MAIL_SERVICE_PASSWORD,
    }
});

const sendMail = async (receiver, subject, content) => {
    await transporter.sendMail({
        from: process.env.MAIL_SERVICE_EMAIL,
        to: receiver,
        subject: subject,
        html: content
    });
}

module.exports = { sendMail };