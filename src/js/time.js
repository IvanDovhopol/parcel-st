import { compareAsc, format } from 'date-fns';

const targetDate = new Date(2077, 11, 25, 15, 44, 59);
console.log(targetDate);

function getWeekDay(date) {
  const dateOfWeek = format(date, 'RR dd hh:mm:ss');
  console.log(dateOfWeek);
}

getWeekDay(targetDate);
