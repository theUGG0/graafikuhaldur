import { useState, useEffect } from "react"
import Calendar from "../components/Calendar"


const Schedule = () => {
    const [people, setPeople] = useState([{"_id":"678119235a5d85557b04b0c9","name":"sample","groups":[],"upcomingDates":[],"__v":0},{"_id":"678119bef0c9462bd730363e","name":"sample2","groups":[],"upcomingDates":[],"__v":0},{"_id":"6781e6cde363bfba01e4fbf6","name":"sample3","groups":[],"upcomingDates":[],"__v":0},{"_id":"6781e7dde363bfba01e4fbf8","name":"sample4","groups":[],"upcomingDates":[],"__v":0},{"_id":"6781f6f1e360f867dfff8596","name":"sampleClaude","groups":[],"upcomingDates":["2025-01-11T00:00:00.000Z","2025-01-15T00:00:00.000Z","2025-01-20T00:00:00.000Z"],"__v":0}])

    return(
    <Calendar people={people}></Calendar>)
}

export default Schedule