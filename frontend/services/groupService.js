import axios from "axios"

const baseURL = "http://localhost:5001/api"

const getAllGroups = () => (
    axios.get(`${baseURL}/groups`).then(response => response.data)
)

const createGroup = (newGroupName) => (
    axios.post(`${baseURL}/groups`, {name: newGroupName}).then(response => response.data)
)

const addPersonToGroup = (group, newAssignedPeople) => (
    axios.put(`${baseURL}/groups/${group.name}`, {assignedPeople: newAssignedPeople}).then(response => response.data)
)

const deleteGroupByName = (groupToDelete) => (
    axios.delete(`${baseURL}/groups/${groupToDelete}`).then(response => response.data)
)

export default { getAllGroups, addPersonToGroup, createGroup, deleteGroupByName }