import { useEffect, useState } from 'react'
import Select from 'react-select'
import personService from '../../services/personService'
import { isSameDay } from 'date-fns'

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


    const handleSelect = (selectedOptions, dateToUpdate) => {


        const selectedOptionNames = selectedOptions.map(po => po.value)

        const removedObject = assignedPeople.filter(ap => !selectedOptionNames.includes(ap.name))[0]

        if(removedObject){
            console.log("Person removed!")

            console.log(selectedOptionNames, removedObject)

            setAssignedPeople(prev => prev.filter(pn => pn.name !== removedObject.name))
            updatePersonUpcomingDates(removedObject, removedObject.upcomingDates.filter(d => !isSameDay(new Date(d), dateToUpdate)))
            personService.removeDateFromPerson(removedObject, dateToUpdate)

            console.log(assignedPeople)
            
            return
        }

        const newModifiedName = selectedOptionNames.find(pn => {
            return !assignedPeople.some(ap => ap.name === pn)
        }
        )

        const newModifiedObject = people.find(p => newModifiedName === p.name)
        
        setAssignedPeople(prev => [...prev, newModifiedObject])

        updatePersonUpcomingDates(newModifiedObject, [...newModifiedObject.upcomingDates, new Date (dateToUpdate)])

        personService.addDateToPerson(newModifiedObject, dateToUpdate)
    }
    
    
    return (
        <div>
        <div>Selected date is {selectedDate.toDateString()}</div>
        <Select options={people.map(p => ({value: p.name, label: p.name}))} isMulti value={assignedPeople.map(p => ({value: p.name, label: p.name}))} onChange={(np) => handleSelect(np, selectedDate)} isOptionDisabled={() => assignedPeople.length >= peoplePerDay}/>
        </div>
    )
}

export default DayPopup