import { useState } from 'react'
import { Plus } from 'lucide-react'
import SearchBar from './SearchBar'
import Tasks from './TaskHeader'
import { useTasks } from '../hooks/useTasks'
import TaskModal from './TaskForm'
const Dashboard = () => {
  const [showTask, setShowTask] = useState('ALL')
  const { addTask: createTask,alltasks, updateTask, deleteTask, fetchTasks,filterTask } = useTasks()
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const handleTaskSubmit = async (formData) => {
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
  const copiedArray =[...alltasks]
  const sortedDate = copiedArray.sort((a,b)=>new Date(b.dueDate).getTime()-new Date(a.dueDate).getTime() )
console.log('sorted array',sortedDate)

  const handleStatus =async (status) => {
    try {
      setShowTask(status)
      if(status==='ALL'){
        await fetchTasks()
      }else {
    await filterTask(status.toLowerCase())
  }

    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <div className="bg-[#f8fbfd] min-h-screen  flex flex-col w-full">
      <div className="shadow-xs">
        <SearchBar />
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
                onClick={()=>handleStatus(status)}
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

        {/* main content */}
        <Tasks
          fetchedTasks={copiedArray}
          onUpdate={task => {
            setSelectedTask(task)
            setIsModelOpen(true)
          }}
          onDelete={deleteTask}
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
