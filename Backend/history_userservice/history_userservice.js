/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const uuid = require('uuid');
const cors = require('cors');

const pg = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'user_action_history',
    password: '12345',
    // ssl: config['DB_SSL'] ? { rejectUnauthorized: false } : false,
  },
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/user_action_history_list', (req, res) => {
  pg.select()
    .table('user_action_history')
    .orderBy('action_date', 'desc')
    .then((row) => res.send(row));
});

app.post('/user_action_history_id', (req, res) => {
  pg.select()
    .table('user_action_history')
    .where({ user_id: req.body.user_id })
    .orderBy('action_date', 'desc')
    .then((row) => res.send(row));
});

app.post('/user_action_history_add', (req, res) => {
  pg.insert({ ...req.body, id: uuid.v4() })
    .into('user_action_history')
    .returning('*')
    .then((row) => res.send(row[0]));
});

app.listen(3001, () =>
  console.log(`Example app listening on port 3001!`),
);
