import { Schema, model } from 'mongoose'

const personSchema = new Schema({
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

const User = model('Person', personSchema)

export default User