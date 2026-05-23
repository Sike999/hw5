import React, { memo, useState, useCallback, useEffect } from 'react'
import styles from '../styles/theme.module.css'
import { useTheme } from './Task1'


export function NoCallback(){
    const [count,setCount] = useState<number>(0)
    const {theme} = useTheme()
    const increment = (setCount: React.Dispatch<React.SetStateAction<number>>) => {
        setCount(prev => (prev+1))
    }
    useEffect(() => {
        console.log('NoCallback инкремент функция пересоздалась')
    },[increment])
    return(
        <div className={`${styles.block} ${theme === 'light' ? styles['light-block'] : styles['dark-block']}`}>
            <div className={styles.blockTitle}>Без useCallback</div>
            <div className={styles.counter}>{count}</div>
            <button className={styles[`${theme}-button`]} onClick={() => increment(setCount)}>
                Увеличить
            </button>
            <div className={styles.description}>
                Функция создается заново<br />
                при каждом рендере
            </div>
        </div>
    )
}
export const WithCallback = memo(() => {
    const [count,setCount] = useState<number>(0)
    const {theme} = useTheme()
    const increment = useCallback((setCount: React.Dispatch<React.SetStateAction<number>>) => {
        setCount(prev => (prev+1))
    },[])
    useEffect(() => {
        console.log('WithCallback инкремент функция пересоздалась') // выведет только раз
    },[increment])
    return(
        <div className={`${styles.block} ${theme === 'light' ? styles['light-block'] : styles['dark-block']}`}>
            <div className={styles.blockTitle}>С useCallback</div>
            <div className={styles.counter}>{count}</div>
            <button className={styles[`${theme}-button`]} onClick={() => increment(setCount)}>
                Увеличить
            </button>
            <div className={styles.description}>
                Функция мемоизирована<br />
                и не пересоздается
            </div>
        </div>
    )
})
export default function Task2(){
    const [val,setVal] = useState<number>(0)
    const {theme} = useTheme()
    useEffect(() => {
        console.log('Ререндер родителя прошел')
    },[val])
    return(
        <div className={`${styles.task2}`}>
            <h2>Задание 1.2</h2>
            <div style={{display:"flex",gap:"40px"}}>
                <NoCallback />
                <WithCallback />
            <button className={styles[`${theme}-button`]} style={{width:"350px", height:"40px"}} onClick={() => {setVal(prev => (prev+1))}}>
                Сделать ререндер родителя
            </button>
            </div>
        </div>
    )
}