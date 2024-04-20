import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { protectedRoutes } from '@/routes';

export function useRequireLogin(providerId: string | undefined) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!providerId?.length && protectedRoutes.includes(location.pathname)) {
      navigate('/ingresar');
    }
  }, [providerId, navigate, location.pathname, protectedRoutes]);
}
