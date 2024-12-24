import { useAuthNew } from '@/hooks';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { addSupportRequest } from '@/api/supportRequests';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';
import { useServicios } from '@/hooks/useServicios';

export const PublicarAyudaController = () => {
  const { user, setUserState } = useAuthNew();
  const { allServicios } = useServicios();

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
        userId: user.id,
        description,
        patientName,
        address,
      });
    }
  };

  //   TODO: store user address, service and speciality in the userState atom and fireestore too

  return {
    user,
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
