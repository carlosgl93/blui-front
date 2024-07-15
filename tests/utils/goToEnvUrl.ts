/**;
*
* @returns  returns a string with the url of the environment;
*
*/

export function goToEnvUrl() {
    const env = process?.env?.VITE_ENV || import.meta?.env?.VITE_ENV;
    if (env === 'dev') {
        return 'http://localhost:5173/';
    } else {
        return 'https://blui.cl/';
    }
}