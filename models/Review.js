const { model, Schema } = require("mongoose");

const Review = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    buisness: {
      type: Schema.Types.ObjectId,
      ref: "BuisnessData",
    },
  },
  { timestamps: true }
);

Review.plugin(require("passport-local-mongoose"));

module.exports = model("Review", Review);
