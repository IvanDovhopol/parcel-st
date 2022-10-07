// TODO: получаю данные с бэкенда и превращаю в размертку

const refs = {
  btn: document.querySelector('.js-btn'),
  list: document.querySelector('.user-list'),
};

const searchParams = new URLSearchParams({
  _limit: 5,
  // _sort: 'name',
  _page: 1,
});

const url = `https://jsonplaceholder.typicode.com/users?${searchParams}`;

refs.btn.addEventListener('click', () => {
  fetchUsers().then(renderUserlist).catch(console.error);
});

function fetchUsers() {
  return fetch(url, { Accept: 'application/json' }).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderUserlist(users) {
  const markup = users
    .map(user => {
      return `<li>
      <p><b>ID</b>: ${user.id}</p>
      <p><b>Name</b>: ${user.name}</p>
      <p><b>Email</b>: ${user.email}</p>
      <p><b>Company</b>: ${user.company.name}</p>
      <p><b>City</b>: ${user.address.city}</p>
      <p><b>Website</b>: ${user.website}</p>
  </li>`;
    })
    .join('');

  refs.list.innerHTML = markup;
  console.log(users);
}

//TODO: practice работы с бекендом? покемоны

// import pokemonCardTpl from '../templates/pokemon-card.hbs';
// console.log(pokemonCardTpl);

// fetch('https://pokeapi.co/api/v2/pokemon/1')
//   .then(response => response.json())
//   .then(console.log)
//   .catch(error => console.error(error));
