import api from '../api';

export const getCuentaPrestador = async (prestadorId: string) => {
  const readCuentaPrestador = await api.get('/cuentaBancaria', {
    params: { prestadorId },
  });

  if (readCuentaPrestador.data === '') return undefined;
  return readCuentaPrestador.data;
};
