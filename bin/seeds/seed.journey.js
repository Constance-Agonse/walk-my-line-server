require("dotenv").config();
require("./../../configs/mongo"); // fetch the db connection
const Journey = require("./../../models/Journey");
const Pin = require("./../../models/Pin");
const User = require("./../../models/User");
const Tag = require("./../../models/Tag");


const journies = [
  {
    isPublic : true,
    tags: [],
    pins: [],
    creator: undefined,
    journeyTime: 42,
    km: 42,
    isLikedBy: [],
    rate: 3,
    latInitial: 48.854772508530175,
    longInitial: 2.3131166788984387,
    geometry: [ [2.32964, 48.854712], [2.33047, 48.854466], [2.331069, 48.854337], [2.331109, 48.854257]]
  },
  {
    isPublic : false,
    tags: [],
    pins: [],
    creator: undefined,
    journeyTime: 42,
    km: 42,
    isLikedBy: [],
    rate: 3,
    latInitial: 47.854772508530175,
    longInitial: 2.3131166788984387,
    geometry: [ [2.32964, 48.854712], [2.33047, 48.854466], [2.331069, 48.854337], [2.331109, 48.854257]]
  },
  {
    isPublic : true,
    tags: [],
    pins: [],
    creator: undefined,
    journeyTime: 42,
    km: 42,
    isLikedBy: [],
    rate: 3,
    latInitial: 49.854772508530175,
    longInitial: 3.3131166788984387,
    geometry: [ [2.32964, 48.854712], [2.33047, 48.854466], [2.331069, 48.854337], [2.331109, 48.854257]]
  },
];

(async function insertUsers() {
  try {
    // await Journey.deleteMany(); // empty the album db collection
    await Journey.deleteMany(); // empty the album db collection
    const insertedJournies = await Journey.insertMany(journies); // insert docs in db

    //On trouve des user que l'on stocke dans isFollowing pour pouvoir l'exploiter ensuite
    const tags = await Promise.all([
      Tag.findOne({ name: "#architecture" }),
      Tag.findOne({ name: "#iceCream" }),
      Tag.findOne({ name: "#secretPassage" }),
      Tag.findOne({ name: "#historicMonument" }),
    ]);

    const pins = await Promise.all([
        Pin.findOne({ title: "Eiffel Tower" }),
        Pin.findOne({ title: "Bertillon" }),
        Pin.findOne({ title: "IronHack" }),
      ]);

    const users = await Promise.all([
        User.findOne({ username: "James Cook" }),
        User.findOne({ username: "Christophe Colomb" }),
        User.findOne({ username: "Marco Polo" }),
        User.findOne({ username: "Croustie" }),

    ]);

    let count = 0;
    let creatorNumber = 3;
    //On assigne à l'array isFollowing les user que le user[0] follow
    // Ici on lui en assigne 3 (pour John Doe)
    for (let journey of insertedJournies) {
        journey.tags = [tags[0]._id, tags[1]._id,tags[2]._id]; //on ajoute l'id pour l'instant ce qui signifie qu'on devra populate. Il serait peut etre plus judicieux de mettre directement le nom
        journey.isLikedBy = [users[0]._id, users[1]._id, users[3]._id];
        journey.pins = [pins[0]._id, pins[1]._id, pins[2]._id];
        (count % 2 === 0) ? (creatorNumber = 3):(creatorNumber = 2);
        count++;
        journey.creator = users[creatorNumber]._id;

        await Journey.findByIdAndUpdate(journey._id, journey);
    }

    console.log("yatou?")



// on créée deux creation pour croustie et une marco polo
// journies[0].creator = users[3]._id;
// journies[1].creator = users[3]._id;
// journies[2].creator = users[2]._id;
    // await Journey.insertMany(journies);


    const finalBatch = await Journey.find();

    console.log(finalBatch);

    // console.log(insertedUsers)

    /*    users[0].isFollowing[0] = isFollowing[1]._id;
    users[0].isFollowing[1] = isFollowing[2]._id;
    users[0].isFollowing[2] = isFollowing[0]._id;

    //Deuxieme facon de l'écrire plus propre
    users[1].isFollowing.push(isFollowing[0]._id);
    users[1].isFollowing.push(isFollowing[1]._id);
    users[1].isFollowing.push(isFollowing[2]._id);
*/

//   // const inserted = await User.updateMany(insertedUsers); // insert docs in db
  
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
