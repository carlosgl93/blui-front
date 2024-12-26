import { useAuthNew } from '@/hooks';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { addSupportRequest } from '@/api/supportRequests';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';
import { useServicios } from '@/hooks/useServicios';

export const PublicarApoyoController = () => {
  const { user, setUserState } = useAuthNew();
  const { allServicios } = useServicios();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [patientName, setPatientName] = useState(user?.patientName || '');
  const [address, setAddress] = useState(user?.address || '');
  const [service, setService] = useState(user?.service || '');
  const [speciality, setSpeciality] = useState(user?.speciality || '');
  const setNotification = useSetRecoilState(notificationState);

  const {
    mutate: mutateAddSupportRequest,
    isLoading,
    isError,
  } = useMutation(addSupportRequest, {
    onSuccess: () => {
      // Handle successful submission (e.g., show a success message)
      setNotification({
        open: true,
        message: 'Publicación exitosa',
        severity: 'success',
      });
    },
    onError: (error) => {
      console.error('Error adding document: ', error);
      // Handle error (e.g., show an error message)
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      mutateAddSupportRequest({
        title,
        userId: user.id,
        description,
        patientName,
        address,
      });
    }
  };

  return {
    user,
    title,
    setTitle,
    description,
    setDescription,
    patientName,
    setPatientName,
    address,
    setAddress,
    handleSubmit,
    isLoading,
    isError,
    service,
    setService,
    speciality,
    setSpeciality,
    setUserState,
    allServicios,
  };
};
