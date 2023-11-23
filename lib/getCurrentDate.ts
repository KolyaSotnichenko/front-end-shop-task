export const getCurrentTime = (): string => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedTime = currentDate.toLocaleTimeString(undefined, options);
  return formattedTime;
};
