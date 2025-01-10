const Person = require("../models/Person")

const getPersonByName = async (req, res) => {
    Person.find({name: req.body}).then(person => {
        if (person) {
            res.json(person)
        }
        else {
            res.status(404).end()
        }
})

}