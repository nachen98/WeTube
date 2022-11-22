import logo from '../components/Images/logo.png';
import defaultLogo from '../components/Images/default-logo.png'
export const onLoadImg = (e) => {
    e.target.className = e.target.className + ' loading-img';
    e.target.src = logo;
    return;
}

export const onErrorLoadDiscLogoHandler = (e) => {
    e.target.className = e.target.className + ' default-err-img'
    e.target.src = defaultLogo;
    return;
}

export const getProfileIcon=(user)=>{
    const COLORS = ['red', 'green', 'purple', 'blue', 'yellow', 'gray']
    console.log(user, "user##################")
    const colorInd = user.id % COLORS.length
    const firstLetter=user.username[0]
    return (
       <i className={`profile-icon ${COLORS[colorInd]}-bg`}>{firstLetter}</i> 
    )
}

export function formatDate(stringDate) {
     console.log(stringDate, "DATE@@@@@@@@@@@@@@@@@@@")
     if(stringDate===undefined)
          stringDate = new Date().toDateString()
     return stringDate.slice(0, -3)
}
export function timeDifference(current, previous) {
    
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;
    
    let elapsed = current - previous;
    
    if (elapsed <= 10000) return "just now";

    else if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }
    
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerDay) + ' days ago';   
    }
    
    else if (elapsed < msPerYear) {
         return Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    
    else {
         return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
