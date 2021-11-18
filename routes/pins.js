const express = require("express");
const router = express.Router();
const PinModel = require("./../models/Pin");
const uploader = require("./../configs/cloudinary");

// https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
// https://docs.microsoft.com/fr-fr/azure/architecture/best-practices/api-design

// CREATE
// router.post("/", uploader.single("media"), async (req, res, next) => {
//   console.log("req.file");
  
//   console.log(req.file);
//   try {
//     const newPin = await PinModel.create({ ...req.body, media: req.file.path }); //  req.file.path  => provided by cloudinary's response
//     res.status(201).json(newPin);
//   } catch (err) {
//     next(err);
//   }
// });
router.post("/", async (req, res, next) => {
  console.log("req.file");
  
  console.log(req.file);
  console.log('-----------------------');

  console.log(req.body.title);
  // .body
  console.log('-----------------------');

  try {
    const newPin = await PinModel.create({ ...req.body }); //  req.file.path  => provided by cloudinary's response
    res.status(201).json(newPin);
  } catch (err) {
    next(err);
  }
});
// READ

router.get("/", async (req, res, next) => {
  try {
    const pins = await PinModel.find();
    res.status(200).json(pins);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const pin = await PinModel.findById(req.params.id);
    res.status(200).json(pin);
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.patch("/:id", async (req, res, next) => {
  try {
    const updatedPin = await PinModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPin);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedPin = await PinModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedPin);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
