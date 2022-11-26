const nodemailer = require('nodemailer');
const path = require("path");

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls:{
      rejectUnauthorized:false
  }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Lakshay  <sangaylakshay@gmail.com>',
    to: options.email,
    subject: options.subject,
    html: `<b>Hey there! </b><br>${options.message}<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />`,
    attachments: [
      {
        filename: 'mailtrap.png',
        path: './views/assets/img/forgot-password pic.png',
        cid: 'uniq-mailtrap.png' 
      }
    ]
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

module.exports = sendEmail;
