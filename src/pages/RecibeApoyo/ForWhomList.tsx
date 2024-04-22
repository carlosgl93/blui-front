import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useRecibeApoyo from '@/store/recibeApoyo';
import { ForWhom } from '@/hooks/useAuthNew';

type ListProps = {
  options: {
    text: string;
    value: ForWhom;
  }[];
};

const ForWhomList = ({ options }: ListProps) => {
  const [{ forWhom }, { selectForWhom }] = useRecibeApoyo();

  const handleSelectForWhom = (whom: ForWhom) => {
    selectForWhom(whom);
  };

  return (
    <>
      <List
        sx={{
          gap: 1,
        }}
      >
        {options.map((item) => {
          const alreadySelected = forWhom.includes(item.value);
          return (
            <ListItemButton
              onClick={() => handleSelectForWhom(item.value)}
              sx={{
                color: alreadySelected ? 'secondary.main' : 'primary.main',
                display: 'grid',
                gridTemplateColumns: '90% 10%',
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'primary.dark',
                borderRadius: '0.25rem',
                minWidth: '300px',
                padding: '0.5rem 1rem',
                backgroundColor: alreadySelected ? 'primary.dark' : 'white',
                ':hover': {
                  backgroundColor: alreadySelected ? 'primary.dark' : 'primary.light',
                  color: alreadySelected ? 'white' : 'primary.dark',
                },
              }}
              key={item.text}
            >
              <ListItemText primary={item.text} />
              <ListItemIcon
                sx={{
                  color: 'primary.main',
                  marginLeft: 'auto',
                }}
              >
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
};

export default ForWhomList;
