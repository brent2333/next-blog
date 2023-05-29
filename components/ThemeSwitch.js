import {useState} from 'react'
import DarkTheme from './DarkTheme';
function loadDarkMode() {
    if (typeof localStorage === 'undefined') {
        return false;
    }
    const val = localStorage.getItem('darkMode');
    return (val === null) ? false : JSON.parse(val);
}
function ThemeSwitch() {
    const [darkMode, setDarkMode] = useState(loadDarkMode);
    const handleClick = () => {
        console.log('handleclick')
        localStorage.setItem('darkMode', JSON.stringify(!darkMode))
        setDarkMode(!darkMode)
    }
    const text = darkMode ? 'Light Mode' : 'Dark Mode';
    console.log(text)
    return (
        <>
       <button onClick={handleClick} suppressHydrationWarning>{text}</button> 
       <style jsx>{`
        button {
            background: none;
            border: none;
            cursor: pointer;
            color: inherit;
        }
       `}</style>
       {darkMode && <DarkTheme/>}

       </>
    )
}
export default ThemeSwitch;