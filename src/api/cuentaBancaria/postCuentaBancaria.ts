import { CuentaBancariaInputs } from '@/pages/ConstruirPerfil/CuentaBancaria/CuentaBancaria';
import { db } from 'firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface SaveCuentaBancaria extends CuentaBancariaInputs {
  id: string;
}

export const postCuentaBancaria = async (data: SaveCuentaBancaria) => {
  const bankAccountRef = doc(db, 'bankAccounts', data.id);
  try {
    const result = await setDoc(bankAccountRef, data);
    console.log('result from posting cuenta');
    return result;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};
