import { useEffect, useState } from 'react'
import Select from 'react-select'
import personService from '../../services/personService'

const DayPopup = ({selectedDate, people, peoplePerDay=2, updatePersonUpcomingDates}) => {
    
    const [assignedPeople, setAssignedPeople] = useState([])

    useEffect(() => {
        if(selectedDate){
        personService.getAllPeopleWithDate(selectedDate).then(data => setAssignedPeople(data))
        }
    }, [selectedDate])
    

    if(!selectedDate){
        return null
    }


    const handleSelect = (optionsToAdd, dateToAdd) => {
        const addedPersonNames = optionsToAdd.map(po => po.value)        
        const newSelected = addedPersonNames.filter(pn => {
            return !assignedPeople.some(ap => ap.name === pn)
        }
        )

        console.log(newSelected)

        var assignedPeopleObjectsToSet = people.filter(p => addedPersonNames.includes(p.name))

        console.log(assignedPeopleObjectsToSet)
        

        setAssignedPeople(assignedPeopleObjectsToSet)

        updatePersonUpcomingDates(newSelected[0], dateToAdd)
        personService.addDateToPerson(newSelected[0], dateToAdd)
    }
    
    
    return (
        <div>
        <div>Selected date is {selectedDate.toDateString()}</div>
        <Select options={people.map(p => ({value: p.name, label: p.name}))} isMulti value={assignedPeople.map(p => ({value: p.name, label: p.name}))} onChange={(np) => handleSelect(np, selectedDate)} isOptionDisabled={() => assignedPeople.length >= peoplePerDay}/>
        </div>
    )
}

export default DayPopup