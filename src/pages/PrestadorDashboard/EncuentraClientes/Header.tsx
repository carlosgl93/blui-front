import { Title } from '@/components/StyledComponents';
import { Box, styled } from '@mui/material';

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  marginTop: '0rem',
  marginBottom: '1rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '1rem',
  width: '100%',
}));

export const EncuentraClientesHeader = () => {
  return (
    <Wrapper>
      <Title sx={{ fontSize: '2rem' }}>Buscar clientes</Title>
    </Wrapper>
  );
};
