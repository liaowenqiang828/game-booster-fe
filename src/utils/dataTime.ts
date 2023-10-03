export const generateDateTimeForCurrentOperation = () => {
  const current = new Date();
  const year = current.getFullYear();
  const month = current.getMonth() + 1;
  const day = current.getDate();
  const hour = current.getHours();
  const minute = current.getMinutes();
  const second = current.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
