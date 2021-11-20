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


module.exports = router;
