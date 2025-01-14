import { useState } from 'react'
import Select from 'react-select'

const DayPopup = ({selectedDate, people, peoplePerDay=2}) => {
    
    const [assignedPeople, setAssignedPeople] = useState([])

    if(!selectedDate){
        return null
    }


    const handleSelect = (personToAdd) => {
        setAssignedPeople(personToAdd)
    }
    
    return (
        <div>
        <div>Selected date is {selectedDate.toDateString()}</div>
        <Select options={people.map(p => ({value: p.name, label: p.name}))} isMulti value={assignedPeople} onChange={(np) => handleSelect(np)} isOptionDisabled={() => assignedPeople.length >= peoplePerDay}/>
        </div>
    )
}

export default DayPopup