// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
var db = require('./models')

var show_list = [
  {
  title:"Rugrats",
  creator:"Paul Germain",
  image:"http://www.imdb.com/title/tt0101188/mediaviewer/rm135657984",
  releaseDate:"1990"
  },
  {
  title: "Hey Arnold!",
  creator: "Craig Bartlett",
  image: "http://www.imdb.com/title/tt0115200/mediaviewer/rm3011774976",
  releaseDate: "1994"
  },
  {
  title: "Doug",
  creator: "Jim Jinkins",
  image: "http://www.imdb.com/title/tt0101084/mediaviewer/rm4009661696",
  releaseDate: "1991"
  },
  {
  title: "Rocko's Modern Life",
  creator: "Joe Murray",
  image: "http://www.imdb.com/title/tt0106115/mediaviewer/rm1408996608",
  releaseDate: "1993"
  },
  {
  title: "Ren & Stimpy",
  creator: "John Kricfalusi"
  image: "https://en.wikipedia.org/wiki/The_Ren_%26_Stimpy_Show#/media/File:The_Ren_and_Stimpy_Show_Title_Card.jpg",
  releaseDate: "1991"
  },
  {
  title: "CatDog",
  creator: "Peter Hannan",
  image: "https://en.wikipedia.org/wiki/File:CatDog.jpeg",
  releaseDate: "1998"
  },
  {
  title: "The Wild Thornberrys",
  creator: "Arlene Klasky",
  image: "https://upload.wikimedia.org/wikipedia/en/e/ef/Thornberryslogo.gif",
  releaseDate: "1998"
  },
  {
  title: "SpongeBob SquarePants",
  creator: "Stephen Hillenburg",
  image: "https://upload.wikimedia.org/wikipedia/en/2/24/SpongeBob_SquarePants_logo.svg",
  releaseDate: "1999"
  },
  {
  title: "Aaahh!!! Real Monsters",
  creator: "Gabor Csupo",
  image:"https://upload.wikimedia.org/wikipedia/en/b/ba/Aaahh_Real_Monsters_Logo.svg",
  releaseDate: "1994"
  },
  {
  title: "Legends of the Hidden Temple",
  creator: "David Stanley",
  image: "https://upload.wikimedia.org/wikipedia/en/7/77/LegendsTitlecard.jpg",
  releaseDate: "1993"
  },
  {
  title: "The Angry Beavers",
  creator: "Mitch Schauer",
  image: "https://upload.wikimedia.org/wikipedia/en/7/79/The_Angry_Beavers_title_card.jpg",
  releaseDate: "1997"
  },
  {
  title: "Rocket Power",
  creator: "Arlene Klasky",
  image: "https://en.wikipedia.org/wiki/Rocket_Power#/media/File:Rocket_Power.jpg",
  release: "1999"
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
