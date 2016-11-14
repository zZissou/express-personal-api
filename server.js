// require express and other modules
var express = require('express'),
  bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

 var db = require('./models');

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/shows', function (req, res) {
  db.Show.find()
  .populate('creator')
  .exec(function(err, shows) {
    if (err) { return console.log("index error:" + err); }
    res.json(shows);
  });
});

app.get('/api/shows/:id', function (req, res) {
  db.Shows.findOne({_id: req.params._id },
  function(err, data) {
    res.json(data);
  });
});

app.post('/api/shows', function (req, res) {
  var newShow = new db.Show({
    title: req.body.title,
    image: req.body.image,
    releaseDate: req.body.releaseDate,
  });

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/zZissou/express_self_api/README.md", // CHANGE ME
    baseUrl: "http://shrouded-tundra-69167.herokuapp.com", // CHANGE ME
    endpoints: [
      {
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints"
      },
      {
        method: "GET",
        path: "/api/profile",
        description:
        }]
      },
        // CHANGE ME
      {
        method: "POST",
        path: "/api/starwars",
        description: "E.g. Create a new campsite"
      } // CHANGE ME
    ]
  })
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
