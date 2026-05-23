import { useState, createContext, useContext, useEffect, useCallback } from 'react'
import type { ThemeType } from '../Types'
import type { ReactNode } from 'react'
import { CiLight,CiDark } from "react-icons/ci"
import styles from '../styles/theme.module.css'


const ThemeContext = createContext<ThemeType | null>(null)

function useTheme() {
  return useContext(ThemeContext)
}
export default function ContextTask({ children }: { children: ReactNode }) {
  
  const getInitialTheme = useCallback((): 'light' | 'dark' => {
    const saved = localStorage.getItem('theme')
    if(saved === 'light' || saved === 'dark'){
      return saved
    }
    return 'dark'
  },[])

  const [theme,setTheme] = useState<'light' | 'dark'>(getInitialTheme)

  useEffect(() => {
    const root = document.getElementById('root')
        if (root) {
            root.className = theme
        }
    localStorage.setItem('theme',theme)
  },[theme])

  return(
    <ThemeContext value={ {theme, setTheme} }>
      {children}
    </ThemeContext>
  )
}
export function Task1(){
  const {theme, setTheme} = useTheme()
  return(
    <div className={styles.task1}>
    <h2>Задание 1.1</h2>
    <p>Работает на весь проект</p>
    <div className={styles.togglerDiv}>
      <span className={styles[`${theme}-span`]}>Текущая тема</span><button className={`${styles[`${theme}-button`]} ${styles[`${`toggler`}`]}`} onClick={() => {setTheme(theme === 'light' ? 'dark' : 'light')}}>{theme === 'light' ? <CiLight color='black'/> : <CiDark/>}</button>
    </div>
    </div>
  )
}
export {useTheme}