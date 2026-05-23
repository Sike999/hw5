import styles from '../styles/theme.module.css'
import { useTheme } from './Task1'
import { useState, useCallback, useMemo, useRef, useEffect} from 'react'
import Task5 from './Task5'

/* Немного не понял куда тут совать useMemo если мне не приходится вычислять значение фильтра, я просто читаю value. мне надо было придумать алгоритм вычисления какой то? */
export default function Task7(){
    const { theme } = useTheme()
    const [rule,setRule] = useState('none')
    const selectRef = useRef(null)

    const filter = useCallback((data,rule) => {

        let result = [...data]

        if (rule === 'active'){
            return result.filter((task) => (task.status === 'active'))
        }
        if (rule === 'done'){
            return result.filter((task) => (task.status === 'done'))
        }
        if (rule === 'A-Z'){
            return result.sort((a,b) => (a.taskHead.localeCompare(b.taskHead)))
        }
        if (rule === 'Z-A'){
            return result.sort((a,b) => (b.taskHead.localeCompare(a.taskHead)))
        }
        if(rule === 'none') {
            return result
        }
        return result
    },[])
    return(
        <>
            <h2>Задание 1.7</h2>
            <div>
                    <div className={`${styles[`${theme}-filter`]} filter`}>
                        <span style={{ marginRight: '10px' }}>Фильтр:</span>
                        <select ref={selectRef} onChange={() => (setRule(selectRef.current.value))} className={`${styles.select} ${styles[`${theme}-select`]}`}>
                            <option value="none">Без фильтра</option>
                            <option value="active">Активные задачи</option>
                            <option value="done">Готовые задачи</option>
                            <option value="A-Z">По алфавиту</option>
                            <option value="Z-A">Не по алфавиту</option>
                        </select>
                    </div>
                <Task5 filter={filter} rule={rule}/>
            </div>
        </>
    )
}
