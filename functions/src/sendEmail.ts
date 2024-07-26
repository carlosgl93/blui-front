import { malformedPayloadValidation, unAuthorized } from './validations';
import { fetchTemplate } from './utils/prepareEmailTemplate';
import { sendEmailSettings } from './utils/sendEmailSettings';
import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { CACHE_EXPIRATION_TIME } from './config';
import * as memoryCache from 'memory-cache';
import { Handlebars } from './handlebars';

export const sendEmail = onRequest(
  { cors: true, region: 'southamerica-west1', memory: '128MiB', maxInstances: 1 },
  async ({ headers, body }, res) => {
    // validations
    unAuthorized(headers, res);
    malformedPayloadValidation(body, res);

    // settings
    const { mailTransport } = sendEmailSettings();
    const { templateName, options } = body;

    try {
      const { to } = options;
      // checking cache for template
      let template = memoryCache.get(templateName);
      if (!template) {
        // Template not found in cache, fetch from storage
        template = await fetchTemplate(templateName);
        memoryCache.put(templateName, template, CACHE_EXPIRATION_TIME);
      }

      let templateData;
      const customerSupportPhone = process.env.CUSTOMER_SUPPORT_PHONE;
      if (!customerSupportPhone) {
        throw new Error('Missing customer support phone env variable.');
      }
      console.log('templateName', templateName);
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
        case 'new-message.html':
          const { sentBy } = body;
          templateData = {
            recipientName: body.recipientName,
            senderName: body.senderName,
            redirect: sentBy === 'user' ?  `/prestador-inbox` : '/usuario-inbox',
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
