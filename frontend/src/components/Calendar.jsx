    import { useEffect, useMemo, useState } from "react"
    import { eachDayOfInterval, getDaysInMonth, getISODay, getMonth, getYear, sub, add, getDate, setMonth, isSameDay} from "date-fns"
    import CalendarDay from "./CalendarDay"
    import DayPopup from "./DayPopup"

    const generateMonthMap = ({month, year}) => {

        const firstDayOfMonth = new Date(year, month, 1)
        const lastDayOfMonth = new Date(year, month, getDaysInMonth(month))

        const firstDateOfMonth = getISODay(firstDayOfMonth)
        const lastDateOfMonth = getISODay(lastDayOfMonth)

        const intervalStartOffset = 1-firstDateOfMonth
        const intervalEndOffset = 7-lastDateOfMonth

        const monthDays = eachDayOfInterval({ start: add(firstDayOfMonth, {days: intervalStartOffset}), end: add(lastDayOfMonth, {days: intervalEndOffset}) })

        return [monthDays.slice(0, 7), monthDays.slice(7, 14), monthDays.slice(14, 21), monthDays.slice(21, 28), monthDays.slice(28, 35)]
    }

    const Calendar = ({people, setPeople}) => {
        
        const weekdays = ["Mon", "Tue", 'Wed', 'Thu', 'Fri', 'Sat', "Sun"]
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const today = new Date()

        const [calendarState, setCalendarState] = useState({
            month: getMonth(today),
            year: getYear(today),
        })

        const [calendarSelection, setcalendarSelection] = useState(undefined)

        useEffect(() => {
            setPeople(people)
            console.log("people", people)
        }, [people])

        console.log(people)

        const monthMap = useMemo(() => generateMonthMap(calendarState), [calendarState])
        

        const handleMonthChange = (change) => {
            const prevMonth = calendarState.month
            
            const newMonth = (prevMonth + change + 12) % 12
            const newYear = calendarState.year + (newMonth < prevMonth && change > 0 ? 1 : (newMonth > prevMonth && change < 0 ? -1 : 0))
            setCalendarState({ month:newMonth, year:newYear})
        }

        const handleDayClick = (day) => {
            setcalendarSelection(day)
        }

        const updatePersonUpcomingDates = (personToEdit, modifiedUpcomingDates) => {        
            setPeople((previous) => previous.map(p => p.name === personToEdit.name ? {...p, upcomingDates: modifiedUpcomingDates} : p))
            console.log(people)
            
        }

        return (
            <>
            <div>
                Calendar
            </div>
            <table>
                <thead><tr><th colSpan={7}>{months[calendarState.month]}</th></tr></thead>
                <tbody>
                    {weekdays.map(day => (<th>{day}</th>))}
                    {monthMap.map((week,i) => (
                        <tr key={i}>
                        {week.map((day, j) => (
                        <CalendarDay key={j} assignedPeople={people.filter(p => p.upcomingDates.some(d => (isSameDay(new Date(d), day))))} selectDay={handleDayClick} day={day}/>
                        ))}
                        </tr>))}
            </tbody>
            </table>
            <div>
            <button onClick={() => handleMonthChange(-1)}>{"<"}</button>
            <button onClick={() => handleMonthChange(1)}>{">"}</button>
            </div>
            <DayPopup selectedDate={calendarSelection} people={people} peoplePerDay={2} updatePersonUpcomingDates={updatePersonUpcomingDates}/>
            </>
        )

    }

    export default Calendar