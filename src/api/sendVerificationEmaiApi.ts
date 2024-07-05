import axios from 'axios';

export const sendVerificationEmailApi = axios.create({
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  baseURL:
    import.meta.env.VITE_ENV === 'production'
      ? import.meta.env.VITE_PROD_EMAIL_API_URL
      : 'http://localhost:5001/blui-6ec33/southamerica-west1/sendVerificationEmail',
});
