import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { protectedRoutes } from '@/routes';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/store/auth/user';
import { prestadorState } from '@/store/auth/prestador';
import { redirectToAfterLoginState } from '@/store/auth';

export function useRequireLogin() {
  const setRedirectAfterLogin = useSetRecoilState(redirectToAfterLoginState);
  const prestador = useRecoilValue(prestadorState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const location = useLocation();

  const prestadorId = !!prestador?.id?.length;
  const userId = !!user?.id?.length;

  useEffect(() => {
    // const storedPrestador = localStorage.getItem('prestador');
    // const storedUser = localStorage.getItem('user');

    // if (storedPrestador || storedUser)
    //   if (storedPrestador) {
    //     const prestadorData: Prestador = JSON.parse(storedPrestador);
    //     setNotification({
    //       message: `Bienvenido otra vez, ${prestadorData.firstname ? prestador?.firstname : prestador?.email}`,
    //       open: true,
    //       severity: 'success',
    //     });
    //     setPrestador(prestadorData);
    //     redirectAfterLogin ? navigate(redirectAfterLogin) : navigate('/prestador-dashboard');
    //   }

    // if (storedUser) {
    //   const userData: User = JSON.parse(storedUser);
    //   setNotification({
    //     message: `Bienvenido otra vez, ${userData.firstname}`,
    //     open: true,
    //     severity: 'success',
    //   });
    //   setUser(userData);
    //   redirectAfterLogin ? navigate(redirectAfterLogin) : navigate('/usuario-dashboard');
    // }
    if ((!prestadorId || !userId) && location.pathname.includes('/backoffice')) {
      setRedirectAfterLogin(location.pathname);
      navigate('/backoffice/login');
    }

    if (!prestadorId && !userId && protectedRoutes?.includes(location.pathname)) {
      setRedirectAfterLogin(location.pathname);
      navigate('/ingresar');
    }
  }, [prestadorId, userId, protectedRoutes]);
}
