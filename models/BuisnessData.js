const { model, Schema } = require('mongoose')

const BuisnessData = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
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
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]

}, { timestamps: true })

BuisnessData.plugin(require('passport-local-mongoose'))

module.exports = model('BuisnessData', BuisnessData)