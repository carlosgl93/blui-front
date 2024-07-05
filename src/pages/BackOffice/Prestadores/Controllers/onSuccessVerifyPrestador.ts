import { SetterOrUpdater } from 'recoil';
import { QueryClient } from 'react-query';
import { Prestador } from '@/store/auth/prestador';
import { NotificationState } from '@/store/snackbar';
import { sendEmailApi } from '@/api';

/**;
 *
 * @param  prestador received from the mutation
 * @param  client useQueryClient instance
 * @param setNotification setter to trigger new notification
 *
 * @returns  triggers sendEmail returning status 200 | 400 | 500
 *
 */

export function onSuccessVerifyPrestador(
  prestador: Prestador,
  client: QueryClient,
  setNotification: SetterOrUpdater<NotificationState>,
) {
  client.invalidateQueries(['allPrestadores']);
  setNotification({
    open: true,
    message: 'Prestador confirmado',
    severity: 'success',
  });
  sendEmailApi.post('/', {
    options: {
      from: 'Francisco Durney <francisco.durney@blui.cl>',
      to: prestador?.email,
      subject: 'Tu perfil ha sido verificado!',
      text: `Estimado ${
        prestador?.firstname ? prestador?.firstname : prestador?.email
      } hemos verificado tu perfil.`,
      html: `<p>Estimado ${
        prestador?.firstname ? prestador?.firstname : prestador?.email
      } hemos verificado tu perfil.</p>`,
    },
  });
}
