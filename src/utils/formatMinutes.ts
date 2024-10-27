export const formatMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes) {
    return `${hours}h y ${remainingMinutes} minutos`;
  } else if (hours > 1) {
    return `${hours} horas`;
  } else {
    return `${hours} hora`;
  }
};
