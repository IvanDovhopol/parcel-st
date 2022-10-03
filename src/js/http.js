// TODO: получаю данные с бэкенда и превращаю в размертку

const refs = {
  btn: document.querySelector('.js-btn'),
  list: document.querySelector('.user-list'),
};

const searchParams = new URLSearchParams({
  _limit: 4,
  _sort: 'name',
});

const url = `https://jsonplaceholder.typicode.com/users?${searchParams}`;

refs.btn.addEventListener('click', () => {
  fetchUsers()
    .then(users => renderUserlist(users))
    .catch(error => console.error(error));
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
      <p><b>Name</b>: ${user.name}</p>
      <p><b>Email</b>: ${user.email}</p>
      <p><b>Company</b>: ${user.company.name}</p>
      <p><b>City</b>: ${user.address.city}</p>
      <p><b>Website</b>: ${user.website}</p>
  </li>`;
    })
    .join('');

  refs.list.innerHTML = markup;
}
