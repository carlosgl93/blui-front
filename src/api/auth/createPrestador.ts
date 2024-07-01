/**;
 * Creates a prestador in firebase auth and firestore
 * @param  Params
 * @returns  Returns the same prestador
 *
 */

import { CreatePrestadorParams } from '@/hooks';
import { Prestador } from '@/types';
import { defaultAvailability } from '@/utils/constants';
import dayjs from 'dayjs';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '@/firebase/firebase';
import { query, collection, where, getDocs, doc, setDoc, writeBatch } from 'firebase/firestore';

export async function createPrestador({
  nombre,
  apellido,
  rut,
  // telefono,
  correo,
  contrasena,
  comunas,
  servicio,
}: CreatePrestadorParams) {
  // Check if a user with the given email already exists in the users collection
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

  return createUserWithEmailAndPassword(auth, correo, contrasena).then(({ user }) => {
    const newPrestador: Prestador = {
      email: correo,
      id: user.uid,
      role: 'prestador',
      firstname: nombre,
      lastname: apellido,
      rut,
      comunas: comunas,
      servicio: servicio?.serviceName,
      offersFreeMeetAndGreet: false,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      verified: false,
      settings: {
        servicios: false,
        detallesBasicos: false,
        disponibilidad: false,
        comunas: true,
        experiencia: false,
        cuentaBancaria: false,
        historialLaboral: false,
        educacionFormacion: false,
        registroSuperIntendenciaSalud: false,
        insignias: false,
        inmunizacion: false,
        idiomas: false,
        antecedentesCulturales: false,
        religion: false,
        interesesHobbies: false,
        sobreMi: false,
        misPreferencias: false,
      },
    };
    const providerRef = doc(db, 'providers', user.uid);
    return setDoc(providerRef, newPrestador).then(() => {
      const batch = writeBatch(db);
      defaultAvailability.forEach((day) => {
        const dayRef = doc(providerRef, 'availability', day.day);
        batch.set(dayRef, day);
      });

      return batch.commit().then(() => newPrestador);
    });
  });
}
