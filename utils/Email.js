const nodemailer = require("nodemailer")

const sendEmail = async (options) => {
    // create a transporter
    // const transporter = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //         user: process.env.EMAIL_USERNAME,
    //         pass: process.env.EMAIL_PASSWORD
    //     }
    // })
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'hassan88@ethereal.email',
            pass: 'SvN7WsYxNVUUDNwaGG'
        }
    });
    // define the email options
    const mailOptions = {
        from: 'lecongtu <lecongtu@example.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html
    }
    // active send email
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail