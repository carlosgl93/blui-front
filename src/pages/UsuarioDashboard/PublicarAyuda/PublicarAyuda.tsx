import { useAuthNew } from '@/hooks';

export const PublicarAyuda = () => {
  const { user } = useAuthNew();
  console.log(user);
  return <div>PublicarAyuda</div>;
};
