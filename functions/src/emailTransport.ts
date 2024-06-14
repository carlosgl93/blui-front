// import { defineString } from 'firebase-functions/params';
import * as nodemailer from 'nodemailer';

if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
  throw new Error('Environment variables EMAIL_USERNAME and EMAIL_PASSWORD must be set');
}

// const gmailEmail = defineString(process.env.EMAIL_USERNAME);
// const gmailPassword = defineString(process.env.EMAIL_PASSWORD);

export const mailTransport = nodemailer.createTransport({
    
//   auth: {
//     user: gmailEmail,
//     pass: gmailPassword,
//   },
});


