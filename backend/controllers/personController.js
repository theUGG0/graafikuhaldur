import Person from "../models/Person"

const getPersons = (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
}

const getPersonByName = (req, res) => {
    Person.find({name: req.body.name}).then(person => {
        if (person) {
            res.json(person)
        }
        else {
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
    .then(
        res.json(person)
    )
}

export default { getPersons, getPersonByName, addPerson }