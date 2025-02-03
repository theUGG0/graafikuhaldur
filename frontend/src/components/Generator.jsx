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

    const peoplePerDayConfig = 2

    const generatorAlgorithm = () => {

        var mutatedPeople = [...people]

        selectedGroups.forEach(group => {
            const groupObj = groups.find(g => g.name === group.value)
            const dates = selectedDates[groupObj.name]
            dates.forEach(date => {
                const eligiblePeople = mutatedPeople.filter(p => (
                    groupObj.assignedPeople.some(ap => p.name === ap) && 
                    p.upcomingDates.every(d => {
                        return Math.abs(differenceInDays(date, new Date(d))) > 1
                    }) 
                ))

                const peoplePerDay = Math.max(0, peoplePerDayConfig-mutatedPeople.filter(p => p.upcomingDates.includes(date)).length)

                console.log("peopleperday", peoplePerDay);
                
                

                
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

                const chosenPeople = peopleScores.sort((a,b) => b.score - a.score).splice(0, peoplePerDay).map(({person}) => person)

                const updatedChosenPeople = chosenPeople.map(p => ({...p, upcomingDates: [...p.upcomingDates, date]}))
                    
                mutatedPeople = mutatedPeople.map(p => {
                    const chosenPerson = updatedChosenPeople.find(cp => cp.name === p.name)
                    return chosenPerson ? chosenPerson : p
                })
                

                
                })
            
            
        })

        setPeople(mutatedPeople)
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