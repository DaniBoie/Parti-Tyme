const { model, Schema } = require("mongoose");

const ProfileSettings = new Schema(
  {
    img: {
      type: String,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

ProfileSettings.plugin(require("passport-local-mongoose"));

module.exports = model("ProfileSettings", ProfileSettings);
