import { useGetClientes, useSupportRequests } from '@/hooks';
import Loading from '@/components/Loading';
import { MobileClientes } from './MobileClientes';
import { EncuentraClientesHeader } from './Header';
import { BackButtonContainer } from '../StyledPrestadorDashboardComponents';
import BackButton from '@/components/BackButton';
import { CenteredFlexBox, FlexBox } from '@/components/styled';
import { Box } from '@mui/material';
import { Text } from '@/components/StyledComponents';

export const EncuentraClientes = () => {
  const { lastClientElementRef, hasNextPage } = useGetClientes();

  const {
    infiniteSupportRequests,
    isFetching,
    infiniteSupportRequestsIsLoading,
    totalSupportRequestsIsLoading,
  } = useSupportRequests();

  if (infiniteSupportRequestsIsLoading || isFetching || totalSupportRequestsIsLoading) <Loading />;

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
      {/* {isTablet && <MobileClientes />} */}
      <MobileClientes />
      {/* TODO: add ? <MobileClientes/> : <DesktopClientes/> */}
      {!hasNextPage && !(infiniteSupportRequests?.pages[0].supportRequests.length === 0) && (
        <CenteredFlexBox
          sx={{
            m: '1rem 1.4rem',
          }}
        >
          <Text>No hay más registros para mostrar para tus comunas y tipo de servicio.</Text>
        </CenteredFlexBox>
      )}
      <Box ref={lastClientElementRef} className="bottomSentinel" />
    </>
  );
};
