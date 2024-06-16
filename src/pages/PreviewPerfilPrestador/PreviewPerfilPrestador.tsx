import '../PerfilPrestador/mobileProfile.css';
import Meta from '@/components/Meta';
import { PreviewMobileProfile } from './PreviewMobileProfile';
import { PreviewDesktopProfile } from './PreviewDesktopProfile';

import { useMediaQuery } from '@mui/material';
import { tablet } from '@/theme/breakpoints';
import { useAuthNew, usePrestador } from '@/hooks';
import Loading from '@/components/Loading';

function PreviewPerfilPrestador() {
  const isTablet = useMediaQuery(tablet);
  const { prestador: loggedPrestador } = useAuthNew();
  const { prestador, isLoading } = usePrestador(loggedPrestador?.id ?? '');

  return (
    <>
      <Meta title="Preview Perfil Prestador" />

      {isLoading ? (
        <Loading />
      ) : isTablet ? (
        <PreviewMobileProfile fullProvider={prestador} />
      ) : (
        <PreviewDesktopProfile />
      )}
    </>
  );
}

export default PreviewPerfilPrestador;
