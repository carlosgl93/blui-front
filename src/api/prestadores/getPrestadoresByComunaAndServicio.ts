import { selectorFamily } from 'recoil';
import api from '../api';

export const getPrestadoresByComunaAndServicio = selectorFamily({
  key: 'prestadoresByComunaAndServicio',
  get: (filters: { comuna: number | null; servicio: number | null | undefined }) => async () => {
    try {
      const response = await api.get(`/prestadores`, {
        params: {
          comuna: filters.comuna,
          servicio: filters.servicio,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
});
