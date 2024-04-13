import Meta from '@/components/Meta';
import { useNavigate, useParams } from 'react-router-dom';
import { MobileProfile } from './MobileProfile';
import { DesktopProfile } from './DesktopProfile';

import { useMediaQuery } from '@mui/material';
import { tablet } from '@/theme/breakpoints';
import Loading from '@/components/Loading';
import { Suspense, useEffect } from 'react';
import { usePrestador } from '@/hooks';

function PerfilPrestador() {
  const isTablet = useMediaQuery(tablet);
  const { id } = useParams();
  const { prestador, isLoading } = usePrestador(id ?? '');

  const navigate = useNavigate();

  useEffect(() => {
    if (!prestador && !isLoading) {
      navigate('/resultados');
      return;
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!prestador) {
    return null;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Meta title="Perfil Prestador" />
      {isTablet ? (
        <MobileProfile prestador={prestador} />
      ) : (
        <DesktopProfile prestador={prestador} />
      )}
    </Suspense>
  );
}

export default PerfilPrestador;
