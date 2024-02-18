const nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, html)=>{

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
    });

    const mailOptions = {
    from: 'phuong.haminh20032004@gmail.com',
    to: email,
    subject: subject,
    html: html
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
        // do something useful
    }
    });

}