import { useNavigate } from 'react-router-dom';
import { ButtonCTA, DashboardTileContainer, StyledTitle, SubTitle } from '../StyledComponents';
import { Text } from '@/components/StyledComponents';
import { useAuthNew } from '@/hooks';
import { IconButton, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { FlexBox } from '@/components/styled';

export const PublicarApoyoTile = () => {
  const { user } = useAuthNew();
  const router = useNavigate();

  const handleGoToPostSupport = () => {
    router(`/post-support`);
  };

  return (
    <DashboardTileContainer>
      <StyledTitle>Publicar apoyo</StyledTitle>
      <SubTitle>Publica tu necesidad particular</SubTitle>
      <Text>Hazte visible para que los prestadores te encuentren a tí.</Text>
      <FlexBox>
        <ButtonCTA
          variant="contained"
          onClick={handleGoToPostSupport}
          disabled={!user?.profileImageUrl}
        >
          Publicar Apoyo
        </ButtonCTA>
        {!user?.profileImageUrl && (
          <Tooltip
            title="Completa tu perfil para poder publicar apoyo"
            enterTouchDelay={0}
            sx={{
              ':hover': {
                backgroundColor: 'transparent',
              },
            }}
            arrow
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -25],
                    },
                  },
                ],
              },
            }}
          >
            <IconButton>
              <HelpOutlineIcon
                sx={{
                  color: 'secondary.contrastText',
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </FlexBox>
    </DashboardTileContainer>
  );
};
