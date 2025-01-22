import axios from 'axios'
import { isSameDay } from "date-fns";

const baseURL = "http://localhost:5001/api"

const getAllPeople = () => (
    axios.get(`${baseURL}/persons`).then(response => response.data)
)

const addDateToPerson = (personObject, dateToAdd) => (
    axios.put(
        `${baseURL}/persons/${personObject.name}`, 
        {
            upcomingDates: [...personObject.upcomingDates, new Date(dateToAdd)], 
        })
        .then(response => response.data)
)

const removeDateFromPerson = (personObject, dateToRemove) => (
    axios.put(
        `${baseURL}/persons/${personObject.name}`, 
        {upcomingDates: personObject.upcomingDates.filter(d => !isSameDay(new Date(d), dateToRemove))})
        .then(response => response.data)
)

const getAllPeopleWithDate = (dateToFind) => {    

    if(!dateToFind) return []
    
    return getAllPeople().then(data => {
        console.log(data)
        
        return data.filter(person => person.upcomingDates.some(date => {
        console.log(isSameDay(new Date(date), dateToFind))
        
        return isSameDay(new Date(date), new Date(dateToFind))
    }))})
}

export default {getAllPeople, addDateToPerson, getAllPeopleWithDate, removeDateFromPerson}