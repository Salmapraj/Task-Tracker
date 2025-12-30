import { useState, useEffect, use } from 'react'
import { taskapi } from '../services/api'

export function useTasks() {
  const [alltasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState(null)

  //fetch all tasks

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

  useEffect(() => {
    fetchTasks()
  }, [])

  //addtasks
  const addTask = async postData => {
    try {
      const newTask = await taskapi.addTask(postData)
      setTasks(prev => [...prev, newTask])
    } catch (error) {
      seterror(error.message)
      throw error
    }
  }
  //update task
  const updateTask = async (id, postData) => {
    try {
      const taskupdate = await taskapi.updateTask(id, postData)
      setTasks(prev => prev.map(task => (task.id === id ? taskupdate : task)))
    } catch (error) {
      seterror(error.message)
      throw error
    }
  }

  const deleteTask = async id => {
    try {
      const delTask = await taskapi.deleteTask(id)
      setTasks(prev => prev.filter(task => task.id != id))
    } catch (error) {
      seterror(error.message)
      throw error
    }
  }

  const filterTask = async status => {
    try {
      setLoading(true)
      const filter = await taskapi.filterTask(status)
      setTasks(filter)
    } catch (error) {
      seterror(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { alltasks, fetchTasks, loading, error, addTask, updateTask, deleteTask, filterTask }
}
