import { useState, useEffect, use } from 'react'
import { taskapi } from '../services/api'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState(null)

  //fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        seterror(null)
        const data = await taskapi.getallTasks()
        if (data) {
          setTasks(data)
        }
      } catch (error) {
        seterror(error.message)
        console.log('error fetching', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  //addtasks
 const addTask = async (postData) => {
  try {
    const newTask = await taskapi.addTask(postData);
    setTasks([...tasks,newTask])
    return newTask;
  } catch (error) {
    seterror(error.message)
    throw error;
  }

  //update task 
  const updateTask= async()=>{
    try {
        
    } catch (error) {
        
    }
  }
}



return {tasks,loading,error,addTask}
}


