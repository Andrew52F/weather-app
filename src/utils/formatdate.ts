export const getTime12hrs = (date: Date | string): string => {
  const newDate = new Date(date);
  const minutes: number = newDate.getMinutes();
  const minutesString: string = minutes < 10 ? `0${minutes}` : 'minutes';
  return `${(newDate.getHours() % 12) || 12}:${minutesString} ${newDate.getHours() < 12 ? 'AM' : 'PM'}`;
};
export const getTime24hrs = (date: Date | string): string => {
  const newDate = new Date(date);
  const hours = (newDate.getHours() === 0) ? 12 : newDate.getHours();
  const hoursString = (hours.toString().length === 1) ? `0${hours}` : hours.toString();
  const minutes = newDate.getMinutes();
  const minutesString = (minutes.toString().length === 1) ? `0${minutes}` : minutes.toString();

  return (`${hoursString}:${minutesString}`);
};
export const getDayOfWeek = (dateString: string) => {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wen', 'thu', 'fri', 'sat'];

  const date = new Date(dateString);
  const dayOfWeek = date.getDay();

  return daysOfWeek[dayOfWeek];
};

export const compareDates = (dateString: string) => {
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];

  return currentDateString === dateString;
};

export const convert12hrsTo24hrs = (timeString: string) => {
  const [time, meridian] = timeString.split(' ');
  if (meridian.toLocaleLowerCase() === 'am') {
    return time;
  }
  const [hours, minutes] = time.split(':');
  const newHours = Number(hours) + 12;
  return `${newHours}:${minutes}`;
};
