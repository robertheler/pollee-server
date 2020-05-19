const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const router = require("./router.js");
const compression = require('compression')

// Instantiate the express server
const app = express();

// create and use application/json parser
app.use(bodyParser.json());

// enable cross-origin resource sharing CORS
app.use(cors());
app.use(compression());

let setCache = function (req, res, next) {
  // you only want to cache for GET requests
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=300`)
  } else {
    // for the other requests set strict no caching parameters
    res.set('Cache-control', `no-store, no-cache, max-age=0`)
  }
  next();
}

// now call the new middleware function in your app

app.use(setCache)

// Set a constant for the port that our express server will listen on
const PORT_1 = process.env.PRODUCT_PORT || 3001;

// app.get('*.js', (req, res, next) => {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use("/api/products", router);
// Start the server on the provided port
app.listen(PORT_1, () =>
  console.log(`Listening on port: http://localhost:${PORT_1}`)
);
