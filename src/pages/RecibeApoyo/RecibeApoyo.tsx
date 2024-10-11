import { Suspense, lazy } from 'react';
import { Box, LinearProgress } from '@mui/material';
const Step1 = lazy(() => import('./Step1'));
const Step2 = lazy(() => import('./Step2'));
const Step3 = lazy(() => import('./Step3'));
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { recibeApoyoSteps } from './recibeApoyoSteps';
import useRecibeApoyo from '@/store/recibeApoyo';
import Loading from '@/components/Loading';
import Step4 from './Step4';

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
          pt: 0,
        }}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
            },
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
          {step === 2 && <Step3 />}
          {step === 3 && <Step4 />}
        </Suspense>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Comienzo;
