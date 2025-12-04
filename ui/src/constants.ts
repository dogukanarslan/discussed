export const formatTime = (date: string) => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();

  return `${hours}:${minutes}`;
};
