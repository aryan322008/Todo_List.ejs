
exports.getDate = () => {
    const date = new Date()

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    newDate = date.toLocaleDateString("en-US", options)

    return newDate
}

exports.getDay = () => {
    const date = new Date()
    currentDay = date.getDay() //0 == sunday,1,2,3,4,5,6 == saturday
    if (currentDay == 1) {
        day = "monday"
    }
    else if (currentDay == 2) {
        day = "tuesday"
    }
    else if (currentDay == 3) {
        day = "wednesday"
    }
    else if (currentDay == 4) {
        day = "thursday"
    }
    else if (currentDay == 5) {
        day = "friday"
    }
    else if (currentDay == 6) {
        day = "saturday"
    }
    else {
        day = "sunday"
    }

    return day
}