import logo from '../components/Images/logo.png';
import defaultLogo from '../components/Images/default-logo.png';

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

    const colorInd = user===null? 0:user.id % COLORS.length
    const firstLetter=user===null? '?':user.username[0]
    return (
       <i className={`profile-icon ${COLORS[colorInd]}-bg`}>{firstLetter}</i> 
    )
}

export function timeDifference(previous) {
    console.log("previous", previous)
    previous = new Date(previous.slice(0, -4))
    let current = new Date(Date.now()+(new Date().getTimezoneOffset()*60000)).getTime();

    let elapsed = current - previous;
    console.log("current", current, "previous", previous, "current", current.toLocaleString(), "previous", previous.toLocaleString(), "elapsed", elapsed)
    
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;
    
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
