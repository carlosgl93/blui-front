import axios from 'axios';

export const sendEmailApi = axios.create({
  method: 'post',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  data: {
    options: {
      from: 'Blui.cl <francisco.durney@blui.cl>',
    },
  },
  baseURL: import.meta.env.VITE_EMAIL_API_URL,
  // : 'http://localhost:5001/blui-6ec33/southamerica-west1/sendEmail',
});
