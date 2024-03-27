import nodemailer from "nodemailer";

const sendMail = (toMailId: string, html: any) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "souravbera515@gmail.com",
      pass: "wbzqdfjubjkudrwe",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Health Care Hub 👻" <souravbera515@gmail.com>', // sender address
      to: toMailId, // list of receivers
      subject: "Reset Password", // Subject line
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};

export default sendMail;
