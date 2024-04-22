import { User, userState } from '@/store/auth/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IFormInput } from './PerfilUsuario';
import { useMutation } from 'react-query';
import { updateUserDocument } from '@/api/users/updateUserProfile';
import { notificationState } from '@/store/snackbar';

export const usePerfilUsuarioController = () => {
  const [user, setUserState] = useRecoilState(userState);
  const setNotification = useSetRecoilState(notificationState);
  const { mutate: updateUser, isLoading: updateUserLoading } = useMutation(updateUserDocument, {
    onSuccess: (data) => {
      setNotification({
        open: true,
        message: 'Perfil actualizado correctamente',
        severity: 'success',
      });
      setUserState(
        (prev) =>
          ({
            ...prev,
            ...data,
          } as User),
      );
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    },
  });

  const onSubmit = async (data: IFormInput) => {
    try {
      updateUser({ user: data, id: user?.id ?? '' });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return {
    user,
    updateUserLoading,
    onSubmit,
  };
};
