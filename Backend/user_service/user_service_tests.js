const axios = require('axios');

axios
  .post('http://localhost:3000/users-create', {
    username: 'test',
    email: 'test',
  })
  .then((response) => {
    console.log(response.data);
  });

axios
  .post('http://localhost:3000/users-change', {
    user_id: '06880909-a136-431f-aaf3-e42ee3585396',
    username: 'epicness',
    email: 'iamnotafurry',
  })
  .then((response) => {
    console.log(response.data);
  });

axios.get('http://localhost:3000/users-list', {}).then((response) => {
  console.log(response.data);
});
