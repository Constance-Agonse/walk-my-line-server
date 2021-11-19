const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Journey = require("./../models/Journey");
const Tag = require("./../models/Tag");
const Pin = require("./../models/Pin");

router.get("/", async (req, res, next) => {
    try {

      const journiesCreateByUser = await Journey.find()
      .populate('pins')

      console.log("journiesFollowedByUser>>>", journiesCreateByUser)
      res.status(200).json(journiesCreateByUser); //, users
    } catch (err) {
      next(err);
    }
  });

  module.exports = router;