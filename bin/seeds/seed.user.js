require("dotenv").config();
require("./../../configs/mongo"); // fetch the db connection
const User = require("./../../models/User");

const users = [
  {
    username: "John Doe",
    email: "john@doe.com",
    password: "azerty",
    profilePic:
      "http://images6.fanpop.com/image/photos/39000000/Cool-Dog-animals-39056074-1600-900.jpg",
    isFollowing: [],
  },
  {
    username: "Croustie",
    email: "croustie@croustie.com",
    password: "azerty",
    profilePic:
      "http://images6.fanpop.com/image/photos/39000000/Cool-Dog-animals-39056074-1600-900.jpg",
    isFollowing: [],
  },
  {
    username: "Marco Polo",
    email: "marco@polo.com",
    password: "azerty",
    profilePic:
      "http://images6.fanpop.com/image/photos/39000000/Cool-Dog-animals-39056074-1600-900.jpg",
    isFollowing: [],
  },
  {
    username: "James Cook",
    email: "james@cook.com",
    password: "azerty",
    profilePic:
      "http://images6.fanpop.com/image/photos/39000000/Cool-Dog-animals-39056074-1600-900.jpg",
    isFollowing: [],
  },
  {
    username: "Christophe Colomb",
    email: "christophe@colomb.com",
    password: "azerty",
    profilePic:
      "http://images6.fanpop.com/image/photos/39000000/Cool-Dog-animals-39056074-1600-900.jpg",
    isFollowing: [],
  },
  //   {
  //     username: "John Doe",
  //     email: "john@doe.com",
  //     password: "azerty",
  //     profilePic: "http://images6.fanpop.com/image/photos/39000000/Cool-Dog-animals-39056074-1600-900.jpg",
  //     isFollowing: ["Croustie","Marco Polo","James Cook","Christophe Colomb"],
  //   },
  //   {
  //     username: "Croustie",
  //     email: "croustie@croustie.com",
  //     password: "azerty",
  //     profilePic: "http://images6.fanpop.com/image/photos/39000000/Cool-Dog-animals-39056074-1600-900.jpg",
  //     isFollowing: ["Marco Polo","James Cook","John Doe"],
  //   },
  //   {
  //     username: "Marco Polo",
  //     email: "marco@polo.com",
  //     password: "azerty",
  //     profilePic: "http://images6.fanpop.com/image/photos/39000000/Cool-Dog-animals-39056074-1600-900.jpg",
  //     isFollowing: ["Croustie"],
  //   },
  //   {
  //     username: "James Cook",
  //     email: "james@cook.com",
  //     password: "azerty",
  //     profilePic: "http://images6.fanpop.com/image/photos/39000000/Cool-Dog-animals-39056074-1600-900.jpg",
  //     isFollowing: ["Croustie","Marco Polo","John Doe","Christophe Colomb"],
  //   },
  //   {
  //     username: "Christophe Colomb",
  //     email: "christophe@colomb.com",
  //     password: "azerty",
  //     profilePic: "http://images6.fanpop.com/image/photos/39000000/Cool-Dog-animals-39056074-1600-900.jpg",
  //     isFollowing: ["Croustie","Marco Polo","John Doe"],
  //   },
];

(async function insertUsers() {
  try {
    // await Journey.deleteMany(); // empty the album db collection
    await User.deleteMany(); // empty the album db collection
    const insertedUsers = await User.insertMany(users); // insert docs in db

    //On trouve des user que l'on stocke dans isFollowing pour pouvoir l'exploiter ensuite
    const isFollowing = await Promise.all([
      User.findOne({ username: "James Cook" }),
      User.findOne({ username: "Christophe Colomb" }),
      User.findOne({ username: "Marco Polo" }),
    ]);

    //On assigne à l'array isFollowing les user que le user[0] follow
    // Ici on lui en assigne 3 (pour John Doe)
    for (let user of insertedUsers) {
      user.isFollowing = [isFollowing[0]._id, isFollowing[1]._id, isFollowing[2]._id];
     await User.findByIdAndUpdate(user._id, user)
    }

    console.log("yatou?")

    const finalBatch = await User.find();

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
