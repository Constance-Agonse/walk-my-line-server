const express = require("express");
const router = express.Router();
<<<<<<< HEAD
// const User = require("./../models/User");
const Journey = require("./../models/Journey");


// const uploader = require("./../configs/cloudinary");

//READ
router.get("/", async (req, res, next) => {
    try {
      //je dois accéder au trajet suivi pour compter leur taille = journies 
      // => modification de isFollowing
      // je dois trouver toutes les journies qui contiennent mon nom en creator 
      const users = await User.find()
      // .populate('label')
      // .populate({
      //   path:'artist',
      //   populate : {
      //     path : 'style',
      //   }
      // });
      const user = await User.findById(req.session.currentUser._id);
      const journiesCreateByUser = await Journey.find({creator : req.session.currentUser._id}).populate('creator')
      const journiesFollowedByUser = await Journey.find({isLikedBy : req.session.currentUser._id}).populate('isLikedBy') //{_id : req.session.currentUser._id}

      // {isLikedBy :61937ba28e80564ca0a670dc}

      const result = [users,user,journiesCreateByUser, journiesFollowedByUser] //,journies
      console.log("journiesFollowedByUser>>>",journiesFollowedByUser)
      res.status(200).json(result); //, users
    } catch (err) {
      next(err);
    }
  });


  


// router.get('/',protectRoute, async (req,res,next) => {

//     console.log(res.locals.isLoggedIn);
//     try {
//         console.log(req.session.currentUser._id);
//         const user = await UserModel.findById(req.session.currentUser._id);
//         const courseTaken =  await ExchangesModel.find({ teacher : req.session.currentUser._id, exchangeStatus : { $ne : "done" } }).populate("student").populate("skillsName")
//         const courseGiven =  await ExchangesModel.find({ student : req.session.currentUser._id, exchangeStatus : { $ne : "done" } }).populate("teacher").populate("skillsName")
//         // console.log(courseTaken);


//         res.render("./profileViews/profile.hbs", {courseTaken, courseGiven, user, page: 'profile' })
//     } catch (err) {
//         next(err);
//     }
// })
module.exports = router;
=======

// router.get("/:id", async (req, res, next) => {
//     try {
        
//       res.status(200).json(result); //, users
//     } catch (err) {
//       next(err);
//     }
//   });
>>>>>>> 550854bd6dda9ba00cd762bc9d7d4b509b9d848c
