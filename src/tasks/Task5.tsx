import styles from '../styles/theme.module.css'
import { useTheme } from './Task1'
import { useState, useReducer } from 'react'
import type {TodoTask} from '../Types'

const data: TodoTask[] = [
    {
        id:1,
        taskHead:'А',
        task:'зызыззеу',
        status:'active'
    },
    {
        id:2,
        taskHead:'В',
        task:'зызыззеу',
        status:'done'
    },
    {
        id:3,
        taskHead:'Б',
        task:'зызыззеу',
        status:'active'
    }
]

function reducer(tasks, action){
    if(action.type === "toggle"){
        return tasks.map((t) => {
            if (t.id === action.id){
                return {
                    ...t, status: t.status === 'done' ? 'active' : 'done'
                }
            }
            return t
        })
    }
    if(action.type === 'add'){
        return [
            ...tasks,
            {id:action.id,taskHead:action.taskHead,task:action.task,status:'active'}
        ]
    }
    if(action.type === 'delete'){
        return tasks.filter((t) => t.id !== action.id)
    }
    return tasks
}

export default function Task5({filter,rule}){
    const { theme } = useTheme()
    const [tasks, dispatch] = useReducer(reducer,data)
    const [nextId,setNextId] = useState(data.length + 1)
    const [headValue,setHeadValue] = useState('')
    const [taskValue,setTaskValue] = useState('')

    let filtered = tasks //для задания 1.7
    if (typeof filter === 'function') {
        filtered = filter(tasks, rule)
    }

    const handleAdd = (head,text) => {
        if (!head.trim() || !text.trim()) return 
        setNextId(prev => prev+1)
        dispatch({type:'add',id:nextId,taskHead:head,task:text})
        setHeadValue('')
        setTaskValue('')
    }

    const handleDelete = (id) => {
        dispatch({type:'delete',id:id})
    }

    const handleToggle = (id) => {
        dispatch({type:'toggle',id:id})
    }

    return(
        <div className={styles['marg']}>
            <h2>Задание 1.5</h2>
            <div className={styles[`${theme}-taskContainer`]}>
                <input type="text" value={taskValue} onChange={(e) => {setTaskValue(e.target.value)}} className={`${styles.input} ${styles[`${theme}-input`]}`}/>
                <input type="text" value={headValue} onChange={(e) => {setHeadValue(e.target.value)}} className={`${styles.input} ${styles[`${theme}-input`]}`}/>
                <button onClick={() => {handleAdd(headValue,taskValue)}} className={styles[`${theme}-button`]} >Добавить</button>
                {filtered.map((task) => {
                    return(
                    <div key={task.id} className={styles.taskCard}>
                        <h4 className={styles.taskHead}>{task.taskHead}</h4>
                        <p className={styles.taskDescription}>{task.task}</p>
                        <small style={{color:"#FFF"}} className={`${styles.taskStatus} ${styles[`status-${task.status}`]}`}>{task.status}</small>
                        <button onClick={() => {handleToggle(task.id)}} className={styles[`${theme}-button`]} >Переключить статус</button>
                        <button onClick={() => {handleDelete(task.id)}} className={styles[`${theme}-button`]} >Удалить</button>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}