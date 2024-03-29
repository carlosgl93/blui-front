import Meta from '@/components/Meta';
import { MobileProfile } from './MobileProfile';
import { DesktopProfile } from './DesktopProfile';

import { useMediaQuery } from '@mui/material';
import { tablet } from '@/theme/breakpoints';
import { useLocation } from 'react-router-dom';
import useConstruirPerfil from '@/store/construirPerfil';
import Loading from '@/components/Loading';

function PerfilPrestador() {
  const isTablet = useMediaQuery(tablet);
  const location = useLocation();
  const prestador = location.state.prestador;
  const [{ loading }] = useConstruirPerfil();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Meta title="Perfil Prestador" />

      {isTablet ? (
        <MobileProfile prestador={prestador} />
      ) : (
        <DesktopProfile prestador={prestador} />
      )}
    </>
  );
}

export default PerfilPrestador;
