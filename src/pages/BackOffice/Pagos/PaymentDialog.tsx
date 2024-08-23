import { Box, Button, CircularProgress, Dialog } from '@mui/material';
import { PaymentRecord, PaymentsGridController } from './PaymentsGridController';
import Loading from '@/components/Loading';
import { Text } from '@/components/StyledComponents';
import { formatCLP } from '@/utils/formatCLP';

type PaymentDialogProps = {
  open: boolean;
  paymentDetails: PaymentRecord | null;
  onClose: (params: PaymentRecord) => void;
};

export const PaymentDialog = ({ open, paymentDetails, onClose }: PaymentDialogProps) => {
  const {
    providerBankDetails,
    providerBankDetailsIsLoading,
    markAsPaidIsLoading,
    handleMarkAsPaid,
  } = PaymentsGridController();

  return (
    <Dialog open={open} onClose={onClose}>
      {providerBankDetailsIsLoading ? (
        <Loading />
      ) : (
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
          <Text variant="h6">Detalles Bancarios</Text>
          <Text variant="body1">Banco: {providerBankDetails?.banco}</Text>
          <Text variant="body1">Titular de la Cuenta: {providerBankDetails?.titular}</Text>
          <Text variant="body1">Número de Cuenta: {providerBankDetails?.numeroCuenta}</Text>
          <Text variant="body1">RUT: {providerBankDetails?.rut}</Text>
          <Text variant="body1">Tipo de Cuenta: {providerBankDetails?.tipoCuenta}</Text>
          {/* Mostrar el monto a pagar, asumiendo que hay una prop o estado para ello */}
          <Text variant="body1">Monto a Pagar: {formatCLP(paymentDetails?.amountToPay)}</Text>

          {markAsPaidIsLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              sx={{
                mt: 4,
              }}
              onClick={() => handleMarkAsPaid(paymentDetails?.appointmentId)}
              disabled={markAsPaidIsLoading}
            >
              Marcar como pagado
            </Button>
          )}
        </Box>
      )}
    </Dialog>
  );
};
