const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Journey = require("./../models/Journey");
const Tag = require("./../models/Tag");
const Pin = require("./../models/Pin");

const uploader = require("./../configs/cloudinary");

router.get("/", async (req, res, next) => {
    try {
      const userId = await User.findById(req.session.currentUser._id);

      console.log("journiesFollowedByUser>>>", userId)
      res.status(200).json(userId); 
    } catch (err) {
      next(err);
    }
  });


module.exports = router;
