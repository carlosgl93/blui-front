import { IncomingHttpHeaders } from "http2";
import { Response } from 'express';
import * as logger from 'firebase-functions/logger';


/**;
 * unAuthorized - Function to check if the request is authorized
 * @param  headers
 * @param  res
 * @returns  Returns void after sending a response with status 401 if the request is not authorized
 *
 */

export function unAuthorized(headers: IncomingHttpHeaders, res: Response) {
  const authToken = headers.authorization;
  logger.info('auth token from unAuthorized helper', authToken)
  if (!authToken) {
    res.status(401).send('Unauthorized');
    return;
  }
}
