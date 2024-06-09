import { firebaseConfig, app } from 'firebase/firebase';
import { Admin, EditGuesser, ListGuesser, Loading, Resource, ShowGuesser } from 'react-admin';
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
  RAFirebaseOptions,
} from 'react-admin-firebase';
import { useQueryClient } from 'react-query';
import AdminLogin from '../AdminLogin';
import themes from '@/theme/themes';

const options: RAFirebaseOptions = {
  logging: true,
  app: app,
};

const dataProvider = FirebaseDataProvider(firebaseConfig, {
  lazyLoading: {
    enabled: true,
  },
});
const authProvider = FirebaseAuthProvider(firebaseConfig, options);

export const BackOffice = () => {
  const queryClient = useQueryClient();

  return (
    <Admin
      basename="/backoffice"
      queryClient={queryClient}
      loginPage={AdminLogin}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loading={Loading}
      theme={themes.light}
    >
      <Resource name="providers" list={ListGuesser} show={ShowGuesser} />
      <Resource name="appointments" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
    </Admin>
  );
};
