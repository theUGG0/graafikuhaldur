import { getDate, isValid } from "date-fns"

const CalendarDay = ({day, selectDay, assignedPeople}) => {
    
    console.log(assignedPeople);
    

    if(!day || !isValid(day)){
        return (
            <td>Err</td>
        )
    }

    return (
        <td onClick={() => selectDay(day)}>
            {getDate(day)}
            {assignedPeople.map(p => <div>{p.name}</div>)}
        </td>
    )
}

export default CalendarDay