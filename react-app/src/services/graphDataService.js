import fetch from 'isomorphic-fetch'

export var get = (url) => {
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ posts { title } }' }),
  })
    .then(res => res.json())
    .then(res => console.log(res.data));
}

export var post = (url, data) => {
  return fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({query: "{products {id, name, shortDescription}}"}),
})
  .then(res => res.json())
}
