const Person = require('../models/Person')

const getPersons = (req, res) => {
  Person.find({}).then(persons => {
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

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    }
    )
    .catch(err => {
        res.status(400).json({ error: err })
    })
}

module.exports = { getPersons, getPersonByName, addPerson }
