const Group = require('../models/Group')

const getAllGroups = (req, res) => (
  Group.find({}).then(groups => res.json(groups))
)

const getGroupByName = (req, res) => (
  Group.find({ name: req.params.name }).then(group => res.json(group))
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

const deleteGroupByName = (req, res) => (
  Group.findOneAndDelete({ name: req.params.name }, { new: true }).then(deletedGroup => res.status(200).json(deletedGroup))
)

module.exports = { getAllGroups, updateGroupByName, createGroup, getGroupByName, deleteGroupByName }
