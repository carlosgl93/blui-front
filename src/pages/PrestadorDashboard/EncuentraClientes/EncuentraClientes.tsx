import { useMediaQuery } from '@mui/system';
import { useGetClientes } from '@/hooks';
import Loading from '@/components/Loading';
import { tablet } from '@/theme/breakpoints';
import { MobileClientes } from './MobileClientes';
import { EncuentraClientesHeader } from './Header';

export const EncuentraClientes = () => {
  const { infiniteClientesIsLoading, isFetching, isLoadingtotalClientes } = useGetClientes();
  const isTablet = useMediaQuery(tablet);
  if (infiniteClientesIsLoading || isFetching || isLoadingtotalClientes) <Loading />;

  return (
    <>
      <EncuentraClientesHeader />
      {isTablet && <MobileClientes />}
      {/* TODO: add ? <MobileClientes/> : <DesktopClientes/> */}
    </>
  );
};
