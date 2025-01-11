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

  if(body.groups) person.groups = body.groups
  if(body.upcomingDates) person.upcomingDates = body.upcomingDates.map(sd => new Date(sd))
  if(body.weekdayCount) person.weekdayCount = body.weekdayCount
  if(body.holidayCount) person.holidayCount = body.holidayCount

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    }
    )
    .catch(err => {
      res.status(400).json({ error: err })
    })
}

module.exports = { getAllPersons, getPersonByName, addPerson }
