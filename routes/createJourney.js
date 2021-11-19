const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Journey = require("./../models/Journey");
const Tag = require("./../models/Tag");
const Pin = require("./../models/Pin");

const uploader = require("./../configs/cloudinary");

router.get("/", async (req, res, next) => {
    try {
      const userId = await User.findById(req.session.passport.user);

      console.log("journiesFollowedByUser>>>", userId)
      res.status(200).json(userId); 
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    console.log("req.body *********************************************");

    console.log(req.body);
    try {
      const newJourney = await Journey.create({ ...req.body }); //  req.file.path  => provided by cloudinary's response
      console.log("newJourney >>>>>")
      
      console.log(newJourney)
      res.status(201).json(newJourney);
    } catch (err) {
      next(err);
    }
  });


  // router.post("/",  async (req, res, next) => { //fileUploader.single("picture"),
  //   try {
  //     // get const variables from the req.body
  //     const { name, description, isBand, styleName, color, wikiURL } = req.body;
  //     // get the variable style from the select input (req.body)
  //     let {style}  = req.body;
  //     // Check if there is values to create a new style or use existing values from the select input
  //     if (styleName !== "" && wikiURL !== "") {
  //       const newStyle = await styleModel.create({
  //         styleName,
  //         wikiURL,
  //         color,
  //       });
  //       //turn the new ID created in the DB into string
  //       style = newStyle._id.toString();
  //     }
  //     //create the new artist with values from the inputs
  //     const newArtist = await artistModel.create({name, description, isBand, style});
  //     res.status(200).json(newArtist);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });

module.exports = router;
