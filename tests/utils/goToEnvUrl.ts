/**;
*
* @returns  returns a string with the url of the environment;
*
*/

export function goToEnvUrl() {
    const env = process.env.VITE_ENV;
    if (env === 'dev') {
        return 'http://localhost:5173/';
    } else if (env === 'prod') {
        return "https://blui-6ec33.web.app/";
    } else {
        return 'https://blui-6ec33.web.app/';
    }
}