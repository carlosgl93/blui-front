import { Comuna } from '@/types';
import regions from '../utils/regions.json';
import { useEffect, useMemo, useState } from 'react';
import { notificationState } from '@/store/snackbar';
import { useRecoilState } from 'recoil';
import { useAuthNew } from './useAuthNew';
import { db } from 'firebase/firebase';
import { doc, collection, updateDoc, where, query, getDocs } from 'firebase/firestore';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { comunasState } from '@/store/construirPerfil/comunas';

const updateProviderComunas = async ({
  providerId,
  comunas,
}: {
  providerId: string;
  comunas: Comuna[];
}) => {
  const providerRef = doc(db, 'providers', providerId);

  await updateDoc(providerRef, {
    comunas: comunas,
  });
};

const removePrestadorComuna = async ({
  providerId,
  comuna,
  comunas,
}: {
  providerId: string;
  comuna: Comuna;
  comunas: Comuna[];
}) => {
  const providerRef = doc(db, 'providers', providerId);

  await updateDoc(providerRef, {
    comunas: comunas.filter((c) => c.name !== comuna.name),
  });
};

const fetchProviderComunas = async (providerId: string | undefined) => {
  if (!providerId) return;
  const providerRef = collection(db, 'providers');
  const q = query(providerRef, where('id', '==', providerId));
  const querySnapshot = await getDocs(q);
  const doc = querySnapshot.docs[0];

  if (!doc.exists) {
    throw new Error('Provider does not exist');
  }

  return doc.data().comunas;
};

export const useComunas = () => {
  const [comunasSearched, setComunasSearched] = useState<string>('');
  const [matchedComunas, setMatchedComunas] = useState<Comuna[]>([]);
  // const [selectedComunas, setSelectedComunas] = useState<Comuna[]>([]);
  const [selectedComunas, setSelectedComunas] = useRecoilState(comunasState);
  const [, setNotification] = useRecoilState(notificationState);
  const { prestador } = useAuthNew();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const allComunas = useMemo(() => {
    const comunas: Comuna[] = [];

    regions.regiones.forEach((r) => {
      const newComunas = r.comunas.map((c, i) => {
        return {
          id: i,
          name: c,
          region: r.region,
          country: 'Chile',
        };
      });
      comunas.push(...newComunas);
    });

    return comunas;
  }, [regions]);

  const handleChangeSearchComuna = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setComunasSearched(e.target.value);
    const match = allComunas.filter((comuna) => {
      if (comuna.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return comuna;
      }
    });
    if (match) {
      setMatchedComunas(match);
    }
  };

  const handleSelectComuna = (comuna: Comuna) => {
    if (selectedComunas.some((comunaState) => comunaState.id === comuna.id)) {
      setNotification({
        message: 'Ya seleccionaste esta comuna',
        severity: 'warning',
        open: true,
      });

      return;
    } else {
      setSelectedComunas((prev) => [...prev, comuna]);
      setComunasSearched('');
      setMatchedComunas([]);
    }
  };

  const handleUpdatePrestadorComunas = () => {
    if (selectedComunas.length === 0) {
      setNotification({
        message: 'Debes seleccionar al menos una comuna',
        severity: 'warning',
        open: true,
      });
      return;
    }

    updateComunas({
      providerId: prestador!.id,
      comunas: selectedComunas,
    });
  };

  const { mutate: updateComunas, isLoading: updateComunasisLoading } = useMutation(
    updateProviderComunas,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('providerComunas');
        setSelectedComunas(selectedComunas);
        setNotification({
          message: 'Comunas actualizadas',
          severity: 'success',
          open: true,
        });
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const handleRemoveComuna = (comuna: Comuna) => {
    removeComuna({ providerId: prestador!.id, comuna, comunas: selectedComunas });
    setSelectedComunas((prev) => prev.filter((comunaState) => comunaState.id !== comuna.id));
  };

  const { mutate: removeComuna, isLoading: removeComunaIsLoading } = useMutation(
    removePrestadorComuna,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('providerComunas');

        setNotification({
          message: 'Comuna eliminada',
          severity: 'success',
          open: true,
        });
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const { data: prestadorComunas, isLoading: fetchPrestadorComunasIsLoading } = useQuery(
    ['providerComunas', prestador?.id],
    () => fetchProviderComunas(prestador?.id),
    {
      enabled: !!prestador?.id,
      onSuccess(data) {
        setSelectedComunas([...data]);
      },
      onError(error) {
        console.error(error);
        setNotification({
          message: 'Error al cargar comunas',
          severity: 'error',
          open: true,
        });
      },
    },
  );

  useEffect(() => {
    if (window.location.pathname === '/construir-perfil/comunas' && !prestador?.id) {
      navigate('/ingresar');
    }
  }, [prestador?.id]);

  return {
    allComunas,
    comunasSearched,
    matchedComunas,
    selectedComunas,
    updateComunasisLoading,
    removeComunaIsLoading,
    fetchPrestadorComunasIsLoading,
    prestadorComunas,
    setComunasSearched,
    setMatchedComunas,
    handleChangeSearchComuna,
    handleSelectComuna,
    handleRemoveComuna,
    handleUpdatePrestadorComunas,
  };
};
