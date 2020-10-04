const { model, Schema } = require("mongoose");

const User = new Schema(
  {
    realname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    account_type: {
      type: Number,
      required: true,
    },
    Reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    // Items is an array that refrences the item objects as children.
    Settings: {
      type: Schema.Types.ObjectId,
      ref: "ProfileSettings",
    },
    Buisness: {
      type: Schema.Types.ObjectId,
      ref: "BuisnessData",
    },
  },
  { timestamps: true }
);

User.plugin(require("passport-local-mongoose"));

module.exports = model("User", User);
