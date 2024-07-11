import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import * as nodemailer from 'nodemailer';
import { getStorage } from './index';
import { IncomingHttpHeaders } from 'http2';
import { Handlebars } from './handlebars';

export const sendEmail = onRequest(
  { cors: true, region: 'southamerica-west1', memory: '128MiB', maxInstances: 1 },
  async ({ headers, body }, res) => {
    unAuthorized(headers, res);
    const { bucket, mailTransport } = sendEmailSettings();
    const { templateName, options } = body;
    malformedPayload(body, res);

    try {
      const { to } = options;
      const file = bucket.file(templateName);
      const [templateContent] = await file.download();
      let template = templateContent.toString();
      let templateData: any;
      switch (templateName) {
        case 'failed-verify-prestador.html':
          const customerSupportPhone = process.env.CUSTOMER_SUPPORT_PHONE;
          if (!customerSupportPhone)
            throw new Error('Missing customer support phone env variable.');
          templateData = {
            firstname: body.firstname,
            customerSupportPhone: customerSupportPhone,
          };
          break;
        case 'verify-prestador.html':
          templateData = {
            firstname: body.firstname,
            redirect: `construir-perfil/servicios`,
          };
          break;
        case 'create-prestador.html':
          templateData = {
            firstname: body.firstname,
            redirect: `construir-perfil/servicios`,
          };
          break;
        default:
          // Handle default case or throw an error if templateName is unexpected
          throw new Error(`Unsupported template name: ${templateName}`);
      }

      // Compile the template with Handlebars
      const compiledTemplate = Handlebars.compile(template);
      const populatedTemplate = compiledTemplate(templateData);

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

function sendEmailSettings() {
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

  return { bucket, mailTransport };
}

function malformedPayload(body: { templateName: string; options: { to: string } }, res: any) {
  const { templateName, options } = body;
  if (!body || !options || !templateName || !body.options.to) {
    logger.error(
      'Missing email details, in the request body. Did you forget to include the templateName or options with details?',
    );
    res.status(400).send('Bad Request: Missing email options');
    return;
  }
}

function unAuthorized(headers: IncomingHttpHeaders, res: any) {
  const authToken = headers.authorization;
  if (!authToken) {
    res.status(401).send('Unauthorized');
    return;
  }
}
