import { Box, Dialog } from '@mui/material';
import { ProviderBankDetails } from './ProviderBankDetails';
import { ButtonCTA } from '@/pages/UsuarioDashboard/StyledComponents';
import { PaymentRecord, PaymentsGridController } from './PaymentsGridController';

type PaymentDialogProps = {
  open: boolean;
  paymentDetails: PaymentRecord | null;
  onClose: (params: PaymentRecord) => void;
};

export const PaymentDialog = ({ open, paymentDetails, onClose }: PaymentDialogProps) => {
  const {
    providerBankDetails,
    markAsPaidIsLoading,
    handleMarkAsPaid,
    notifyMissingBankDetailsMutation,
  } = PaymentsGridController();

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          m: '1rem 2rem',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: 'fit-content',
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        {providerBankDetails ? (
          <>
            <ProviderBankDetails
              amountToPay={paymentDetails?.amountToPay ?? 0}
              providerBankDetails={providerBankDetails}
            />
            <ButtonCTA
              variant="contained"
              sx={{
                mt: 4,
              }}
              onClick={() => handleMarkAsPaid(paymentDetails?.appointmentId)}
              disabled={markAsPaidIsLoading}
            >
              Marcar como pagado
            </ButtonCTA>
          </>
        ) : (
          <ButtonCTA
            variant="contained"
            onClick={() =>
              notifyMissingBankDetailsMutation({
                providerEmail: paymentDetails!.provider.email!,
                providerName: paymentDetails!.provider.firstname!,
              })
            }
          >
            Notificar falta detalles bancarios
          </ButtonCTA>
        )}
      </Box>
    </Dialog>
  );
};
