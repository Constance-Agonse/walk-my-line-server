const express = require("express");
const router = express.Router();
const Journey = require("./../models/Journey");
const User = require("./../models/User");

// router.get("/:id", async (req, res, next) => {
//     try {
        
//       res.status(200).json(result); //, users
//     } catch (err) {
//       next(err);
//     }
//   });

router.patch("/", async (req, res, next) => {
    try {
        
        console.log("-------------------------------------------REQBODY---------------------------------------------------------")
        console.log(req.body)
        console.log("-------------------------------------------REQparams---------------------------------------------------------")
        console.log(req.params)
        console.log("-------------------------------------------END---------------------------------------------------------")

      const updatefollowStatus = await Journey.findByIdAndUpdate(
        req.body._id, //id de la journey
        req.body,
        { new: true }
      );
      res.status(200).json(updatefollowStatus);
    } catch (err) {
      next(err);
    }
  });


module.exports = router;
