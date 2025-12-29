import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import SearchBar from './SearchBar'
import { useTasks } from '../hooks/useTasks'

const Dashboard = () => {
  const [showTask, setShowTask] = useState('All')
  const [addTask, setAddTask] = useState(false)
  const { tasks: fetchedTasks} = useTasks()
  const [task, setTask] = useState('')
  const [status, setStatus] = useState('pending')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = e => {
    const formData = {
      title:task,
      dueDate,
      status:status.toLowerCase()
    }
    console.log(formData)
    e.preventDefault()

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
            {['All', 'Pending', 'Done'].map(status => (
              <button
                className={`px-3 py-2 cursor-pointer ${showTask === status ? 'text-purple-700 font-semibold shadow-sm px-4  rounded-xl ' : 'text-gray-400 hover:text-gray-900'}`}
                key={status}
                onClick={() => setShowTask(status)}
              >
                {status}
              </button>
            ))}
            <div className="ml-3">
              <div onClick={() => setAddTask(true)} className="bg-purple-700 p-2 rounded-lg">
                <Plus size={27} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* main content */}
        <div className=" shadow-xs ">
          <div className="grid mx-6 bg-[#fafdfd]  grid-cols-4 text-sm font-bold py-5 rounded-xl px-3 text-gray-400">
            <div className=" ">
              <h2>TASK</h2>
            </div>
            <div className="">
              <h2>STATUS</h2>
            </div>
            <div className="">
              <h2>DUE DATE</h2>
            </div>
            <div className="">
              <h2>ACTIONS</h2>
            </div>
          </div>
          <hr className="text-gray-200" />
          {fetchedTasks.map(task => (
            <div
              key={task.id}
              className="grid border-b border-gray-200  py-2 mx-6 px-4 gap-3 space-y-3 mt-5 grid-cols-4 text-sm "
            >
              <div>
                <p className="text-[17px] text-gray-500 font-semibold">{task.title}</p>
              </div>
              <div className="">
                <p
                  className={
                    task.status === 'pending'
                      ? 'text-green-600 font-semibold bg-[#ddfde7] rounded-lg  inline p-2'
                      : 'text-blue-600 font-semibold rounded-lg bg-blue-100  inline p-2'
                  }
                >
                  {task.status.toLowerCase()}
                </p>
              </div>
              <div>
                <p className="text-[15px] text-gray-500 font-semibold">
                  {new Date(task.dueDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                  })}
                </p>
              </div>
              <div className="flex gap-6">
                <button>
                  <Pencil size={18} className="text-gray-500 cursor-pointer" />
                </button>
                <button>
                  <Trash2 size={18} className="text-gray-500 cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {addTask && (
        <div
          className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setAddTask(false)}
        >
          <div
            className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl p-8"
            onClick={e => e.stopPropagation()} // Prevents closing when clicking inside modal
          >
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold mb-6 text-gray-600">New Task</h1>
              <div className="mb-4">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-2 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={task}
                  onChange={e => setTask(e.target.value)}
                  required
                  placeholder="Task Title"
                  className="p-3 w-full text-gray-600 rounded-md border-2 border-gray-300 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-2 mb-2">
                  Due Date
                </label>
                <input
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  type="date"
                  required
                  className="p-3 w-full rounded-md border-2  text-gray-600 border-gray-300 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50  text-gray-600 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:bg-white outline-none"
                >
                  <option>Pending</option>
                  <option>Done</option>
                </select>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setAddTask(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
