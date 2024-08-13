import { useLocation } from 'react-router-dom';

export const SuccessfulPayment = () => {
  const params = useLocation();
  console.log(params);

  return <div>SuccessfulPayment</div>;
};
