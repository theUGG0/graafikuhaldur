import { useState, useEffect } from "react"
import Calendar from "../components/Calendar"
import personService from "../../services/personService"


const Schedule = () => {
    const [people, setPeople] = useState([])

    useEffect(() => {
        personService.getAllPeople().then(ps => {
            setPeople(ps)
    })
    }, [])

    return(
    <Calendar people={people} setPeople={setPeople}></Calendar>)
}

export default Schedule