import { useState } from "react"
import { eachDayOfInterval, getDaysInMonth, getISODay, getMonth, getYear, sub, add, getDate, setMonth} from "date-fns"
import CalendarDay from "./CalendarDay"

const generateMonthMap = ({month, year}) => {

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month, getDaysInMonth(month))

    const firstDateOfMonth = getISODay(firstDayOfMonth)
    const lastDateOfMonth = getISODay(lastDayOfMonth)

    const intervalStartOffset = 1-firstDateOfMonth
    const intervalEndOffset = 7-lastDateOfMonth

    console.log(sub(firstDayOfMonth, {days: intervalStartOffset}), intervalEndOffset)

    const monthDays = eachDayOfInterval({ start: add(firstDayOfMonth, {days: intervalStartOffset}), end: add(lastDayOfMonth, {days: intervalEndOffset}) })

    return [monthDays.slice(0, 7), monthDays.slice(7, 14), monthDays.slice(14, 21), monthDays.slice(21, 28), monthDays.slice(28, 35)]
}

const Calendar = () => {
    
    const weekdays = ["Mon", "Tue", 'Wed', 'Thu', 'Fri', 'Sat', "Sun"]
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const today = new Date()

    const [calendarState, setCalendarState] = useState({
        month: getMonth(today),
        year: getYear(today),
    })

    const [calendarSelection, setcalendarSelection] = useState(undefined)

    const handleMonthChange = (change) => {
        const prevMonth = calendarState.month
        
        const newMonth = (prevMonth + change + 12) % 12
        const newYear = calendarState.year + (newMonth < prevMonth ? (change > 0 ? 1 : -1) : 0)
        setCalendarState({ month:newMonth, year:newYear})
    }

    console.log(calendarState);
    console.log(generateMonthMap(calendarState))
    const monthMap = generateMonthMap(calendarState)

    return (
        <>
        <div>
            Calendar
        </div>
        <table>
            <thead><th colSpan={7}>{months[calendarState.month]}</th></thead>
            <tbody>
                {weekdays.map(day => (<th>{day}</th>))}
                {monthMap.map(week => (<tr>{week.map(day => <CalendarDay day={getDate(day)}/>)}</tr>))}
           </tbody>
           <div>
           <button onClick={() => handleMonthChange(-1)}>{"<"}</button>
           <button onClick={() => handleMonthChange(1)}>{">"}</button>
           </div>
        </table>
        </>
    )

}

export default Calendar