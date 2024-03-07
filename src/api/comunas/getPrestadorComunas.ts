import api from '../api';

export const getPrestadorComunas = async (prestadorId: number) => {
  const response = await api.get(`prestadores/comunas/${prestadorId}`, {
    params: {
      prestadorId,
    },
  });
  return response.data;
};
