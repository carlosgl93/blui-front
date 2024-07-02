import axios from 'axios';
import { SetterOrUpdater } from 'recoil';
import { User } from '@/store/auth/user';
import { QueryClient } from 'react-query';
import { Prestador } from '@/store/auth/prestador';
import { NotificationState } from '@/store/snackbar';

/**;
 *
 * @param  prestador received from the mutation
 * @param  client useQueryClient instance
 * @param setNotification setter to trigger new notification
 *
 * @returns  triggers sendEmail returning status 200 | 400 | 500
 *
 */

export function onSuccessFailedVerifyPrestador(
  prestador: Prestador,
  user: User,
  client: QueryClient,
  setNotification: SetterOrUpdater<NotificationState>,
) {
  client.invalidateQueries(['allPrestadores']);
  setNotification({
    open: true,
    message: 'Prestador rechazado',
    severity: 'success',
  });
  axios.post(
    'http://localhost:5001/blui-6ec33/southamerica-west1/sendEmail',
    {
      options: {
        from: 'Francisco Durney <francisco.durney@blui.cl>',
        to: prestador?.email,
        subject: 'Tu perfil ha sido rechazado!',
        text: `Estimado ${
          prestador?.firstname ? prestador.firstname : prestador?.email
        } hemos rechazado tu perfil dado que no figuras en la base de datos de prestadores de salud de chile.`,
        html: `<p>Estimado ${
          prestador?.firstname ? prestador.firstname : prestador?.email
        } hemos rechazado tu perfil dado que no figuras en la base de datos de prestadores de salud de chile.</p>`,
      },
    },
    {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    },
  );
}
