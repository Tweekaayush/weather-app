const calcDay = (num) =>{

    switch(num){
        case 0: return 'Sunday'
            
        case 1: return 'Monday'
        
        case 2: return 'Tuesday'
        
        case 3: return 'Wednesday'
        
        case 4: return 'Thursday'
        
        case 5: return'Friday'
        
        case 6: return 'Saturday'
        
        default: return 'Sunday'
    }
}

const calcMonth = (num) =>{

    switch(num){
        case 0: return 'Jan'
            
        case 1: return 'Feb'
        
        case 2: return 'Mar'
        
        case 3: return 'Apr'
        
        case 4: return'May'
        
        case 5: return'Jun'
        
        case 6: return'Jul'
        
        case 7: return'Aug'
        
        case 8: return'Sep'
        
        case 9: return'Oct'
        
        case 10: return'Nov'
        
        case 11: return'Dec'
        
        default: return 'Jan'
    }
}

export const getFullDate = (dt, tz) =>{
    
    const d = new Date()
    let day = calcDay(d.getDay(dt, tz))
    const date = d.getDate(dt, tz)
    let month = calcMonth(d.getMonth(dt, tz))

    return `${day} ${date < 10 ?'0':''}${date}, ${month}`

}

export const getDayName = (day) =>{
    return calcDay(day)
}

export const getMonthName = (month) =>{    
    return calcMonth(month)
}

export const getTime = (time, tz) =>{
    const date = new Date((time + tz)* 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    return `${hours % 12 || 12}:${minutes < 10 ?'0':''}${minutes} ${period}`;
}

export const mps_to_kmh= (mps) =>{
    const mph =mps * 3600;
    return mph / 1000;
}