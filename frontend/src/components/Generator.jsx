import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { differenceInDays, getISODay, isAfter, max, startOfToday} from 'date-fns'

const Generator = ({people, setPeople, groups}) => {

    const [selectedGroups, setSelectedGroups] = useState([])
    const [selectedDates, setSelectedDates] = useState({});
    const onGroupDatesChange = (group, dates) => {
      setSelectedDates({...selectedDates, [group.value]: dates});
    };

    const generatorAlgorithm = () => {
        selectedGroups.forEach(group => {
            const groupObj = groups.find(g => g.name === group.value)
            const dates = selectedDates[groupObj.name]
            dates.forEach(date => {
                const eligiblePeople = people.filter(p => (
                    groupObj.assignedPeople.some(ap => p.name === ap) && 
                    p.upcomingDates.every(d => {
                        return Math.abs(differenceInDays(date, new Date(d))) > 1
                    }) 
                ))

                
                const peopleScores = eligiblePeople.map(person => {
                    var score = 0
                    const holidayCount = person.holidayCount || 0
                    const weekdayCount = person.weekdayCount || 0

                    score -= (holidayCount + weekdayCount) * 3
                    
                    score -= getISODay(date) > 4 ? holidayCount * 2 : weekdayCount * 2

                    const latestDate = max(person.upcomingDates.filter(ud => !isAfter(new Date(ud), new Date(date))) || [startOfToday()])
                    score += differenceInDays(date, latestDate) 
                    
                    return {person, score}


                })

                console.log(date, peopleScores)

                const chosenPerson = peopleScores.reduce((max, current) => max.score > current.score ? max : current).person
                const updatedChosenPerson = {...chosenPerson, upcomingDates: [...chosenPerson.upcomingDates, date]}

                setPeople([...people, updatedChosenPerson])

                })
            
        })
    }

    return (
    <div>
        <Select
            isMulti
            options={groups.map(g => ({ label: g.name, value: g.name }))}
            value={selectedGroups}
            onChange={(values) => setSelectedGroups(values)}
        />
        <div>
            {selectedGroups.map(sg => (
                <div key={sg}>
                    <p>Assign dates to {sg.value}</p>
                    <DatePicker
                        selectedDates={selectedDates[sg.value] || null}
                        selectsMultiple
                        onChange={(dates) => onGroupDatesChange(sg, dates)}
                        shouldCloseOnSelect={false}
                        disabledKeyboardNavigation
                    />
                </div>
            ))}
        </div>
        <button onClick={() => generatorAlgorithm()}>Generate</button>
    </div>
    )
}

export default Generator