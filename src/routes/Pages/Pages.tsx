import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import routes from '..';
import Footer from '@/components/Footer';
import { useAuthNew, useRenderFooter, useRequireLogin } from '@/hooks';

function Pages() {
  const { prestador } = useAuthNew();

  useRequireLogin(prestador?.id);
  const renderFooter = useRenderFooter();

  return (
    <Box sx={{ height: 'fit-content', minHeight: '75vh', backgroundColor: '#f7f7f7' }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
      {renderFooter && <Footer />}
    </Box>
  );
}

export default Pages;
