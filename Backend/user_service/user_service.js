/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const uuid = require('uuid');
const cors = require('cors');
const axios = require('axios');

const pg = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'user_service',
    password: '12345',
  },
});

const app = express();

const user_action_history_add_axios = (row, action_type) => {
  axios
    .post('http://localhost:3001/user_action_history_add', {
      user_id: row.user_id,
      action_type: action_type,
      action_date: new Date(),
    })
    .then(() => {
      return row;
    });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/users-list', (req, res) => {
  pg.select()
    .table('user_info')
    .then((rows) => res.send(rows));
});

app.post('/users-create', (req, res) => {
  pg.insert({ ...req.body, user_id: uuid.v4() })
    .into('user_info')
    .returning('*')
    .then((row) => {
      res.send(user_action_history_add_axios(row[0], 'create'));
    });
});

app.post('/users-change', (req, res) => {
  const { user_id, ...leftover } = req.body;
  pg('user_info')
    .where({ user_id: user_id })
    .update(leftover)
    .returning('*')
    .then((row) => {
      res.send(user_action_history_add_axios(row[0], 'change'));
    });
});

app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
);
