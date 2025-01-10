import { useState, useEffect } from "react"
import Calendar from "../components/Calendar"


const Schedule = () => {
    const [people, setPeople] = useState([{"_id":"678119235a5d85557b04b0c9","name":"sample","password":"doo-doo-doo","groups":[],"upcomingDates":[],"__v":0},{"_id":"678119bef0c9462bd730363e","name":"sample2","password":"doo-doo-doo","groups":[],"upcomingDates":[],"__v":0}])

    return(
    <Calendar></Calendar>)
}

export default Schedule