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

  db.Creator.findOne({name: req.body.creator})
  function(err, creator){
    newShow.creator = creator;
    newShow.save(function(err, show){
      if (err) {
        return console.log("create error: " + err);
      }
      if (creator === null) {
        console.log("New Creator");

        var newCreator = new db.Creator({
          name: req.body.creator
        });
        newCreator.save();
        newShow.creator = newCreator;
      }
      console.log("created ", show.title);
      res.json(show);
    });
  });
});

app.delete('/api/shows/:id', function (req, res) {
  console.log('shows delete', req.params);
  var showId = req.params.id;
  db.Show.findOneandRemove({_id: showId },
  function (err, deletedShow) {,
    res.json(deletedShow);
  });
});

app.post('/api/shows/:show_id/characters',
  function (req, res) {
    var showId = req.params.show_id;
    db.Show.findById(showId)
      .populate('creator')
      .exec(function(err, foundShow) {
        console.log(foundShow);
        if (err) {
          res.status(500).json({error: err.message});
        } else if (foundShow === null) {
          res.status(404).json({error: "No Show found by this ID"});
        } else {
          foundShow.characters.push(req.body);
          foundShow.save();
          res.status(201).json(foundShow);
        }
      }
    );
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
