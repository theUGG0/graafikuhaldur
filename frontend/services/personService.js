import axios from 'axios'
import { getISODay, isSameDay, isWeekend } from "date-fns";

const baseURL = "http://localhost:5001/api"

const getAllPeople = () => (
    axios.get(`${baseURL}/persons`).then(response => response.data)
)

const addDateToPerson = (personObject, dateToAdd) => {
    const personHolidayCount = personObject.holidayCount ? personObject.holidayCount : 0
    const personWeekdayCount = personObject.weekdayCount ? personObject.weekdayCount : 0

    return axios.put(
        `${baseURL}/persons/${personObject.name}`, 
        {
            upcomingDates: [...personObject.upcomingDates, dateToAdd], 
            ...((getISODay(dateToAdd) > 4? {holidayCount: personHolidayCount+1} : {weekdayCount: personWeekdayCount+1}))
        })
        .then(response => response.data)
    }

const removeDateFromPerson = (personObject, dateToRemove) => {
    const personHolidayCount = personObject.holidayCount ? personObject.holidayCount : 0
    const personWeekdayCount = personObject.weekdayCount ? personObject.weekdayCount : 0

    return axios.put(
        `${baseURL}/persons/${personObject.name}`, 
        {upcomingDates: personObject.upcomingDates.filter(d => !isSameDay(new Date(d), dateToRemove)),
            ...((getISODay(dateToRemove) > 4? {holidayCount: personHolidayCount-1} : {weekdayCount: personWeekdayCount-1}))

        })
        .then(response => response.data)
    }

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