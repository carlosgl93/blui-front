import { waitFor, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useComunas } from '@/hooks/useComunas';
import { act } from 'react-dom/test-utils';

test('useComunas hook', async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>{children}</BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );

  const { result } = renderHook(() => useComunas(), { wrapper });
  await waitFor(() => expect(result.current).toBeDefined());
  // Check initial state
  expect(result.current.comunasSearched).toBe('');
  expect(result.current.matchedComunas).toEqual([]);
  expect(result.current.selectedComunas).toEqual([]);

  // Simulate user interactions
  act(() => {
    result.current.setComunasSearched('Santiago');
  });

  expect(result.current.comunasSearched).toBe('Santiago');
});
