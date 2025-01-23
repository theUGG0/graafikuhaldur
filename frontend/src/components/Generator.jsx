
/* 
ALGORITHM FutureAssignmentBalancer:
    // Track existing assignments
    foreach person:
        track_total_count(weekdays, weekends, holidays)
        track_last_assigned_date()

    // For each new date to be assigned:
    for each future_date:
        eligible_people = filter people where:
            - Not assigned previous day
            - Can work this type of day (weekday/weekend/holiday)
        
        score_candidates(eligible_people):
            score = 0
            // Lower total count means higher priority
            score -= current_total_assignments * 3
            
            // Penalize if they already have many of this day type
            if future_date is weekend:
                score -= current_weekend_count * 2
            else if future_date is weekday:
                score -= current_weekday_count * 2
            else: // holiday
                score -= current_holiday_count * 2
                
            // Bonus for people who haven't worked in a while
            score += days_since_last_assignment
            
        assign_date_to_highest_score()
        update_counts_and_last_date()
        */

        // logic
        // 1. select groups to generate with
        // 2. assign dates to groups
        // 3. generate

import Select from 'react-select'

const Generator = ({people, groups}) => {



    return (
    <div>
        <Select
            isMulti
            options={groups.map(g => ({ label: g.name, value: g.name }))}
        />
    </div>
    )
}

export default Generator