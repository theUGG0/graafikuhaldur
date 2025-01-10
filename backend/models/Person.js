const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  groups: [String],
  upcomingDates: [Date],
  weekdayCount: Number,
  holidayCount: Number
})

const User = mongoose.model('Person', personSchema)

module.exports = User
