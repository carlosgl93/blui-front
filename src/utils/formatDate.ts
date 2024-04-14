export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const now = new Date();

  const sameDay =
    now.getDate() === date.getDate() &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear();

  if (sameDay)
    return date.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const sameYesterday =
    yesterday.getDate() === date.getDate() &&
    yesterday.getMonth() === date.getMonth() &&
    yesterday.getFullYear() === date.getFullYear();

  if (sameYesterday) return 'Ayer';

  return date.toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
