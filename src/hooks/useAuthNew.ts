import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { auth, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  writeBatch,
  doc,
  setDoc,
} from 'firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { notificationState } from '@/store/snackbar';
import { Comuna } from '@/types';
import { Servicio } from '@/types/Servicio';
import { FirebaseError } from 'firebase/app';
import { User, userState } from '@/store/auth/user';
import { Prestador, prestadorState } from '@/store/auth/prestador';
import useEntregaApoyo from '@/store/entregaApoyo';
import useRecibeApoyo from '@/store/recibeApoyo';
import { defaultTarifas } from '@/utils/constants';
import { AvailabilityData } from '@/pages/ConstruirPerfil/Disponibilidad/ListAvailableDays';
import { redirectToAfterLoginState } from '@/store/auth';
import { comunasState } from '@/store/construirPerfil/comunas';

export type ForWhom = 'paciente' | 'tercero' | '';

export type CreateUserParams = {
  nombre: string;
  apellido: string;
  paraQuien: ForWhom;
  nombrePaciente?: string;
  rut: string;
  comuna: string;
  correo: string;
  contrasena: string;
};

export type CreatePrestadorParams = {
  // nombre: string;
  // apellido: string;
  rut: string;
  // telefono: string;
  correo: string;
  contrasena: string;
  comunas: Comuna[];
  servicio: Servicio | undefined;
  // especialidad: Especialidad | undefined;
};

const defaultNewUser = { dob: '', phone: '', gender: '', address: '' };

