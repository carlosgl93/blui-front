/**;
 *
 * @returns  returns a string with the url of the environment;
 *
 */

export function getEnvUrl() {
  const env = process?.env?.ENV;
  if (env === 'dev') {
    return 'http://localhost:5173';
  } else {
    return 'https://blui.cl';
  }
}
