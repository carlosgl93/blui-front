/**;
 *
 * @param redirectURI uri prestored in the state
 * @returns  Returns the the same or different uri based on where the user was trying to go
 *
 */

type RedirectMap = {
  [key: string]: {
    user: string;
    provider: string;
    admin?: string;
  };
};

export function determineRedirectAfterLogin(redirectURI: string, userType: 'user' | 'provider') {
  const redirectMap: RedirectMap = {
    '/chat': {
      user: '/usuario-inbox',
      provider: '/',
    },
    '/prestador-chat': {
      provider: '/prestador-inbox',
      user: '/',
    },
    '/usuario-inbox': {
      user: '/usuario-inbox',
      provider: '/',
    },
    '/prestador-inbox': {
      provider: '/prestador-inbox',
      user: '/',
    },
    '/backoffice/login': {
      user: '/',
      provider: '/',
      admin: '/backoffice',
    },
    '/ingresar': {
      user: '/usuario-dashboard',
      provider: '/prestador-dashboard',
    },
  };

  const userTypeRedirect = redirectMap[redirectURI]?.[userType];
  return userTypeRedirect !== undefined ? userTypeRedirect : redirectURI;
}
