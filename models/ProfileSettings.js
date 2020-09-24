const { model, Schema } = require('mongoose')

const ProfileSettings = new Schema({
  img: {
    type: String,
  },
  bio: {
    type: String,
  },
  instagram: {
    type: String,
    unique: true,
  },
  facebook: {
    type: String,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true })

ProfileSettings.plugin(require('passport-local-mongoose'))

module.exports = model('ProfileSettings', ProfileSettings)