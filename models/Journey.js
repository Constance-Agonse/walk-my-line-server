const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JourneySchema = new Schema({
  isPublic: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: "Tag"
  }],
  pins: [{
    type: Schema.Types.ObjectId,
    ref: "Pin"
  }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  journeyTime: {
    type: Number,
    min: 0,
  },

  km: {
    type: Number,
    min: 0,
  },

  isLikedBy: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],

  rate: {
    type: Number,
    default: 0,
  },
  
  latInitial: {
    type: Number
  },
  longInitial: {
    type: Number
  }, // A GERER PLUS TARD DANS LE CODE LORS DE LA CREATION D'UN TRAJET
  geometry: {
    type: [[Number]],
  },
},

);

const JourneyModel = mongoose.model("Journey", JourneySchema);

module.exports = JourneyModel;
