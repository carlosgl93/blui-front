export const formatCLP = (value: number | string) => {
  const valueToNumber = Number(value);
  const formatedNumber = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valueToNumber);
  return formatedNumber;
};
