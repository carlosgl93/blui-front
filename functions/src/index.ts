import { onRequest } from "firebase-functions/v2/https";
import { region } from "firebase-functions/v1";
import * as logger from "firebase-functions/logger";
// import { mailTransport } from "./emailTransport";

export const userPaidAppointment = onRequest(async (request, res) => {
  region('southamerica-west1');
  logger.info("Sending email to user and admins about payment done", 
  { structuredData: true });

  const { userEmail, appointmentId } = request.body;

  const mailOptions = {
    from: "Francisco Durney <francisco.durney@blui.cl>",
    to: "francisco.durney@blui.cl",
    subject: "Usuario ha pagado una cita",
    text: `${userEmail} claimed to have paid for appointment ${appointmentId}.`,
  };

  try {
    // await mailTransport.sendMail(mailOptions);
    logger.info("Email sent to:", mailOptions.to);
    res.status(200).send("Email sent");
  } catch (error) {
    logger.error("There was an error while sending the email:", error);
    res.status(500).send("Error sending email");
  }
});
