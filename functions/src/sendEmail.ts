import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

export const sendEmail = onRequest({ cors: true, region: 'southamerica-west1' }, (request, res) => {
  const email = process.env.EMAIL_USERNAME;
  const password = process.env.EMAIL_PASSWORD;
  const mailTransport = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: password,
    },
  });
  logger.info('Request:', request.body, { structuredData: true });

  // const authToken = request.headers.authorization;
  // TODO: UNCOMMENT THIS
  // if (!authToken) {
  //   res.status(401).send('Unauthorized');
  //   return;
  // }

  const { options } = request.body as { options: Mail.Options };

  logger.info('Sending email with options:', options, { structuredData: true });

  try {
    mailTransport.sendMail(options);
    logger.info('Email sent to:', options.to);
    res.status(200).send('Email sent');
  } catch (error) {
    logger.error('There was an error while sending the email:', error);
    if (error instanceof Error) {
      res.status(500).send(`Error sending email ${error.message}`);
    }
  }
});
