import { Suspense } from 'react';
import Meta from '@/components/Meta';
import Loading from '@/components/Loading';
import MobileResults from './MobileResults';
import { useMediaQuery } from '@mui/material';
import DesktopResults from './DesktopResults';
import { tablet } from '../../theme/breakpoints';
import { ResultadosHeader } from './ResultadosHeader';
import { useGetPrestadores } from '@/hooks/useGetPrestadores';
import { CenteredFlexBox } from '@/components/styled';
import { Text } from '@/components/StyledComponents';

function Resultados() {
  const { isLoading, hasNextPage } = useGetPrestadores();
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
      {!hasNextPage && (
        <CenteredFlexBox
          sx={{
            m: '1rem 1.4rem',
          }}
        >
          <Text>No hay más registros para mostrar para esta combinación de filtros.</Text>
        </CenteredFlexBox>
      )}
    </Suspense>
  );
}

export default Resultados;
