import { Container, styled } from '@mui/material';
import { Wrapper } from './styledBackOffice';
import { Text, Title } from '@/components/StyledComponents';
import { CenteredFlexBox } from '@/components/styled';
import { useStats } from '@/hooks/useStats';
import Loading from '@/components/Loading';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export const BackOffice = () => {
  const {
    usersCount,
    usersCountLoading,
    usersCountError,
    prestadoresCount,
    prestadoresCountLoading,
    prestadoresCountError,
  } = useStats();

  return (
    <Wrapper>
      <Container maxWidth="xl">
        <CenteredFlexBox>
          {/* total users created */}
          <KPIContainer>
            <Title>Usuarios</Title>
            {usersCountLoading && <Loading />}
            {usersCountError && <ErrorOutlineOutlinedIcon />}
            {!usersCountLoading && !usersCountError && <Text>Usuarios creados: {usersCount}</Text>}
          </KPIContainer>
          {/* total prestadores created */}
          <KPIContainer>
            <Title>Prestadores</Title>
            {prestadoresCountLoading && <Loading />}
            {prestadoresCountError && <ErrorOutlineOutlinedIcon />}
            {!prestadoresCountLoading && !prestadoresCountError && (
              <Text>Prestadores creados: {prestadoresCount}</Text>
            )}
          </KPIContainer>
        </CenteredFlexBox>
        {/* usuarios y prestadores por comuna */}
        <KPIContainer>
          <Title>Usuarios y prestadores por comuna</Title>
          {/* TODO: ADD GRAPH TO DISPLAY PRESTADORES PER COMUNA */}
        </KPIContainer>
        {/* usuarios y prestadores por tipo de apoyo */}
        <KPIContainer>
          <Title>Usuarios y prestadores por tipo de apoyo</Title>
          {/* TODO: ADD GRAPH TO DISPLAY PRESTADORES PER service */}
        </KPIContainer>
      </Container>
    </Wrapper>
  );
};

const KPIContainer = styled(Container)(() => ({
  borderRadius: '5%',
  padding: '1rem',
}));
