const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    groups: {
        type: [String],
    },
    upcomingDates: {
        type: [Date]
    },
    weekdayCount: Number,
    holidayCount: Number
})