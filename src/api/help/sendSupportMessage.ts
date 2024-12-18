/**;
 *
 * @param sendSupportMessageParams: {
 * nombre: string;
 * email: string;
 * mensaje: string;
 * }
 * @returns  void;
 *
 */

import { sendEmailApi } from '../sendEmailApi';

type TSendSupportMessage = {
  nombre: string;
  email: string;
  mensaje: string;
};

export async function sendSupportMessage({ nombre, email, mensaje }: TSendSupportMessage) {
  try {
    await sendEmailApi.post('/', {
      senderName: nombre,
      senderEmail: email,
      templateName: 'send-support-email.html',
      message: mensaje,
      options: {
        from: 'Blui.cl <francisco.durney@blui.cl>',
        to: 'cgumucio93@gmail.com',
        subject: `${nombre} necesita ayuda en Blui!`,
        text: `${nombre} necesita ayuda en Blui!`,
      },
    });
  } catch (error) {
    throw new Error('Error al enviar el mensaje de soporte');
  }
}
