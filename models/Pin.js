const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    // require: true,
  },
  title: {
    type: String,
  },
  rating: {
    type: Number,
    require: true,
    min: 0,
    max: 5
  },
  lat: {
    type: Number, 
    require: true,
  },
  long: {
    type: Number, 
    require: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  genre: {
      type: String,
      enum: ["video", "vocal", "image", "text"]
    },

}
);

const pinModel = mongoose.model("Pin", PinSchema);

 module.exports = pinModel;