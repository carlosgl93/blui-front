import { Box } from '@mui/material';
import Meta from '@/components/Meta';
import { useRecoilValue } from 'recoil';
import { paymentSettings } from '@/config';
import { formatDate } from '@/utils/formatDate';
import { formatCLP } from '../../utils/formatCLP';
import { formatMinutes } from '@/utils/formatMinutes';
import { Text, Title } from '@/components/StyledComponents';
import { CenteredDivider } from '@/components/StyledDivider';
import { ButtonCTA } from '../UsuarioDashboard/StyledComponents';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { ScheduleController } from '@/components/Schedule/ScheduleController';
import { interactedPrestadorState } from '@/store/resultados/interactedPrestador';
import { Container } from '../PrestadorDashboard/StyledPrestadorDashboardComponents';
import { StyledAvatar } from '../PerfilPrestador/MobilePerfilPrestadorStyledComponents';

function BookingConfirmation() {
  const { schedule, handleConfirmBooking } = ScheduleController();
  const { selectedDate, selectedTime, selectedService } = schedule;
  const interactedPrestador = useRecoilValue(interactedPrestadorState);
  if (!selectedService || !selectedDate || !selectedTime || !interactedPrestador) return null;
  const { firstname, lastname, email, profileImageUrl } = interactedPrestador;
  const { name, price, duration } = selectedService;

  return (
    <>
      <Meta title="Confirmación de la reserva" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Container
          sx={{
            maxWidth: {
              xs: '90%',
              md: '600px',
            },
            padding: {
              xs: '1rem',
              md: '2rem',
            },
            my: '1rem',
          }}
        >
          <Title
            sx={{
              fontSize: '2rem',
              textAlign: 'center',
            }}
          >
            Confirmación de la reserva
          </Title>
          <FlexBox
            sx={{
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyItems: 'space-between',
            }}
          >
            <FlexBox
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <StyledAvatar
                sx={{
                  width: '90px',
                  height: '90px',
                  my: '1rem',
                }}
                alt={`Imágen de perfil de ${firstname}`}
                src={profileImageUrl}
              />
            </FlexBox>

            <CenteredDivider />

            <Box
              sx={{
                width: '100%',
                my: '1rem',
              }}
            >
              <FlexBox
                sx={{
                  px: '1rem',
                  width: '100%',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <Text>Prestador</Text>
                <Text
                  sx={{
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    textAlign: 'end',
                  }}
                >
                  {firstname ? `${firstname} ${lastname}` : email}
                </Text>
              </FlexBox>

              <FlexBox
                sx={{
                  px: '1rem',
                  width: '100%',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <Text>Servicio</Text>
                <Text
                  sx={{
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    textAlign: 'end',
                  }}
                >
                  {name}
                </Text>
              </FlexBox>
              <FlexBox
                sx={{
                  px: '1rem',
                  width: '100%',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <Text>Duración</Text>
                <Text
                  sx={{
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    textAlign: 'end',
                  }}
                >
                  {formatMinutes(duration)}
                </Text>
              </FlexBox>
              <FlexBox
                sx={{
                  px: '1rem',
                  width: '100%',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <Text>Cuando</Text>
                <Text
                  sx={{
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    textAlign: 'end',
                  }}
                >
                  {formatDate(selectedDate?.toDate()).toString()?.[0].toUpperCase() +
                    formatDate(selectedDate?.toDate()).toString()?.slice(1)}
                </Text>
              </FlexBox>
            </Box>

            <CenteredDivider />
            <FlexBox
              sx={{
                my: '1rem',
                px: '1rem',
                height: '60px',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <FlexBox
                sx={{
                  width: '100%',
                  gap: '1rem',
                  justifyContent: 'space-between',
                }}
              >
                <Text>Valor</Text>
                <Text
                  sx={{
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    textAlign: 'end',
                  }}
                >
                  {formatCLP(price)} CLP
                </Text>
              </FlexBox>
              <FlexBox
                sx={{
                  gap: '1rem',
                  justifyContent: 'space-between',
                }}
              >
                <Text>Comisión Blui: </Text>
                <Text
                  sx={{
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    textAlign: 'end',
                  }}
                >
                  {formatCLP(Math.ceil((paymentSettings.appCommission - 1) * Number(price)))} CLP
                </Text>
              </FlexBox>
            </FlexBox>

            <CenteredDivider />
            <ButtonCTA variant="contained" onClick={handleConfirmBooking}>
              Agendar
            </ButtonCTA>
          </FlexBox>
        </Container>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default BookingConfirmation;
