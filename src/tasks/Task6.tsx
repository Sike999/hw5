import styles from '../styles/theme.module.css'
import { useTheme } from './Task1'
import { useState, useCallback, memo, useEffect} from 'react'
export default function Task6() {
    const {theme} = useTheme()
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        console.log('Родительский компонент отрендерился')
    })
    const actionCallback = useCallback(() => {
        setFlag(prev => !prev)
    },[])
    const action = () => {
        setFlag(prev => !prev)
    }
    return(
        <div className={`${styles['marg']} ${styles[`${theme}-divBorder`]}`} >
        <h2>Задание 1.6</h2>
        <h3>Компонент родитель</h3>
        <p>Ререндер компонента с memo, но без useCallback происходит потому что в него передается нестабильная ссылка на функцию: каждый раз когда родитель рендерится, создается новая функция, ссылка на нее меняется и пропс компонента соответствено тоже, что в свою очередь тригерит ререндер потому что memo принимает решение о ререндере на основе того, менялись ли пропсы. useCallback решает проблему пересоздания функций и ререндер не наблюдается</p>
        <h3>{flag ? 'true' :'false' }</h3>
        <button style={{width:"400px"}} onClick={() => {setFlag(prev => !prev)}} className={styles[`${theme}-button`]}>Перерендерить родителя</button>
            <Comp action={action}/>
            <CompMemo action={action}/>
            <CompCallbackMemo action={actionCallback}/>
        </div>
    )
}
const CompCallbackMemo = memo(function CompCallbackMemo({action}) {
    useEffect(() => {
        console.log('Дочерний компонент c колбеком и memo отрендерился') // ЭТОМУ ПЕРЦУ ВАЩЕ ПОФИГ!!!
    })
    const {theme} = useTheme()
    
    return(
        <div style={{width:"400px"}} className={`${styles['marg']} ${styles[`${theme}-divBorder`]}`} >
            <h3>Дочерний компонент, колбек мемоизирован + React memo</h3>
            <button onClick={() => {action()}} className={styles[`${theme}-button`]}>Перерендерить родителя</button>
        </div>
    )
})
const Comp = ({action}) => {
    useEffect(() => {
        console.log('Дочерний компонент без колбека и без memo отрендерился')
    })
    const {theme} = useTheme()
    return(
        <div style={{width:"400px"}} className={`${styles['marg']} ${styles[`${theme}-divBorder`]}`} >
            <h3>Дочерний компонент без колбека и без memo</h3>
            <button onClick={() => {action()}} className={styles[`${theme}-button`]}>Перерендерить родителя</button>
        </div>
    )
}

const CompMemo = memo(function CompCallbackMemo({action}) {
    useEffect(() => {
        console.log('Дочерний компонент без колбека но с memo отрендерился')
    })
    const {theme} = useTheme()
    
    return(
        <div style={{width:"400px"}} className={`${styles['marg']} ${styles[`${theme}-divBorder`]}`} >
            <h3>Дочерний компонент без колбека но с memo</h3>
            <button onClick={() => {action()}} className={styles[`${theme}-button`]}>Перерендерить родителя</button>
        </div>
    )
})