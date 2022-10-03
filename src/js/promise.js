//TODO: Promises

// const fetchUserFromServer = username => {
//   return new Promise((resolve, reject) => {
//     console.log(`Fetching data for ${username}`);

//     setTimeout(() => {
//       if (true) {
//         resolve('success value');
//       } else {
//         reject('error');
//       }
//     }, 2000);
//   });
// };

// fetchUserFromServer('Mango')
//   .then(user => console.log(user))
//   .catch(error => console.error(error));

//TODO: Promise.all() & Promise.race()

// const makePromise = (text, delay) => {
//   return new Promise(resolve => setTimeout(() => resolve(text), delay));
// };

// const promises = [
//   (prom1 = makePromise('prom 1', 1000)),
//   (prom2 = makePromise('prom 2', 2000)),
//   (prom3 = makePromise('prom 3', 3000)),
// ];

// Promise.race(promises)
//   .then(value => console.log(value))
//   .catch(error => console.error(error));

//TODO: Promise.resolve() и Promise.reject()

// Promise.resolve('success').then(value => console.log(value));
// Promise.reject('error').catch(error => console.error(error));

// const makeGreeting = guestName => {
//   if (guestName === '' || guestName === undefined) {
//     return Promise.reject('Name must not be empty');
//   }
//   return Promise.resolve(`Wellcome ${guestName}`);
// };

// makeGreeting('Mango').then(onMakeOrderSuccess).catch(onMakeOrderError);

// function onMakeOrderSuccess(greeting) {
//   console.log(greeting);
// }

// function onMakeOrderError(error) {
//   console.error(error);
// }

//TODO: Собираю данные из бэкЕнда с помошью конструкции Promis

// const fetchPockemonById = id => {
//   return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res =>
//     res.json()
//   );
// };

// fetchPockemonById(4).then(onSuccess).catch(onError);

// function onSuccess(pokemon) {
//   console.log('pokemon => ', pokemon);
// }

// function onError(error) {
//   console.error('ошибка в блоке catch', error);
// }
