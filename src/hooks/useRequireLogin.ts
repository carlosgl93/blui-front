import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { protectedRoutes } from '@/routes';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@/store/auth/user';
import { prestadorState } from '@/store/auth/prestador';
import { redirectToAfterLoginState } from '@/store/auth';

export function useRequireLogin() {
  const [redirectAfterLogin, setRedirectAfterLogin] = useRecoilState(redirectToAfterLoginState);
  const prestador = useRecoilValue(prestadorState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const location = useLocation();

  const prestadorId = !!prestador?.id?.length;
  const userId = !!user?.id?.length;

  useEffect(() => {
    if ((!prestadorId || !userId) && location.pathname.includes('/backoffice')) {
      setRedirectAfterLogin(location.pathname);
      navigate('/backoffice/login');
    }

    if (!prestadorId && !userId && protectedRoutes?.includes(location.pathname)) {
      setRedirectAfterLogin(location.pathname);
      navigate('/ingresar');
    }

    if (prestadorId && !userId && location.pathname.includes('/ingresar')) {
      navigate('/prestador-dashboard');
    }

    if (userId && !prestadorId && location.pathname.includes('/ingresar')) {
      navigate('/usuario-dashboard');
    }

    if (userId && (location.pathname.includes('/chat') || redirectAfterLogin === '/chat')) {
      navigate('/usuario-inbox');
    }

    if (
      prestadorId &&
      (location.pathname.includes('/prestador-chat') || redirectAfterLogin === '/prestador-chat')
    ) {
      navigate('/prestador-inbox');
    }
  }, [prestadorId, userId, protectedRoutes]);
}
