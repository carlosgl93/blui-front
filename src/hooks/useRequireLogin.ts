import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { protectedRoutes } from '@/routes';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { User, userState } from '@/store/auth/user';
import { Prestador, prestadorState } from '@/store/auth/prestador';
import { redirectToAfterLoginState } from '@/store/auth';
import { notificationState } from '@/store/snackbar';

export function useRequireLogin() {
  const [redirectAfterLogin, setRedirectAfterLogin] = useRecoilState(redirectToAfterLoginState);
  const setNotification = useSetRecoilState(notificationState);
  const [prestador, setPrestador] = useRecoilState(prestadorState);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const location = useLocation();

  const prestadorId = !!prestador?.id.length;
  const userId = !!user?.id.length;

  useEffect(() => {
    const storedPrestador = localStorage.getItem('prestador');
    const storedUser = localStorage.getItem('user');

    if (storedPrestador || storedUser)
      if (storedPrestador) {
        const prestadorData: Prestador = JSON.parse(storedPrestador);
        setNotification({
          message: `Bienvenido otra vez, ${prestadorData.firstname}`,
          open: true,
          severity: 'success',
        });
        setPrestador(prestadorData);
        redirectAfterLogin ? navigate(redirectAfterLogin) : navigate('/prestador-dashboard');
      }

    if (storedUser) {
      const userData: User = JSON.parse(storedUser);
      setNotification({
        message: `Bienvenido otra vez, ${userData.firstname}`,
        open: true,
        severity: 'success',
      });
      setUser(userData);
      redirectAfterLogin ? navigate(redirectAfterLogin) : navigate('/usuario-dashboard');
    }

    if (!prestadorId && !userId && protectedRoutes.includes(location.pathname)) {
      setRedirectAfterLogin(location.pathname);
      navigate('/ingresar');
    }
  }, [prestadorId, userId, protectedRoutes]);
}
