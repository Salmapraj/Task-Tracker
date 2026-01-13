import { useState, useEffect, useMemo } from 'react'
import { taskapi } from '../services/api'
import { all } from 'axios'

export function useTasks() {
  const [alltasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState(null)
  const [statusFilter, setStatusFilter] = useState('ALL')

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
      setLoading(true)
      seterror(null)
      const newTask = await taskapi.addTask(postData)
      setTasks(prev => [...prev, newTask])
    } catch (error) {
      seterror(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }
  //update task
  const updateTask = async (id, postData) => {
    try {
      setLoading(true)
      seterror(null)
      const taskupdate = await taskapi.updateTask(id, postData)
      setTasks(prev => prev.map(task => (task.id === id ? taskupdate : task)))
    } catch (error) {
      seterror(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async id => {
    try {
      setLoading(true)
      seterror(null)

      const delTask = await taskapi.deleteTask(id)
      setTasks(prev => prev.filter(task => task.id != id))
    } catch (error) {
      seterror(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  //filtering and sorting
  const changeFilter = status => {
    setStatusFilter(status)
    console.log('this is changed ',statusFilter)
  }

  const filteredTasks = useMemo(() => {

    if(statusFilter==='ALL') return alltasks;

   return alltasks.filter(task => task.status === statusFilter.toLowerCase())
   
  }, [statusFilter,alltasks])

  return {
    alltasks,
    fetchTasks,
    loading,
    error,
    addTask,
    updateTask,
    changeFilter,
    filteredTasks,
    deleteTask,
    statusFilter
  }
}