export const useAuthNew = () => {
  const [, setNotification] = useRecoilState(notificationState);
  const [user, setUserState] = useRecoilState(userState);
  const redirectAfterLogin = useRecoilValue(redirectToAfterLoginState);
  const [prestador, setPrestadorState] = useRecoilState(prestadorState);
  const selectedComunas = useRecoilValue(comunasState);
  const [, { resetEntregaApoyoState }] = useEntregaApoyo();
  const [, { resetRecibeApoyoState }] = useRecibeApoyo();

  const isLoggedIn = user?.isLoggedIn || prestador?.isLoggedIn;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createPrestador, isLoading: createPrestadorLoading } = useMutation(
    async ({
      // nombre,
      // apellido,
      rut,
      // telefono,
      correo,
      contrasena,
      comunas,
      servicio,
    }: CreatePrestadorParams) => {
      setNotification({
        open: true,
        message: 'Creando tu cuenta...',
        severity: 'info',
      });

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
          // firstname: nombre,
          // lastname: apellido,
          rut,
          comunas: comunas,
          tarifas: defaultTarifas,
          servicio: servicio?.serviceName,
          // especialidad: especialidad?.especialidadName,
          // telefono,
          averageReviews: 0,
          totalReviews: 0,
          description: '',
          offersFreeMeetAndGreet: false,
          settings: {
            detallesBasicos: false,
            disponibilidad: false,
            comunas: true,
            tarifas: false,
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
          const defaultAvailability = [
            { isAvailable: true, day: 'Lunes', times: { startTime: '00:00', endTime: '00:00' } },
            { isAvailable: true, day: 'Martes', times: { startTime: '00:00', endTime: '00:00' } },
            {
              isAvailable: true,
              day: 'Miercoles',
              times: { startTime: '00:00', endTime: '00:00' },
            },
            { isAvailable: true, day: 'Jueves', times: { startTime: '00:00', endTime: '00:00' } },
            {
              isAvailable: true,
              day: 'Viernes',
              times: { startTime: '00:00', endTime: '00:00' },
            },
            { isAvailable: true, day: 'Sabado', times: { startTime: '00:00', endTime: '00:00' } },
            {
              isAvailable: true,
              day: 'Domingo',
              times: { startTime: '00:00', endTime: '00:00' },
            },
          ];

          const batch = writeBatch(db);

          defaultAvailability.forEach((day) => {
            const dayRef = doc(providerRef, 'availability', day.day);
            batch.set(dayRef, day);
          });

          return batch.commit().then(() => newPrestador);
        });
      });
    },
    {
      onSuccess(data) {
        setNotification({
          open: true,
          message: `Cuenta creada exitosamente`,
          severity: 'success',
        });
        setPrestadorState({ ...data, isLoggedIn: true } as Prestador);
        queryClient.setQueryData(['prestador', data.email], prestador);
        navigate('/prestador-dashboard');
      },
      onError(error: FirebaseError) {
        let message = 'Hubo un error creando el prestador: ';

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

        setNotification({
          open: true,
          message,
          severity: 'error',
        });
      },
    },
  );

  const { mutate: createUser, isLoading: createUserLoading } = useMutation(
    async ({
      nombre,
      apellido,
      paraQuien,
      nombrePaciente,
      rut,
      correo,
      contrasena,
    }: CreateUserParams) => {
      setNotification({
        open: true,
        message: 'Creando tu cuenta...',
        severity: 'info',
      });
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
      const { user } = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const newUser = {
        ...defaultNewUser,
        email: correo,
        id: user.uid,
        role: 'user',
        firstname: nombre,
        lastname: apellido,
        forWhom: paraQuien !== nombre ? 'tercero' : 'paciente',
        patientName: nombrePaciente,
        rut,
        comuna: selectedComunas,
      };
      const userRef = doc(db, 'users', user.uid);
      return await setDoc(userRef, newUser).then(() => newUser);
    },
    {
      onSuccess(data) {
        setNotification({
          open: true,
          message: `Cuenta creada exitosamente`,
          severity: 'success',
        });
        setUserState({ ...data, isLoggedIn: true } as User);
        queryClient.setQueryData(['user', data?.email], user);
        window.scrollTo(0, 0);
        redirectAfterLogin ? navigate(redirectAfterLogin) : navigate(`/usuario-dashboard`);
      },
      onError(error: FirebaseError) {
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

        setNotification({
          open: true,
          message,
          severity: 'error',
        });
      },
    },
  );

  const { mutate: login, isLoading: loginLoading } = useMutation(
    async ({ correo, contrasena }: { correo: string; contrasena: string }) => {
      setNotification({
        open: true,
        message: 'Iniciando sesión...',
        severity: 'info',
      });
      return signInWithEmailAndPassword(auth, correo, contrasena).then(async () => {
        const usersColectionRef = collection(db, 'users');
        const prestadorCollectionRef = collection(db, 'providers');
        const userQuery = query(usersColectionRef, limit(1), where('email', '==', correo));
        const prestadorQuery = query(
          prestadorCollectionRef,
          limit(1),
          where('email', '==', correo),
        );
        const users = await getDocs(userQuery);
        const prestadores = await getDocs(prestadorQuery);

        if (users.docs.length > 0) {
          const user = users.docs[0].data() as User;
          setUserState({ ...user, isLoggedIn: true });
          queryClient.setQueryData(['user', correo], user);
          return { role: 'user', data: user };
        } else if (prestadores.docs.length > 0) {
          const prestador = prestadores.docs[0].data() as Prestador;
          const availabilityCollectionRef = collection(
            db,
            'providers',
            prestador.id,
            'availability',
          );
          const availabilityData = await getDocs(availabilityCollectionRef);
          const availability = availabilityData.docs.map((doc) => doc.data()) as AvailabilityData[];
          prestador.availability = availability;
          setPrestadorState({ ...prestador, isLoggedIn: true });
          queryClient.setQueryData(['prestador', correo], prestador);
          return { role: 'prestador', data: prestador };
        }
      });
    },
    {
      onError(error: FirebaseError) {
        let message = 'Error: ';

        switch (error.code) {
          case 'auth/user-not-found':
            message += 'No se encontró ningún usuario con ese correo electrónico.';
            break;
          case 'auth/wrong-password':
            message += 'La contraseña es incorrecta.';
            break;
          case 'auth/invalid-email':
            message += 'El correo electrónico no es válido.';
            break;
          case 'auth/invalid-credential':
            message += 'Email o contraseña incorrecta.';
            break;
          default:
            message += error.message;
        }

        setNotification({
          open: true,
          message,
          severity: 'error',
        });
      },
      onSuccess(data) {
        setNotification({
          open: true,
          message: `Sesión iniciada exitosamente`,
          severity: 'success',
        });
        if (data?.role === 'user') {
          setUserState({ ...data.data, isLoggedIn: true } as User);
          console.log(redirectAfterLogin);
          redirectAfterLogin ? navigate(redirectAfterLogin) : navigate(`/usuario-dashboard`);
        } else {
          if (data?.role === 'prestador') {
            setPrestadorState({ ...data.data, isLoggedIn: true } as Prestador);
            redirectAfterLogin ? navigate(redirectAfterLogin) : navigate(`/prestador-dashboard`);
          }
        }
      },
    },
  );

  const { mutate: logout } = useMutation(() => signOut(auth), {
    onSuccess: () => {
      setUserState(null);
      setPrestadorState(null);
      resetEntregaApoyoState();
      resetRecibeApoyoState();
      queryClient.resetQueries();
      navigate('/ingresar');
    },
  });

  return {
    createUser,
    createUserLoading,
    createPrestador,
    createPrestadorLoading,
    login,
    loginLoading,
    user,
    prestador,
    logout,
    isLoggedIn,
  };
};
