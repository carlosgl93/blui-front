import { prestadorState } from '@/store/auth/prestador';
import { tarifasState } from '@/store/construirPerfil/tarifas';
import { notificationState } from '@/store/snackbar';
import { TarifaFront } from '@/types';
import { db } from 'firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const updateTarifas = async ({
  prestadorId,
  newTarifas,
  meetAndGreet,
}: {
  prestadorId: string;
  newTarifas: TarifaFront[];
  meetAndGreet: boolean;
}) => {
  const docRef = doc(db, 'providers', prestadorId);
  await updateDoc(docRef, {
    tarifas: newTarifas,
    offersFreeMeetAndGreet: meetAndGreet,
    'settings.tarifas': true,
  });
};

export const TarifaController = () => {
  const [newTarifas, setNewTarifas] = useRecoilState(tarifasState);
  const [prestador, setPrestadorState] = useRecoilState(prestadorState);
  const [offersFreeMeetAndGreet, setOffersFreeMeetAndGreet] = useState(
    prestador?.offersFreeMeetAndGreet,
  );
  const [, setNotification] = useRecoilState(notificationState);
  const navigate = useNavigate();

  const handleChangeTarifa = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tarifa: TarifaFront,
  ) => {
    const { value } = e.target;
    return setNewTarifas((prev) => {
      return prev.map((t) => {
        if (t.id === tarifa.id) {
          return {
            ...t,
            price: value,
          };
        }
        return t;
      });
    });
  };

  const handleChangeFreeMeetGreet = () => {
    // setPrestadorState((prev) => {
    //   return {
    //     ...prev,
    //     offersFreeMeetAndGreet: !prev?.offersFreeMeetAndGreet,
    //   } as Prestador;
    // });
    setOffersFreeMeetAndGreet((prev) => !prev);
  };

  const handleSaveTarifas = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('saving');
    if (!prestador) {
      return navigate('/ingresar');
    }

    const prestadorId = prestador.id;
    saveTarifas({ prestadorId, newTarifas, meetAndGreet: offersFreeMeetAndGreet ?? false });
  };

  const { mutate: saveTarifas, isLoading: isSavingTarifas } = useMutation(updateTarifas, {
    onSuccess: () => {
      console.log('saved');
      // invalidate tarifas query
      // update prestador.tarifas state
      setPrestadorState((prev) => {
        if (!prev) return null;
        return { ...prev, settings: { ...prev.settings, tarifas: true } };
      });
      setNotification({
        open: true,
        message: 'Tarifas guardadas exitosamente',
        severity: 'success',
      });
    },
    onError: (error) => {
      console.log(error);
      setNotification({
        open: true,
        message: 'Hubo un error actualizando las tarifas, intentalo nuevamente.',
        severity: 'error',
      });
    },
  });

  useEffect(() => {
    if (!prestador?.email) {
      navigate('/ingresar');
    }
  }, []);

  return {
    prestador,
    offersFreeMeetAndGreet,
    isSavingTarifas,
    handleChangeTarifa,
    handleChangeFreeMeetGreet,
    handleSaveTarifas,
  };
};
