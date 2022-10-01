// import { compareAsc, format } from 'date-fns';

// const targetDate = new Date(2077, 11, 25, 15, 44, 59);
// console.log(targetDate);

// function getWeekDay(date) {
//   const dateOfWeek = format(date, 'RR dd hh:mm:ss');
//   console.log(dateOfWeek);
// }

// getWeekDay(targetDate);

// // // Возможный вариант через класс =>

// const refs = {
//   startBtn: document.querySelector('button[data-start]'),
//   days: document.querySelector('span[data-days]'),
//   hours: document.querySelector('span[data-hours]'),
//   minutes: document.querySelector('span[data-minutes]'),
//   seconds: document.querySelector('span[data-seconds]'),
// };

// let chooseTime = 0;

// refs.startBtn.setAttribute('disabled', '');

// const libraryFlatpickr = flatpickr('#datetime-picker', {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//     chooseTime = selectedDates[0].getTime();
//     if (chooseTime < Date.now()) {
//       Notify.failure('Please choose a date in the future');
//       return;
//     }
//     refs.startBtn.setAttribute('disabled', '');
//     refs.startBtn.removeAttribute('disabled', '');
//   },
// });

// class Timer {
//   constructor({ onTick }) {
//     this.intervalId = null;
//     this.isActive = false;
//     this.onTick = onTick;

//     this.init();
//   }

//   init() {
//     const time = this.convertMs(0);
//     this.onTick(time);
//   }

//   start() {
//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = chooseTime - currentTime;
//       const time = this.convertMs(deltaTime);

//       if (deltaTime < 1000) {
//         clearInterval(this.intervalId);
//       }

//       this.onTick(time);
//     }, 1000);

//     if (this.isActive) {
//       return;
//     }

//     this.isActive = true;
//   }

//   convertMs(ms) {
//     // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     // Remaining days
//     const days = this.pad(Math.floor(ms / day));
//     // Remaining hours
//     const hours = this.pad(Math.floor((ms % day) / hour));
//     // Remaining minutes
//     const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
//     // Remaining seconds
//     const seconds = this.pad(
//       Math.floor((((ms % day) % hour) % minute) / second)
//     );

//     return { days, hours, minutes, seconds };
//   }

//   pad(value) {
//     return String(value).padStart(2, '0');
//   }
// }

// const timer = new Timer({
//   onTick: updateClockface,
// });

// function updateClockface({ days, hours, minutes, seconds }) {
//   refs.days.textContent = `${days}`;
//   refs.hours.textContent = `${hours}`;
//   refs.minutes.textContent = `${minutes}`;
//   refs.seconds.textContent = `${seconds}`;
// }

// refs.startBtn.addEventListener('click', timer.start.bind(timer));
