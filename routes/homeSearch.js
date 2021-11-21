const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Journey = require("./../models/Journey");
const Tag = require("./../models/Tag");
const Pin = require("./../models/Pin");

router.get("/", async (req, res, next) => {
    try {

      const journies = await Journey.find()
      .populate('pins')
      .populate('creator')

      console.log("journiesFollowedByUser>>>", journies)
      res.status(200).json(journies); //, users
    } catch (err) {
      next(err);
    }
  });

  module.exports = router;