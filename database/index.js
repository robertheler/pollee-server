const { Pool, Client } = require("pg");

const pool = new Pool({
  //host: "ec2-3-221-234-184.compute-1.amazonaws.com",
  host: "postgres",
  database: "pollee",
  user: "postgres",
  password: "",
  port: 5432,
  prepared_statements: true,
  reconnect: true,
  prepare_threshold: 0,
  server_prepare_mode: "transaction"
});

//GET api/poll/:user
const getPoll = (by, callback) => {
  pool.query(`SELECT * FROM polls WHERE by = $1 ORDER BY created DESC`, ["" + by], (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
};

//GET api/users/:id
const getUser = (id, callback) => {
  pool.query(`SELECT * FROM users WHERE id = $1`, ["" + id], (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
};

//GET api/polls/:user
const getFeed = (id, callback) => {
   // eventualy after friends are implemented:
  // SELECT * FROM polls WHERE by IN (SELECT firends from users where id = ${id})
  pool.query(`SELECT * FROM polls ORDER BY created DESC`, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
};

//arrays should look like this "{This is answer number 1, This is answer number 2}"
//POST api/polls
const postPoll = (poll, callback) => {
  query = `INSERT INTO
            polls(by, question, answers, results, voters)
          VALUES($1, $2, $3, $4, $5)`;

  values = [poll.by, poll.question, poll.answers, "{0,0,0,0}", `{${poll.by}}`];

  pool
    .query(query, values)
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

//api/polls/:id/:user/:vote
const patchPoll = (id, user, vote, callback) => {
  pool.query(`UPDATE polls SET results[$1] = results[$1] + 1, voters = array_cat(voters, $3), votes = votes + 1 WHERE id = $2`,[vote, id, `{${user}}`])
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

//api/comment/:id/:user/]
const commentPoll = (id, user, comment, callback) => {
  pool.query(`UPDATE polls SET comments = array_cat($1, comments), commenters = array_cat($2, commenters) WHERE id = $3`,[`{${comment}}`,`{${user}}`, id])
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

//api/polls/:id/:user/:vote
const likePoll = (id, user, callback) => {
  pool.query(`UPDATE polls SET likes = likes + 1, likers = array_cat(likers, $2) WHERE id = $1`,[id, `{${user}}`])
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

//arrays should look like this "{This is answer number 1, This is answer number 2}"
//POST api/user
const postUsers = (user, callback) => {
  query = `INSERT INTO
            users(id, name, url, friends)
          VALUES($1, $2, $3, $4)`;

  values = [user.id, user.name, user.url, user.friends];

  pool
    .query(query, values)
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

module.exports.pool = pool;
module.exports.getPoll = getPoll;
module.exports.postPoll = postPoll;
module.exports.patchPoll = patchPoll;
module.exports.likePoll = likePoll;
module.exports.commentPoll = commentPoll;

module.exports.postUsers = postUsers;
module.exports.getFeed = getFeed;
module.exports.getUser = getUser;
