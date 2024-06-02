export const formatCLP = (value: number | string) => {
  const valueToNumber = Number(value);
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valueToNumber);
};
