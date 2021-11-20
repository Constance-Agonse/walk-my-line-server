/*------------------------------------------
// AUTH ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
const uploader = require("./../configs/cloudinary");

const minPasswordLength = 4;

/*
  learn more about session, cookies, token here =>
  https://www.youtube.com/watch?v=2PPSXonhIck&t=1809s
*/

// more on HTTP status
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

router.post("/signup", uploader.single("profilePic"), (req, res, next) => {
  // console.log("file ?", req.file);
  // console.log(req.body);
  let errorMsg = "";

  console.log("heyyyyy")
  const { username, password, email } = req.body;
  // const { profilePic } = req.file;
  // @todo : best if email validation here or check with a regex in the User model
  if (!password || !email) errorMsg += "Provide email and password.\n";

  if (password.length < minPasswordLength)
    errorMsg += `Please make your password at least ${minPasswordLength} characters.`;

  if (errorMsg) return res.status(403).json(errorMsg); // 403	Forbidden

  const salt = bcrypt.genSaltSync(10);
  // more on encryption : https://en.wikipedia.org/wiki/Salt_(cryptography)
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = {
    username,
    email,
    password: hashPass,
    // profilePic,
  };
  newUser.profilePic= null;

 console.log('>>>>>>>>', req.file)
  // check if an profilePic FILE has been posted
  if (req.file) newUser.profilePic = req.file.secure_url;

 
console.log("req")


  userModel
    .create(newUser)
    .then(() => {
      res.status(200).json({ msg: "signup ok" });
    })
    .catch((err) => {
      console.log("signup error", err);
      next(err);
    });
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err || !user) return res.status(403).json({ failureDetails }); // 403 : Forbidden

    /**
     * req.Login is a passport method
     * check the doc here : http://www.passportjs.org/docs/login/
     */
    req.logIn(user, function (err) {
      /* doc says: When the login operation completes, user will be assigned to req.user. */
      if (err) {
        return res.json({ message: "Something went wrong logging in" });
      }

      // We are now logged in
      // You may find usefull to send some other infos
      // dont send sensitive informations back to the client
      // let's choose the exposed user below
      const { _id, username, email, profilePic, isFollowing } = user;
      // and only expose non-sensitive inofrmations to the client's state
    
        res.status(200).json({
          currentUser: {
            _id,
            username,
            email,
            profilePic,
             isFollowing,
          },
        })
      ;
    });
  })(req, res, next); // IIFE (module) pattern here (see passport documentation)
});

router.post("/signout", (req, res, next) => {
  req.logout(); // utility function provided by passport
  console.log("log out server")
  res.status(200).json({ message: "Successfully logged out" });
});

router.use("/is-loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    // method provided by passport
    const { _id, username, email, profilePic, isFollowing } = req.user;
    return res.status(200).json({
      currentUser: {
        _id,
        username,
        email,
        profilePic,
        isFollowing,
      },
    });
  }
  res.status(403).json("Unauthorized");
});

module.exports = router;
