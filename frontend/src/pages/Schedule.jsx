import { useState, useEffect } from "react"
import Calendar from "../components/Calendar"
import GroupAssigner from "../components/GroupAssigner"
import personService from "../../services/personService"
import groupService from "../../services/groupService"
import Generator from "../components/Generator"


const Schedule = () => {
    const [people, setPeople] = useState([])
    const [groups, setGroups] = useState([])
    const [selectedTab, setSelectedTab] = useState(["generator"])

    useEffect(() => {
        personService.getAllPeople().then(ps => {
            setPeople(ps)
    })
    }, [])

    useEffect(() => {
        groupService.getAllGroups().then(data => setGroups(data))
    }, []) 


    return(
    <div>
        <div>
        <Calendar people={people} setPeople={setPeople}></Calendar>
        </div>
        <>
        <br/>
        <div>
            <button onClick={() => selectedTab === "generator" ? setSelectedTab("group") : setSelectedTab("generator")}>
                {selectedTab === "generator" ? "Switch to Group tab" : "Switch to Generator tab"}
            </button>
        </div>
        <br/>
        {selectedTab === "generator" ? (<Generator people={people} groups={groups}/>) : (<GroupAssigner people={people} groups={groups} setGroups={setGroups}/>)}
        </>
    </div>
    )
}

export default Schedule