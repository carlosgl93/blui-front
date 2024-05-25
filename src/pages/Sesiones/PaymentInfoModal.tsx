import { Box, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type PaymentInfoModalProps = {
  openInfo: boolean;
  handleClose: () => void;
};

export const PaymentInfoModal = ({ openInfo, handleClose }: PaymentInfoModalProps) => {
  return (
    <Modal open={openInfo} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: 'fit-content',
          margin: 'auto',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        <IconButton onClick={handleClose} sx={{ alignSelf: 'flex-end' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" gutterBottom>
          Información importante
        </Typography>
        <Typography variant="body1" gutterBottom>
          Debes pagar antes de la sesión, sino esta <b>será automaticamente cancelada</b>.
        </Typography>
        <Typography variant="body1">
          Si por alguna razón externa a ti, la consulta llega a cancelarse o a no realizarse.{' '}
          <b>Blui ofrece un reembolso del 100% del valor de la consulta.</b>
        </Typography>
      </Box>
    </Modal>
  );
};
