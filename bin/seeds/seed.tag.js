require("dotenv").config();
require("./../../configs/mongo"); // fetch the db connection
const Tag = require("./../../models/Tag");

const tags = [
  {
    name: "#architecture",
  },
  {
    name: "#iceCream",
  },
  {
    name: "#bar",
  },
  {
    name: "#secretPassage",
  },
  {
    name: "#historicMonument",
  },
  {
    name: "#moviePlace",
  },
  {
    name: "#beautiful",
  },
];

(async function insertTestTag() {
    try {
      await Tag.deleteMany(); // empty the tag db collection
      const inserted = await Tag.insertMany(tags); // insert docs in db
      console.log(`seed tag done : ${inserted.length} documents inserted !`);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  })();
