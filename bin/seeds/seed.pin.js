require("dotenv").config();
require("./../../configs/mongo"); // fetch the db connection
// const Journey = require("./../../models/Journey");
const Pin = require("./../../models/Pin");
const User = require("./../../models/User");

const pins = [
    {
      title: "Eiffel Tower",
      lat: 2.3131166788984387,
      long: 48.854772508530175,
      description : "Wow... That's big...",
      url: "./toutou.png",
      genre: "image",
    },
    {
        title: "Bertillon",
        lat: 2.3131166788984387,
        long: 50.854772508530175,
        description : "Humm winter iceCream are the best",
        url: "./toutou.png",
        genre: "image",
      },
      {
        title: "IronHack",
        lat: 3.3131166788984387,
        long: 47.854772508530175,
        description : "IRONBEEEEERSSS",
        url: "./toutou.png",
        genre: "image",
      },
  ];

  (async function insertPins() {
    try {
      // await Journey.deleteMany(); // empty the album db collection
      await Pin.deleteMany(); // empty the album db collection
  
      // //On trouve des user que l'on stocke dans creator pour pouvoir l'exploiter ensuite
      // const creator = await Promise.all([
      //   User.findOne({ username: "James Cook" }),
      //   User.findOne({ username: "Christophe Colomb" }),
      //   User.findOne({ username: "John Doe" }),
      // ]);
  
      // //On assigne à l'array isFollowing les user que le user[0] follow
      // //on assigne au premier pin un creator qui sera le premier de l'array creator soit james cook
      // pins[0].creator = creator[0]._id;   
      // pins[1].creator = creator[1]._id;
      // pins[2].creator = creator[2]._id;


  
      console.log("yatou?")
  
      const finalBatch = await Pin.find();
  
      console.log(finalBatch);
      const insertedPins = await Pin.insertMany(pins); // insert docs in db permet d'avoir une premiere version sans creator
      console.log(`seed albums done : ${insertedPins.length} documents inserted !`);
    
      process.exit();
    } catch (err) {
      console.error(err);
    }
  })();
  