/**;
 *
 * @param providerName
 * @param providerEmail
 * @returns  void
 *
 */

import { sendEmailApi } from '../sendEmailApi';

export async function notifyMissingBankDetails({
  providerName,
  providerEmail,
}: {
  providerName: string;
  providerEmail: string;
}) {
  try {
    await sendEmailApi.post('/', {
      recipientName: providerName,
      templateName: 'bank-details-missing.html',
      options: {
        from: 'Blui.cl <francisco.durney@blui.cl>',
        to: providerEmail,
        subject: 'Agrega tus datos bancarios!',
        text: 'Agrega tus datos bancarios!',
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
