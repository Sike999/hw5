import styles from '../styles/theme.module.css'
import { useTheme } from './Task1'
import { useEffect, useRef, useState } from 'react'

export default function Task8() {
    // давать стейт каждому полю внутри формы это миллион копипаста, каждый ввод в инпут тригерит ререндер, 
    // а еще контролируемые инпуты не позволяют прикрепить файл
    const { theme } = useTheme() 
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [passConfirm,setPassConfirm] = useState('')
    const [role,setRole] = useState('')
    const [check,setCheck] = useState(false)
    let errors = useRef([])
    let rerenderCount = useRef(0)

    useEffect(() => {
        rerenderCount.current+=1
    })

    const handleSubmit = () => {  // миллион if это нечитаемый и нерациональный подход
        errors.current = []
        if(!email.includes('@')) {
            errors.current.push('Почта неверна')
        }
        if(name === '') {
            errors.current.push('Введите имя')
        }
        if(surname === '') {
            errors.current.push('Введите фамилию')
        }
        const regex = new RegExp(pass)
        if(!regex.test(passConfirm)) {
            errors.current.push('Пароли не совпадают')
        }
        if(role === '') {
            errors.current.push('Выберите роль')
        }
        if(check === false){
            errors.current.push('ГАЛОЧКУ')
        }
        if(errors.current.length === 0){
            console.log('Зарегистрирован')
        }
        if(errors.current.length !== 0){
            alert(errors.current.join('\n'))
        }
    }

    return (
        <div className={styles.task8Container}>
            <h2>Задание 2.1. Плохая форма</h2>
            <h3>Ререндеров: {rerenderCount.current}</h3>
            <form className={`${styles.task8Form} ${styles[`task8Form-${theme}`]}`} onSubmit={(e)=>{e.preventDefault()}}>
                <div className={styles.task8Row}>
                    <div className={styles.task8InputGroup}>
                        <label className={styles.task8Label}>Имя</label>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Введите имя" className={`${styles.task8Input} ${styles[`task8Input-${theme}`]}`}/>
                    </div>
                    <div className={styles.task8InputGroup}>
                        <label className={styles.task8Label}>Фамилия</label>
                        <input value={surname} onChange={(e)=>{setSurname(e.target.value)}} type="text" placeholder="Введите фамилию" className={`${styles.task8Input} ${styles[`task8Input-${theme}`]}`}/>
                    </div>
                </div>
                <div className={styles.task8InputGroup}>
                    <label className={styles.task8Label}>Email</label>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="example@mail.ru" className={`${styles.task8Input} ${styles[`task8Input-${theme}`]}`}/>
                </div>
                <div className={styles.task8InputGroup}>
                    <label className={styles.task8Label}>Пароль</label>
                    <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password" placeholder="••••••••" className={`${styles.task8Input} ${styles[`task8Input-${theme}`]}`}/>
                </div>
                <div className={styles.task8InputGroup}>
                    <label className={styles.task8Label}>Подтверждение пароля</label>
                    <input value={passConfirm} onChange={(e)=>{setPassConfirm(e.target.value)}} type="password" placeholder="Повторите пароль" className={`${styles.task8Input} ${styles[`task8Input-${theme}`]}`}/>
                </div>
                <div className={styles.task8InputGroup}>
                    <label className={styles.task8Label}>Роль</label>
                    <select value={role} onChange={(e)=>{setRole(e.target.value)}} className={`${styles.task8Select} ${styles[`task8Select-${theme}`]}`}defaultValue="">
                        <option value="" disabled>Выберите роль</option>
                        <option value="student">Студент</option>
                        <option value="teacher">Преподаватель</option>
                    </select>
                </div>
                <div className={styles.task8CheckboxGroup}>
                    <label className={styles.task8CheckboxLabel}>
                        <input checked={check} onChange={()=>{setCheck(prev=>!prev)}} type="checkbox" className={styles.task8Checkbox} />
                        <span className={styles.task8CheckboxText}>Принимаю условия</span>
                    </label>
                </div>
                <button type="submit" onClick={() => {handleSubmit()}} className={`${styles.task8Button} ${styles[`task8Button-${theme}`]}`}>Зарегистрироваться</button>
            </form>
        </div>
    )
}