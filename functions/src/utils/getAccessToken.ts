/**;
 *
 * @param credential: Credential
 * @returns  Returns
 *
 */
import * as logger from 'firebase-functions/logger';
import { Credential } from 'firebase-admin/app';

export async function getAccessToken(credential: Credential) {
  const accessToken = await credential.getAccessToken().then((res) => res.access_token);
  logger.info('access token', JSON.stringify(accessToken));
  return accessToken;
}
