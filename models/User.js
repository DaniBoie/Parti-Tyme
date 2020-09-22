const { model, Schema } = require('mongoose')

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  account_type: {
    type: Number,
    required: true,
  },
  // Items is an array that refrences the item objects as children.
  Settings: [{
    type: Schema.Types.ObjectId,
    ref: 'ProfileSettings'
  }]


}, { timestamps: true })

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)