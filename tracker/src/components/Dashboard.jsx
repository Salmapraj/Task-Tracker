import { useState } from 'react'
import { Plus } from 'lucide-react'
import SearchBar from './SearchBar'
import Tasks from './TaskHeader'
import { useTasks } from '../hooks/useTasks'
import TaskModal from './TaskForm'
const Dashboard = () => {
  const {
    addTask: createTask,
    alltasks,
    updateTask,
    deleteTask,
    loading,
    filteredTasks,
    statusFilter,
    changeFilter,
  } = useTasks()
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const handleTaskSubmit = async formData => {
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, formData)
      } else {
        await createTask(formData)
      }
      setSelectedTask(null)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <div id="dashboard" className="bg-[#f8fbfd] min-h-screen  flex flex-col w-full">
      <div className="shadow-xs">
        <SearchBar />
      </div>
      <div className=" bg-white h-full my-5  px-4 shadow-sm py-3 mt-8 mx-12 rounded-lg">
        <Tasks
          fetchedTasks={filteredTasks}
          onUpdate={task => {
            setSelectedTask(task)
            setIsModelOpen(true)
          }}
          onDelete={deleteTask}
          onChange={changeFilter}
          statusFilter={statusFilter}
        />
      </div>

      {isModelOpen && (
        <TaskModal
          setModel={setIsModelOpen}
          initialTask={selectedTask}
          onFormSubmit={handleTaskSubmit}
        />
      )}
    </div>
  )
}

export default Dashboard
