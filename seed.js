// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
var db = require('./models')

var show_list = [
  {
  title:"",
  creator:"",
  image:"",
  seasons:"",
  releaseDate:"",
  },
  {
  title:
  creator:
  image:
  network:
  releaseDate:
  seasons:
  }
]

var creators_list:
  {
    name:"",

  }

db.Creator.remove({}, function(err, creators) {
  console.log('removed all authors');
  db.Creator.create(creators_list, function(err, creators){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all creators');
    console.log("created", creators.length, "creators");

    db.Show.remove({}, function(err, books){
      console.log('removed all shows');
      shows_list.forEach(function (showData) {
        var show = new db.Show({
          title: showData.title,
          image: showData.image,
          releaseDate: showData.releaseDate
        });
        db.Creator.findOne({name: showData.creator}, function(err, foundCreator) {
          console.log('found creator ' + foundCreator.name + ' for show ' + show.title);
          if (err) {
            console.log(err);
            return;
          }
          show.creator = foundCreator;
          show.save(function(err, savedShow){
            if (err) {
              return console.log(err);
            }
            console.log('saved '+ savedShow.title + ' by ' + foundCreator.name);
          });
        };
      });
    });
  });
});
// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
