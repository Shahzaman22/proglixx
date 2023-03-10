const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shahzaman.mangotech@gmail.com',
    pass: 'akhhokgyfwevqyzn',
    // user: process.env.EMAIL_USER,
    // pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(to, subject, text) {
  try {
    const mailOptions = {
      from: 'shahzaman.aftab@gmail.com',
      to,
      subject,
      text
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { sendEmail };
