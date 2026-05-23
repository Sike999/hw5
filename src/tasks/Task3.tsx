import { useCallback, useState, useEffect, useMemo } from "react"
import styles from '../styles/theme.module.css'
import { useTheme } from './Task1'


export default function Task3(){
    const [arr, setArr] = useState<number[]>(() => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    const [val,setVal] = useState<number>(0)
    
    const randomize = useCallback(() => {
        const newArr = arr.map(() => Math.ceil(Math.random() * 100))
        setArr(newArr)
    }, [])

    const getSum = useMemo(() => {
        let sum = 0
        arr.map((element) => {
            sum += element
        })
        return sum
    },[arr])

    useEffect(() => {
        console.log(arr)
    })
    useEffect(() => {
        console.log('Ререндер родителя прошел, массив остался тот же')
    },[val])
    const {theme} = useTheme()
    return(
        <div className={styles['marg']}>
            <h2>Задание 1.3</h2>
            <div>Сумма элементов равна {getSum}</div>
            <button className={styles[`${theme}-button`]} style={{width:"350px", marginRight:"20px", height:"40px"}} onClick={() => {randomize()}}>Пересоздать массив</button>
            <button className={styles[`${theme}-button`]} style={{width:"350px", marginLeft:"20px", height:"40px"}} onClick={() => {setVal(prev => (prev+1))}}>
                Сделать ререндер родителя
            </button>
        </div>
    )
}