import { Button } from '@mui/material';

type SaveButtonProps = {
  disabled?: boolean;
  style?: React.CSSProperties;
};

export const SaveButton = ({ disabled, style }: SaveButtonProps) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        marginTop: '2rem',
        ...style,
      }}
      type="submit"
      disabled={disabled}
    >
      Guardar
    </Button>
  );
};
