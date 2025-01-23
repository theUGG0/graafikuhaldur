import { useEffect, useState } from "react"
import Select from "react-select"
import groupService from "../../services/groupService"


const GroupAssigner = ({people, groups, setGroups}) => {

    const [newGroupName, setNewGroupName] = useState("")

    console.log(groups)

    const handlePersonAssignment = (group, newAssignedPeopleOpt) => {
        const newAssignedPeople = newAssignedPeopleOpt.map(po => po.value)
        console.log("newAssignedPeople", newAssignedPeopleOpt)
        setGroups(groups.map(g => (
            g.name === group.name ? {...g, assignedPeople: newAssignedPeople} : g
        )))
        groupService.addPersonToGroup(group, newAssignedPeople)
    }

    const handleGroupAdd = (e) => {
        e.preventDefault()
        groupService.createGroup(newGroupName).then(createdGroup => setGroups([...groups, createdGroup]))
        setNewGroupName('')
    }
    
    const handleGroupDelete = (groupToDelete) => {
        groupService.deleteGroupByName(groupToDelete.name)
        .then(deletedGroup => setGroups(groups.filter(g => g.name !== deletedGroup.name)))
    }
    
    return (
        <div>
            <div>
                Assign people to groups
                <form onSubmit={(e) => handleGroupAdd(e)}>
                    <input type="text" value={newGroupName} onChange={e => setNewGroupName(e.target.value)}></input>
                    <input type="submit" value={"Add new group"}></input>
                </form>
            </div>
            {groups.map(group => (
            <div key={group.name}>
                Assign people to {group.name}
                <Select 
                isMulti 
                options={people.map(person => ({value: person.name, label: person.name}))}
                onChange={(newValue) => handlePersonAssignment(group, newValue)}
                value={group.assignedPeople.map(ap => ({label: ap, value: ap}))}/>
                <button onClick={() => handleGroupDelete(group)}>Delete Group</button>
            </div>
        ))}
        </div>
        
    )
}

export default GroupAssigner