const Person = require('../models/Person')

const getAllPersons = (req, res) => {
  Person.find({})
    .select('-password')
    .then(persons => {
      res.json(persons)
    })
}

const getPersonByName = (req, res) => {
  Person.find({ name: req.params.name }).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
}

const addPerson = (req, res) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    password: body.password
  })

  if (body.groups) person.groups = body.groups
  if (body.upcomingDates) person.upcomingDates = body.upcomingDates.map(sd => new Date(sd))
  if (body.weekdayCount) person.weekdayCount = body.weekdayCount
  if (body.holidayCount) person.holidayCount = body.holidayCount

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    }
    )
    .catch(err => {
      res.status(400).json({ error: err })
    })
}

const assignDayToPerson = (req, res) => {
  const body = req.body

  if (!body.dateToAdd) {
    return res.status(500).json({ error: 'request must have dateToAdd' })
  }

  const formattedDateToAdd = new Date(body.dateToAdd)

  const dateCountToUpdate = formattedDateToAdd.getDay() < 6 && formattedDateToAdd.getDay > 0 ? { weekdayCount: 1 } : { holidayCount: 1 }

  Person.findOneAndUpdate({ name: body.name }, { $inc: { ...dateCountToUpdate }, $push: { upcomingDates: formattedDateToAdd } }, { new: true })
    .then((updatedPerson) => (
      res.status(200).json(updatedPerson)
    )
    )
    .catch((err) => (
      res.status(500).json({ error: err })
    ))
}

// const updatePersonByName = (req, res) => {
//   const body = req.body

//   const update = {}

//   if (body.groups) update.groups = body.groups
//   if (body.upcomingDates) update.upcomingDates = body.upcomingDates.map(sd => new Date(sd))
//   if (body.weekdayCount) update.weekdayCount = body.weekdayCount
//   if (body.holidayCount) update.holidayCount = body.holidayCount

//   Person.findOneAndUpdate({ name: body.name }, {})
// }

module.exports = { getAllPersons, getPersonByName, addPerson, assignDayToPerson }
