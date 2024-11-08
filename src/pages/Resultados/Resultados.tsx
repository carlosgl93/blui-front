import { Suspense } from 'react';
import Meta from '@/components/Meta';
import Loading from '@/components/Loading';
import MobileResults from './MobileResults';
import { useMediaQuery } from '@mui/material';
import DesktopResults from './DesktopResults';
import { tablet } from '../../theme/breakpoints';
import { ResultadosHeader } from './ResultadosHeader';
import { useGetPrestadores } from '@/hooks/useGetPrestadores';

function Resultados() {
  const { isLoading } = useGetPrestadores();
  const isTablet = useMediaQuery(tablet);

  return (
    <Suspense fallback={<Loading />}>
      <Meta title="Resultados" />

      <ResultadosHeader />

      {isLoading ? (
        <Loading />
      ) : isTablet ? (
        // <MobileResults filteredPrestadores={data} />
        <MobileResults />
      ) : (
        // <DesktopResults filteredPrestadores={data} />
        <DesktopResults />
      )}
    </Suspense>
  );
}

export default Resultados;
