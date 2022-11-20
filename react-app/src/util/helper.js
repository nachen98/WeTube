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
    const colorInd = user.id % COLORS.length
    const firstLetter=user.username[0]
    return (
       <i className={`profile-icon ${COLORS[colorInd]}-bg`}>{firstLetter}</i> 
    )
}

export function formatDate(stringDate) {
     return stringDate.slice(0, -3)
}
export function timeDifference(current, previous) {
    
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    
    var elapsed = current - previous;
    
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
         return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }
    
    else if (elapsed < msPerYear) {
         return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    
    else {
         return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
