const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  assignedPeople: {
    type: [String]
  }

})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group
