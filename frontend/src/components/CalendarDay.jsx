import { getDate } from "date-fns"

const CalendarDay = (props) => {



    return (
        <td onClick={() => props.selectDay(props.day)}>
            {getDate(props.day)}
        </td>
    )
}

export default CalendarDay