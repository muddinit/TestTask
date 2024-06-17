const axios = require('axios');

axios
  .get('http://localhost:3001/user_action_history_list', {})
  .then((response) => {
    console.log(response.data);
  });

axios
  .post('http://localhost:3001/user_action_history_add', {
    user_id: '06880909-a136-431f-aaf3-e42ee3585396',
    action_type: 'change',
    action_date: new Date(),
  })
  .then((response) => {
    console.log(response.data);
  });
