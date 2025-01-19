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


    const handleSelect = (selectedOptions, dateToAdd) => {
        const selectedOptionNames = selectedOptions.map(po => po.value)

        const newSelectedName = selectedOptionNames.find(pn => {
            return !assignedPeople.some(ap => ap.name === pn)
        }
        )

        const newSelectedObject = people.find(p => newSelectedName === p.name)
        
        setAssignedPeople(prev => [...prev, newSelectedObject])

        updatePersonUpcomingDates(newSelectedObject, dateToAdd)
        
        personService.addDateToPerson(newSelected, dateToAdd)
    }
    
    
    return (
        <div>
        <div>Selected date is {selectedDate.toDateString()}</div>
        <Select options={people.map(p => ({value: p.name, label: p.name}))} isMulti value={assignedPeople.map(p => ({value: p.name, label: p.name}))} onChange={(np) => handleSelect(np, selectedDate)} isOptionDisabled={() => assignedPeople.length >= peoplePerDay}/>
        </div>
    )
}

export default DayPopup