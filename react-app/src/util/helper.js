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