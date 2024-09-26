/**;
 * Creates a user in firebase auth and firestore
 * @param  user data
 * @returns  Returns the same user
 *
 */

import { auth, db } from '@/firebase';
import { User } from '@/store/auth/user';
import { Comuna } from '@/types';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { query, collection, where, getDocs, doc, setDoc } from 'firebase/firestore';

export type CreateUserParams = {
  nombre: string;
  apellido: string;
  paraQuien: ForWhom;
  nombrePaciente?: string;
  rut: string;
  comuna: Comuna;
  correo: string;
  contrasena: string;
  acceptedTerms: boolean;
};

export type ForWhom = 'paciente' | 'tercero' | '';

const defaultNewUser = { dob: '', phone: '', gender: '', address: '' };

export async function createUser({
  nombre,
  apellido,
  paraQuien,
  nombrePaciente,
  rut,
  correo,
  contrasena,
  comuna,
  acceptedTerms,
}: CreateUserParams) {
  try {
    const userQuery = query(collection(db, 'users'), where('email', '==', correo));
    const userSnapshot = await getDocs(userQuery);
    if (!userSnapshot.empty) {
      throw new Error('Este email ya tiene una cuenta.');
    }

    // Check if a user with the given email already exists in the providers collection
    const providerQuery = query(collection(db, 'providers'), where('email', '==', correo));
    const providerSnapshot = await getDocs(providerQuery);
    if (!providerSnapshot.empty) {
      throw new Error('Este email ya tiene una cuenta.');
    }

    const { user } = await createUserWithEmailAndPassword(auth, correo, contrasena);
    localStorage.setItem('token', JSON.stringify(user.refreshToken));

    const newUser: User = {
      ...defaultNewUser,
      email: correo.toLowerCase(),
      id: user.uid,
      role: 'user',
      firstname: nombre,
      lastname: apellido,
      forWhom: paraQuien !== nombre ? 'tercero' : 'paciente',
      patientName: nombrePaciente ?? '',
      rut,
      gender: '',
      comuna: comuna,
      acceptedTerms,
    };
    const userRef = doc(db, 'users', user.uid);
    return await setDoc(userRef, newUser).then(() => newUser);
  } catch (error) {
    if (error instanceof FirebaseError) {
      let message = 'Hubo un error creando tu cuenta: ';

      switch (error.code) {
        case 'auth/email-already-in-use':
          message += 'El correo electrónico ya está en uso.';
          break;
        case 'auth/invalid-email':
          message += 'El correo electrónico no es válido.';
          break;
        case 'auth/operation-not-allowed':
          message += 'La operación no está permitida.';
          break;
        case 'auth/weak-password':
          message += 'La contraseña es demasiado débil.';
          break;
        default:
          message += error.message;
      }
      return Promise.reject(new Error(message));
    }
  }
}
