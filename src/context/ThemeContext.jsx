import React,{createContext,useContext,useEffect,useState} from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext()

export function useTheme(){
    return useContext(ThemeContext)
}

export function ThemeProvider({children}){
    const colorScheme = Appearance.getColorScheme()

    const[theme,setTheme] = useState(colorScheme || 'light')

    const toggleTheme = ()=>{
        setTheme((value)=>value==='light'?'dark':'light')
    }

    const themeColors = {
        light:{
            background:'#fff',
            text:'#000',
            button:'#099302',
            buttonText:'#fff',
            border:'#000',
            titulo: '#fff',
            popUp: '#E4E4E4FF'
        },
        dark:{
            background:'#373737',
            text:'#fff',
            button:'#099302',
            buttonText:'#000',
            border:'#fff',
            titulo: '#373737',
            popUp: '#272727'
        }
    }
  
    return(
        <ThemeContext.Provider value={{toggleTheme,colors:themeColors[theme]}}>
            {children}
        </ThemeContext.Provider>
    )
}
