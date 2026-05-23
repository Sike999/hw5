import styles from '../styles/theme.module.css'
import { useTheme } from './Task1'
import { useState, useRef,useEffect } from 'react'


export default function Task4(){
    const { theme } = useTheme()

    const inputRef = useRef(null)
    const lastVal = useRef('')
    const [text,setText] = useState('')

    return(
        <div className={styles['marg']}>
            <h2>Задание 1.4</h2>
            <input type="text" ref={inputRef} onChange={(e) => {setText(e.target.value);lastVal.current = e.target.value}} className={`${styles.input} ${styles[`${theme}-input`]}`}/>
            <button onClick={() => {inputRef.current.focus()}} className={styles[`${theme}-button`]} style={{width:"150px", marginLeft:"20px", height:"40px"}}>Фокус</button>
            <div>{lastVal.current}</div>
        </div>
    )
}