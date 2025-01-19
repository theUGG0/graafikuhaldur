import { useState, useEffect } from "react"
import Calendar from "../components/Calendar"
import personService from "../../services/personService"


const Schedule = () => {
    const [initialPeople, setInitialPeople] = useState([])

    useEffect(() => {
        personService.getAllPeople().then(ps => {
            setInitialPeople(ps)
    })
    }, [])

    return(
    <Calendar initialPeople={initialPeople}></Calendar>)
}

export default Schedule