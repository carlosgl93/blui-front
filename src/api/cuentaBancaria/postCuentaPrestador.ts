import { CuentaBancariaInputs } from '@/pages/ConstruirPerfil/CuentaBancaria/CuentaBancaria';
import api from '../api';

interface SavePrestadorCuentaBancaria extends CuentaBancariaInputs {
  prestadorId: string;
}

export const postCuentaPrestador = async (data: SavePrestadorCuentaBancaria) => {
  const saveCuentaPrestador = await api.post('/cuentaBancaria', data);

  return saveCuentaPrestador.data;
};
