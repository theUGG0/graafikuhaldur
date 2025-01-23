const Group = require('../models/Group')

const getAllGroups = (req, res) => (
  Group.find({}).then(groups => res.json(groups))
)

const createGroup = (req, res) => {
  const newGroup = new Group({
    name: req.body.name
  })

  newGroup.save().then(addedGroup => res.json(addedGroup))
}

const updateGroupByName = (req, res) => (
  Group.findOneAndUpdate({ name: req.params.name }, { assignedPeople: req.body.assignedPeople }, { new: true }).then(updatedGroup => res.status(200).json(updatedGroup))
)

module.exports = { getAllGroups, updateGroupByName, createGroup }
