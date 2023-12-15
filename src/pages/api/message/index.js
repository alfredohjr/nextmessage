import nodemailer from 'nodemailer';
import process from 'process';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function handler(req, res) {

    if (req.method === 'POST') {
        
        const { name, email, message } = await req.body;

        const info = await transporter.sendMail({
            from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USERNAME}>`,
            to: process.env.EMAIL_USERNAME,
            subject: `Message from [${process.env.APP_NAME}]<${name} - ${email}>`,
            html: `${message}`,
          });


        return res.status(200).json({ message: `message ok` });
    } else {
        res.status(405).json({ message : "invalid"});
    }
}