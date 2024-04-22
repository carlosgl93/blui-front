import { IFormInput } from '@/pages/PerfilUsuario/PerfilUsuario';
import { db } from 'firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

type TUpdateUserDocument = {
  user: IFormInput;
  id: string;
};

export const updateUserDocument = async ({ user, id }: TUpdateUserDocument) => {
  const userDoc = doc(db, 'users', id);

  await updateDoc(userDoc, { ...user });
  return user;
};
