
const DayPopup = ({selectedDate}) => {
        if(!selectedDate){
        return null
    }
    
    return (
        <div>Selected date is {selectedDate.toDateString()}</div>
    )
}

export default DayPopup