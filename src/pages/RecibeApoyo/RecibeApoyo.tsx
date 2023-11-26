import { Suspense, lazy } from 'react';
import { Box, LinearProgress } from '@mui/material';
const Step1 = lazy(() => import('./Step1'));
const Step2 = lazy(() => import('./Step2'));
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/ImageContainer';
import { recibeApoyoSteps } from './recibeApoyoSteps';
import useRecibeApoyo from '@/store/recibeApoyo';
import Loading from '@/components/Loading';

function Comienzo() {
  const [{ step }] = useRecibeApoyo();

  return (
    <>
      <Meta title="Encuentra la ayuda que necesitas en Blui" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          justifyContent: 'start',
          gap: 2,
          pt: 4,
        }}
      >
        <Box>
          <Image
            src="/images/blui-new.png"
            sx={{
              width: '100%',
              maxWidth: 200,
              height: 'auto',
            }}
          />
        </Box>
        <Box
          sx={{
            width: '500px',
          }}
        >
          <LinearProgress
            variant="determinate"
            value={((step + 1) / recibeApoyoSteps.length) * 100}
          />
        </Box>
        <Suspense fallback={<Loading />}>
          {step === 0 && <Step1 />}
          {step === 1 && <Step2 />}
        </Suspense>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Comienzo;
