export const generateDateTimeForCurrentOperation = () => {
  const current = new Date();
  return convertDateObjToStr(current);
};

export const convertDateObjToStr = (current: Date) => {
  const year = current.getFullYear();
  const month = current.getMonth() + 1;
  const day = current.getDate();
  const hour = current.getHours();
  const minute = current.getMinutes();
  const second = current.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export const convertTimestampToStr = (timestamp: number) => {
  const date = new Date(timestamp);
  return convertDateObjToStr(date);
};
