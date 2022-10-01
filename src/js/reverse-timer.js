import { Notify } from 'notiflix/build/notiflix-notify-aio';

const TIMER_DEADLINE = new Date(2022, 8, 29, 3, 59, 59);
const timerListRef = document.querySelector('.timer__items');

const TIMER = {
  intervalId: null,
  refs: {},
  notifyOptions: {
    position: 'center-center',
    backOverlay: true,
    clickToClose: true,
  },

  start(rootSelector, deadLine) {
    const delta = deadLine - Date.now();
    console.log(delta);

    if (delta <= 0) {
      Notify.failure('Time is over', this.notifyOptions);
      return;
    }
    Notify.success('Start timer', this.notifyOptions);
    this.getRefs(rootSelector);

    this.intervalId = setInterval(() => {
      const diff = deadLine - Date.now();
      console.log(diff);

      if (diff <= 1000) {
        clearInterval(this.intervalId);
        Notify.success('Stop timer', this.notifyOptions);
      }

      const data = this.convertMs(diff);
      Object.entries(data).forEach(([name, value]) => {
        this.refs[name].textContent = this.addLeadinZero(value);
      });
    }, 1000);
  },

  convertMs(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    return { days, hours, minutes, seconds };
  },

  getRefs(rootSelector) {
    [...rootSelector.children].forEach(item => {
      const { title } = item.dataset;
      this.refs[item.dataset.title] = item;
    });
  },

  addLeadinZero(value) {
    return String(value).padStart(2, '0');
  },
};

TIMER.start(timerListRef, TIMER_DEADLINE);
