import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { IncomingHttpHeaders } from 'http2';
import { Handlebars } from './handlebars';
import * as nodemailer from 'nodemailer';
import { getStorage } from './index';
import { Response } from 'express';
import * as memoryCache from 'memory-cache';

// Cache expiration time in milliseconds (adjust as needed)
const CACHE_EXPIRATION_TIME = 60 * 24000000; // 24 hours

// Function to fetch and compile email template
async function fetchAndCompileTemplate(templateName: string): Promise<string> {
  const bucket = getStorage().bucket();
  const file = bucket.file(templateName);
  const [templateContent] = await file.download();
  return templateContent.toString();
}

export const sendEmail = onRequest(
  { cors: true, region: 'southamerica-west1', memory: '128MiB', maxInstances: 1 },
  async ({ headers, body }, res) => {
    unAuthorized(headers, res);
    const { mailTransport } = sendEmailSettings();
    const { templateName, options } = body;
    malformedPayloadValidation(body, res);

    try {
      const { to } = options;
      let template = memoryCache.get(templateName);

      if (!template) {
        // Template not found in cache, fetch from storage
        template = await fetchAndCompileTemplate(templateName);
        memoryCache.put(templateName, template, CACHE_EXPIRATION_TIME);
      }

      let templateData;
      const customerSupportPhone = process.env.CUSTOMER_SUPPORT_PHONE;
      if (!customerSupportPhone) {
        throw new Error('Missing customer support phone env variable.');
      }
      switch (templateName) {
        case 'failed-verify-prestador.html':
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

/**;
 * sendEmailSettings - Function to set the email settings require to send emails
 * @returns  the firebase bucket and the mailTransport
 */

function sendEmailSettings() {
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

  return { mailTransport };
}

/**
 * Handles the case of a malformed payload by checking the presence of necessary email details.
 * Logs an error and sends a 400 Bad Request response if details are missing.
 *
 * @param body - The request body containing the email details.
 * @param body.templateName - The name of the email template to be used.
 * @param body.options - The email options, including the recipient address.
 * @param body.options.to - The recipient email address.
 * @param res - The response object to send back the HTTP response.
 */
function malformedPayloadValidation(body: MalformedBody, res: Response) {
  const { templateName, options } = body;
  if (!body || !options || !templateName || !body.options.to) {
    logger.error(
      'Missing email details, in the request body. Did you forget to include the templateName or options with details?',
    );
    res.status(400).send('Bad Request: Missing email options');
    return;
  }
}

/**;
 * unAuthorized - Function to check if the request is authorized
 * @param  headers
 * @param  res
 * @returns  Returns void after sending a response with status 401 if the request is not authorized
 *
 */

function unAuthorized(headers: IncomingHttpHeaders, res: Response) {
  const authToken = headers.authorization;
  if (!authToken) {
    res.status(401).send('Unauthorized');
    return;
  }
}

type MalformedBody = { templateName: string; options: { to: string } };