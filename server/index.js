const express = require('express');
const path = require('path');
const db = require('../database/index.js');
//const cors = require('cors');

const app = express();

const publicFolder = path.join(__dirname, '/..', 'components');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cors());

app.use(express.static(publicFolder));

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});

app.get('/api/polls/:by', (req, res) => {
  db.getPoll(req.params.by, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.get('/api/feed/:id', (req, res) => {
  db.getFeed(req.params.for, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/api/polls', (req, res) => {
  console.log(req.body);
  db.postPoll(req.body, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).end();
    }
  });
});

app.patch('/api/polls/:id/:user/:vote', (req, res) => {
  db.patchPoll(Number(req.params.id), req.params.user, Number(req.params.vote), (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(204).send(results);
    }
  });
});


app.patch('/api/comment/:id/:user', (req, res) => {
  db.commentPoll(Number(req.params.id), req.params.user, req.body.comment, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(204).send(results);
    }
  });
});

app.patch('/api/likepoll/:id/:user', (req, res) => {
  db.likePoll(Number(req.params.id), req.params.user, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(204).send(results);
    }
  });
});

app.post('/api/users', (req, res) => {
  db.postUsers(req.body, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(results);
    }
  });
});

app.get('/api/users/:id', (req, res) => {
  db.getUser(req.params.id, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(results);
    }
  });
});