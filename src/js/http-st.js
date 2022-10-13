// TODO: получаю данные с бэкенда и превращаю в размертку

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const refs = {
  btn: document.querySelector('.js-btn'),
  list: document.querySelector('.user-list'),
};

const searchParams = new URLSearchParams({
  _limit: 5,
  // _sort: 'name',
  _page: 1,
});

const options = {
  headers: {
    Accept: 'application/json',
  },
};

const url = `${BASE_URL}/users?${searchParams}`;

refs.btn.addEventListener('click', () => {
  fetchUsers().then(renderUserlist).catch(console.error);
});

const fetchUsers = async () => {
  const usersIds = [1, 2, 3, 4, 5];

  const arrOfPromises = usersIds.map(async userId => {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    return response.json();
  });

  const user = await Promise.all(arrOfPromises);
  return user;
};

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
