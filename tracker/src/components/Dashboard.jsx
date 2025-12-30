import { useState } from 'react'
import { Plus } from 'lucide-react'
import SearchBar from './SearchBar'
import Tasks from './TaskHeader'
import { useTasks } from '../hooks/useTasks'
import TaskModal from './TaskForm'
const Dashboard = () => {
  const [showTask, setShowTask] = useState('ALL')
  const { addTask: createTask, alltasks, updateTask, deleteTask, loading } = useTasks()
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

  const toggleTaskStatus = task => {
  const newStatus = task.status === 'pending' ? 'done' : 'pending'

  updateTask(task.id, {
    ...task,
    status: newStatus,
  })
}

  let copiedTasks = [...alltasks]

  //search
  if (searchQuery.trim()) {
    copiedTasks = copiedTasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }
  copiedTasks.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())

  //filter
  if (showTask !== 'ALL') {
    copiedTasks = copiedTasks.filter(task => task.status === showTask.toLowerCase())
  }

  const handleStatus = status => {
    setShowTask(status)
  }

  return (
    <div id='dashboard' className="bg-[#f8fbfd] min-h-screen  flex flex-col w-full">
      <div className="shadow-xs">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <div className=" bg-white h-full my-5  px-4 shadow-sm py-3 mt-8 mx-12 rounded-lg">
        {/* //header */}
        <div className="p-6 flex mb-5 border-b border-gray-200 justify-between items-start">
          <div>
            <h2 className=" text-md font-bold md:text-xl text-purple-700 lg:text-3xl mb-2">
              Workspace Tasks
            </h2>
            <p className="text-sm  text-gray-500 md:text-md lg:text-[17px]">
              Manage and track your active projects
            </p>{' '}
          </div>

          <div className=" flex  gap-3 rounded-lg shadow-sm">
            {['ALL', 'PENDING', 'DONE'].map(status => (
              <button
                className={`px-3 cursor-pointer ${showTask.toUpperCase() === status ? 'text-purple-700  shadow-sm px-4 text-sm py-2 font-bold   rounded-xl ' : 'text-gray-400 text-sm py-2 font-bold   hover:text-gray-900'}`}
                key={status}
                onClick={() => handleStatus(status)}
              >
                {status}
              </button>
            ))}

            <div className="ml-3">
              <div
                onClick={() => {
                  setIsModelOpen(true)
                  setSelectedTask(null)
                }}
                className="bg-purple-700 p-2 rounded-lg"
              >
                <Plus size={27} className="text-white" />
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading tasks...</p>
          </div>
        ) : copiedTasks.length === 0 ? (
          // Show empty state when no tasks found
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No tasks found</h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No tasks match "${searchQuery}"`
                : showTask !== 'ALL'
                  ? `No ${showTask.toLowerCase()} tasks`
                  : 'Create your first task to get started'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-purple-700 hover:text-purple-800 font-semibold"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          // Show tasks when data exists
          <Tasks
            fetchedTasks={copiedTasks}
            onUpdate={task => {
              setSelectedTask(task)
              setIsModelOpen(true)
            }}
            onDelete={deleteTask}
  onToggleStatus={toggleTaskStatus}


          />
        )}
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
