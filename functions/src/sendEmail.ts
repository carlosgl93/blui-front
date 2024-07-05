import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import * as nodemailer from 'nodemailer';
import { getStorage } from './index';

export const sendEmail = onRequest(
  { cors: true, region: 'southamerica-west1', memory: '128MiB', maxInstances: 1 },
  async ({ headers, body }, res) => {
    const bucket = getStorage().bucket();
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
    const authToken = headers.authorization;
    if (!authToken) {
      res.status(401).send('Unauthorized');
      return;
    }

    const { templateName, options, token } = body;

    if (!body || !options) {
      logger.error('Missing email options in the request body');
      res.status(400).send('Bad Request: Missing email options');
      return;
    }

    const { to } = options;
    const file = bucket.file(templateName);

    try {
      const [templateContent] = await file.download();
      const template = templateContent.toString();
      const populatedTemplate = template.replace(/{{TOKEN}}/g, token);
      options.html = populatedTemplate;
      mailTransport.sendMail(options, (error, info) => {
        if (error) {
          logger.error('There was an error while sending the email:', error);
          res.status(500).send(`Error sending email: ${error.message}`);
        } else {
          logger.info('Email sent to:', to);
          res.status(200).send(`Email sent ${info.response}`);
        }
      });
    } catch (error) {
      logger.error('There was an error while sending the email:', error);
      if (error instanceof Error) {
        res.status(500).send(`Error sending email ${error.message}`);
      }
    }
  },
);
