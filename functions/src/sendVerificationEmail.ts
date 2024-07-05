import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import * as nodemailer from 'nodemailer';
import { getAuth, getStorage } from './index';

export const sendVerificationEmail = onRequest(
  // func settings
  { cors: true, region: 'southamerica-west1', memory: '128MiB', maxInstances: 1 },
  // handler
  async ({ headers, body }, res) => {
    // bucket to get the html from
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

    const { options } = body;

    if (!body || !options) {
      logger.error('Missing email options in the request body');
      res.status(400).send('Bad Request: Missing email options');
      return;
    }

    // to === user created email
    const { to } = options;
    const file = bucket.file('verify-email.html');

    try {
      const link = await getAuth().generateEmailVerificationLink(to, {
        url:
          process.env.ENV === 'dev'
            ? 'http://localhost:5173/email-verificado'
            : 'https://blui-6ec33.web.app/email-verificado',
      });
      const [templateContent] = await file.download();
      const template = templateContent.toString();
      const populatedTemplate = template.replace('{{EMAIL_VERIFICATION_LINK}}', link);
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
