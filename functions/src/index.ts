import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { setGlobalOptions } from 'firebase-functions/v2/options';
import * as nodemailer from 'nodemailer';
import * as cors from 'cors';
import Mail = require( 'nodemailer/lib/mailer' );
const corsHandler = cors({ origin: true });

setGlobalOptions({ region: 'southamerica-west1' });
// const email = defineString('EMAIL_USERNAME');
// const password = defineString('EMAIL_PASSWORD');

const email = process.env.EMAIL_USERNAME;
const password = process.env.EMAIL_PASSWORD;

export const userPaidAppointment = onRequest((request, res) => {
  const { userEmail, appointmentId } = request.body;

  logger.info('userEmail, appointmentId', userEmail, appointmentId, { structuredData: true });
  corsHandler(request, res, async () => {
    const mailTransport = nodemailer.createTransport({
      host: 'mail.smtp2go.com',
      port: 465,
      secure: true,
      auth: {
        user: email,
        pass: password,
      },
    });

    logger.info('mail transport', mailTransport, { structuredData: true });
    logger.info('Sending email to user and admins about payment done', { structuredData: true });

    const mailOptions: Mail.Options = {
      from: 'Francisco Durney <francisco.durney@blui.cl>',
      to: 'francisco.durney@blui.cl',
      subject: 'Usuario ha pagado una cita',
      text: `${userEmail} claimed to have paid for appointment ${appointmentId}.`,
    };

    try {
      await mailTransport.sendMail(mailOptions);
      logger.info('Email sent to:', mailOptions.to);
      res.status(200).send('Email sent');
    } catch (error) {
      logger.error('There was an error while sending the email:', error);
      if (error instanceof Error) {
        res.status(500).send(`Error sending email ${error.message}`);
      }
    }
  });
});
