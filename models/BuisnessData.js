const { model, Schema } = require("mongoose");

const BuisnessData = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    bio: {
      type: String,
    },
    slogan: {
      type: String,
    },
    img: {
      type: String,
    },
    instagram: {
      type: String,
    },
    website: {
      type: String,
    },
    facebook: {
      type: String,
    },
    buisness_type: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);
// BuisnessData.plugin(require("passport-local-mongoose"));

module.exports = model("BuisnessData", BuisnessData);
