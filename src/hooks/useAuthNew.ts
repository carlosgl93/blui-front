import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { auth, db } from '@/firebase/firebase';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, query, where, getDocs, limit, doc, setDoc } from 'firebase/firestore';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';
import { Comuna } from '@/types';
import { Servicio } from '@/types/Servicio';
import { FirebaseError } from 'firebase/app';
import { User, userState } from '@/store/auth/user';
import { Prestador, prestadorState } from '@/store/auth/prestador';
import useEntregaApoyo from '@/store/entregaApoyo';
import useRecibeApoyo from '@/store/recibeApoyo';
import { AvailabilityData } from '@/pages/ConstruirPerfil/Disponibilidad/ListAvailableDays';
import { redirectToAfterLoginState } from '@/store/auth';
import { comunasState } from '@/store/construirPerfil/comunas';
import { editDisponibilidadState } from '@/store/construirPerfil/availability';
import { createPrestador } from '@/api/auth';

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
  nombre: string;
  apellido: string;
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
  const setEditDisponibilidad = useSetRecoilState(editDisponibilidadState);

  const isLoggedIn = user?.isLoggedIn || prestador?.isLoggedIn;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createPrestadorMutation, isLoading: createPrestadorLoading } = useMutation(
    createPrestador,
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
      onMutate() {
        setNotification({
          open: true,
          message: 'Creando tu cuenta...',
          severity: 'info',
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
        comuna: selectedComunas[0],
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

  const { mutate: adminLogin, isLoading: adminLoginLoading } = useMutation(
    async ({ correo, contrasena }: { correo: string; contrasena: string }) => {
      setNotification({
        open: true,
        message: 'Iniciando sesión...',
        severity: 'info',
      });
      return setPersistence(auth, browserSessionPersistence).then(() =>
        signInWithEmailAndPassword(auth, correo, contrasena).then(async ({ user: authUser }) => {
          const adminsColectionRef = collection(db, 'admins');
          const adminQuery = query(adminsColectionRef, limit(1), where('email', '==', correo));
          const admins = await getDocs(adminQuery);

          if (admins.docs.length > 0) {
            const user = admins.docs[0].data() as User;
            user.token = authUser.refreshToken;
            user.id = admins.docs[0].id;
            setUserState({
              ...user,
              isLoggedIn: true,
              role: 'admin',
              token: authUser.refreshToken,
            });
            queryClient.setQueryData(['user', correo], user);
            return { role: 'admin', data: user };
          } else {
            throw new Error('No se encontró ningún admin con ese correo electrónico.');
          }
        }),
      );
    },
    {
      onError(error: FirebaseError) {
        let message = 'Error: ';

        switch (error.code) {
          case 'auth/user-not-found':
            message += 'No se encontró ningún admin con ese correo electrónico.';
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
        console.log('AUTH CURRENT USER', auth.currentUser);
        setNotification({
          open: true,
          message: `Sesión iniciada exitosamente`,
          severity: 'success',
        });
        if (data?.role === 'admin') {
          setUserState({
            ...data.data,
            isLoggedIn: true,
            role: data.role,
            token: data.data.token,
          } as User);
          navigate(`/backoffice`);
        }
      },
    },
  );

  const { mutate: logout } = useMutation(() => signOut(auth), {
    onSuccess: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('prestador');

      setUserState(null);
      setPrestadorState(null);
      resetEntregaApoyoState();
      resetRecibeApoyoState();
      queryClient.resetQueries();
      navigate('/ingresar');
      setEditDisponibilidad(false);
    },
  });

  return {
    login,
    logout,
    createUser,
    adminLogin,
    createPrestador: createPrestadorMutation,
    user,
    prestador,
    isLoggedIn,
    loginLoading,
    createUserLoading,
    adminLoginLoading,
    createPrestadorLoading,
  };
};
