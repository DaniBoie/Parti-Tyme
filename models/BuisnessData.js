const { model, Schema } = require('mongoose')

const BuisnessData = new Schema({
  name: {
    type: String,
    unique: true,
  },
  bio: {
    type: String,
  },
  instagram: {
    type: String,
    unique: true,
  },
  website: {
    type: String,
    unique: true,
  },
  facebook: {
    type: String,
    unique: true,
  },
  buisness_type: {
    type: String,
  },
  fee: {
    type: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true })

BuisnessData.plugin(require('passport-local-mongoose'))

module.exports = model('BuisnessData', BuisnessData)