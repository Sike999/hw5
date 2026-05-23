import { useState, useCallback } from 'react'
import ContextTask, {Task1} from './tasks/Task1'
import Task2 from './tasks/Task2'
import Task3 from './tasks/Task3'
import Task4 from './tasks/Task4'
import Task5 from './tasks/Task5'
import Task6 from './tasks/Task6'
import Task7 from './tasks/Task7'
import Task8 from './tasks/Task8'
import Task9 from './tasks/Task9'

const a = [1,2,3,4,5,6,7,8,9]
function App() {
  const [task, setTask] = useState('task1')
  const changeTask = useCallback(() => {
    switch(task){
      case 'task1': {
        return(<Task1/>)
      }
      case 'task2': {
        return(<Task2/>)
      }
      case 'task3': {
        return(<Task3/>)
      }
      case 'task4': {
        return(<Task4/>)
      }
      case 'task5': {
        return(<Task5/>)
      }
      case 'task6': {
        return(<Task6/>)
      }
      case 'task7': {
        return(<Task7/>)
      }
      case 'task8': {
        return(<Task8/>)
      }
      case 'task9': {
        return(<Task9/>)
      }
      case 'task10': {
        return(<Task10/>)
      }
      default: return(<Task1/>)
    }
  })
  return (
    <ContextTask>
        <div style={{display:"flex", gap:"16px",margin:"40px 5px"}}>
          {a.map((i) => {
            return (
              <div onClick={() => {setTask(`task${i}`)}} style={{ cursor:"pointer",alignContent:"center",border:"1px solid #381212", borderRadius:"14px", width:"200px", height:"50px"}}>{`Task${i}`}</div>
            )
          })}
        </div>
        {changeTask()}
    </ContextTask>
  )
}

export default App
