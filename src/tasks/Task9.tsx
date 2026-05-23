import styles from '../styles/theme.module.css'
import { useTheme } from './Task1'
import { useRef, useEffect, useCallback, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { schema, type FormData } from '../schema'

async function fakeApi(data: FormData,setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>):Promise<void>{
    await new Promise(resolve => setTimeout(() => {
        setIsSuccess(true)
        resolve()
    },2000))
    if (data.email.includes('taken@')) {
    return Promise.reject( new Error('email занят!')) }
}



export default function Task9(){

   const {theme} = useTheme()
   const [isSuccess, setIsSuccess] = useState<boolean>(false)
   const rerenderCount = useRef(0)
   const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
    reset
   } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode:'onSubmit'
   })

   const submit = useCallback(async (data: FormData) => {
    setIsSuccess(false)
        try {
            await fakeApi(data,setIsSuccess)
            reset()
        }
        catch(e) {
            setError('email',{message: 'Email уже занят!'})
            setIsSuccess(false)
        }
    },[reset,setError])

    useEffect(() =>{
        rerenderCount.current+=1
    })

    return (
        <div className={styles.task8Container}>
            <h2>Задание 2.2. Хорошая форма</h2>
            <h3>Ререндеров: {rerenderCount.current}</h3>
            <form onSubmit={handleSubmit(submit)} className={`${styles.task8Form} ${styles[`task8Form-${theme}`]}`} >
                {isSuccess && (<span style={{color:"#91db96",}}>Регистрация успешна</span>)}
                <div className={styles.task8Row}>
                    <div className={styles.task8InputGroup}>
                        <label className={styles.task8Label}>Имя</label>
                        <input type="text" aria-invalid={!!errors.firstName} aria-describedby="firstName-error" {...register('firstName')}
                            className={`${styles.task8Input} ${styles[`task8Input-${theme}`]}`}/>
                            {errors.firstName && (
                                <span id="firstName-error" role="alert" style={{color:"red"}}>
                                    {errors.firstName.message}
                                </span>
                            )}
                    </div>
                    <div className={styles.task8InputGroup}>
                        <label className={styles.task8Label}>Фамилия</label>
                        <input type="text" aria-invalid={!!errors.lastName} aria-describedby="lasName-error" {...register('lastName')}
                            className={`${styles.task8Input} ${styles[`task8Input-${theme}`]}`}/>
                            {errors.lastName && (
                                <span id="lastName-error" role="alert" style={{color:"red"}}>
                                    {errors.lastName.message}
                                </span>
                            )}
                    </div>
                </div>
                <div className={styles.task8InputGroup}>
                    <label className={styles.task8Label}>Email</label>
                    <input type="text" aria-invalid={!!errors.email} aria-describedby="email-error" {... register('email')}
                        className={`${styles.task8Input} ${styles[`task8Input-${theme}`]}`}/>
                        {errors.email && (
                            <span id="email-error" role="alert" style={{color:"red"}}>
                                {errors.email.message}
                            </span>
                        )}
                </div>
                <div className={styles.task8InputGroup}>
                    <label className={styles.task8Label}>Пароль</label>
                    <input type="password" aria-invalid={!!errors.password} aria-describedby="password-error" {...register('password')}
                        className={`${styles.task8Input} ${styles[`task8Input-${theme}`]}`}/>
                        {errors.password && (
                            <span id="password-error" role="alert" style={{color:"red"}}>
                                {errors.password.message}
                            </span>
                        )}
                </div>
                <div className={styles.task8InputGroup}>
                    <label className={styles.task8Label}>Подтверждение пароля</label>
                    <input type="password" aria-invalid={!!errors.confirmPassword} aria-describedby="confirmPassword-error" {...register('confirmPassword')}
                        className={`${styles.task8Input} ${styles[`task8Input-${theme}`]}`}/>
                        {errors.confirmPassword && (
                            <span id="confirmPassword-error" role="alert" style={{color:"red"}}>
                                {errors.confirmPassword.message}
                            </span>
                        )}
                </div>
                <div className={styles.task8InputGroup}>
                    <label className={styles.task8Label}>Роль</label>
                    <select aria-invalid={!!errors.roles} aria-describedby="roles-error" {...register('roles')} 
                        className={`${styles.task8Select} ${styles[`task8Select-${theme}`]}`} defaultValue=""
                    >
                        <option value="" disabled>Выберите роль</option>
                        <option value="Студент">Студент</option>
                        <option value="Лектор">Лектор</option>
                        <option value="Ментор">Ментор</option>
                    </select>
                    {errors.roles && (
                        <span id="roles-error" role="alert" style={{color:"red"}}>
                            {errors.roles.message}
                        </span>
                    )}
                </div>
                <div className={styles.task8CheckboxGroup}>
                    <label className={styles.task8CheckboxLabel}>
                        <input type="checkbox" aria-invalid={!!errors.agreement} aria-describedby="agreement-error" {...register('agreement')} 
                            className={styles.task8Checkbox} />
                            
                        <span className={styles.task8CheckboxText}>Принимаю условия</span>
                        {errors.agreement && (
                        <span id="agreement-error" role="alert" style={{color:"red"}}>
                            {errors.agreement.message}
                        </span>
                    )}
                    </label>
                </div>
                <button type="submit" disabled={isSubmitting} className={isSubmitting ? `${styles.disabledButton}` 
                : `${styles.task8Button} ${styles[`task8Button-${theme}`]}` }>{isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}</button>
            </form>
        </div>
    )
}