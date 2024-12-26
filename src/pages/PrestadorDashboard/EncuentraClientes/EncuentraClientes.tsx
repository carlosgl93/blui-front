import { useMediaQuery } from '@mui/system';
import { useGetClientes } from '@/hooks';
import Loading from '@/components/Loading';
import { tablet } from '@/theme/breakpoints';
import { MobileClientes } from './MobileClientes';
import { EncuentraClientesHeader } from './Header';
import { BackButtonContainer } from '../StyledPrestadorDashboardComponents';
import BackButton from '@/components/BackButton';
import { FlexBox } from '@/components/styled';
import { Box } from '@mui/material';

export const EncuentraClientes = () => {
  const { infiniteClientesIsLoading, isFetching, isLoadingtotalClientes, lastClientElementRef } =
    useGetClientes();
  const isTablet = useMediaQuery(tablet);
  if (infiniteClientesIsLoading || isFetching || isLoadingtotalClientes) <Loading />;

  return (
    <>
      <FlexBox sx={{ px: '1rem' }}>
        <BackButtonContainer
          sx={{
            pt: '1rem',
          }}
        >
          <BackButton displayText to="/prestador-dashboard" />
        </BackButtonContainer>
      </FlexBox>
      <EncuentraClientesHeader />
      {isTablet && <MobileClientes />}
      {/* TODO: add ? <MobileClientes/> : <DesktopClientes/> */}
      <Box
        ref={lastClientElementRef}
        className="bottomSentinel"
        sx={{
          border: '1px solid red',
        }}
      />
    </>
  );
};
