import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import * as nodemailer from 'nodemailer';
import * as cors from 'cors';

export const sendEmail = onRequest( (request, res) => {
  cors({ origin: true });
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
  logger.info('body options:', request.body, { structuredData: true });
  

  const authToken = request.headers.authorization;
  if (!authToken) {
    res.status(401).send('Unauthorized');
    return;
  }
  
  const body  = request.body;
  const options = body.options;

  if (!body || !options) {
    logger.error('Missing email options in the request body');
    res.status(400).send('Bad Request: Missing email options');
    return;
  }

  
  const { to } = options;
  logger.info('this email is intended for:', to, { structuredData: true})

  logger.info('Sending email with options:', options, { structuredData: true });

  try {
    mailTransport.sendMail(request.body.options, (error, info) => {
      if (error) {
        logger.error('There was an error while sending the email:', error);
        res.status(500).send(`Error sending email: ${error.message}`);
      } else {
        logger.info('Email sent to:', options.to);
        res.status(200).send(`Email sent ${info.response}`);
      }
    });
  } catch (error) {
    logger.error('There was an error while sending the email:', error);
    if (error instanceof Error) {
      res.status(500).send(`Error sending email ${error.message}`);
    }
  }
});
