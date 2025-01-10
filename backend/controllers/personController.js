import Person from "../models/Person"

const getPersonByName = (req, res) => {
    Person.find({name: req.body}).then(person => {
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
        res.json()
    )
}

export default { getPersonByName, addPerson }