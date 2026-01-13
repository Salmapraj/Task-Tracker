import { Pencil, Trash2, CircleCheck } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'

const Tasks = ({ fetchedTasks, onUpdate, onDelete, onToggleStatus,onChange,statusFilter }) => {
  return (
    <div id="tasks" className=" shadow-xs ">

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
                      className={`px-3 cursor-pointer ${statusFilter.toUpperCase() === status ? 'text-purple-700  shadow-sm px-4 text-sm py-2 font-bold   rounded-xl ' : 'text-gray-400 text-sm py-2 font-bold   hover:text-gray-900'}`}
                      key={status}
                      onClick={() => onChange(status)}
                    >
                      {status}
                    </button>
                  ))}
      
                  {/* <div className="ml-3">
                    <div
                      onClick={() => {
                        setIsModelOpen(true)
                        setSelectedTask(null)
                      }}
                      className="bg-purple-700 p-2 rounded-lg"
                    >
                      <Plus size={27} className="text-white" />
                    </div>
                  </div> */}
                </div>
              </div>



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
          <div className="flex gap-4 items-center">
            <button onClick={() => onToggleStatus(task)}>
              <CircleCheck
                size={22}
                className={
                  task.status === 'done' ? 'text-green-600' : 'text-gray-300 hover:text-green-500'
                }
              />
            </button>

            <p
              className={`text-[17px] font-semibold ${
                task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-500'
              }`}
            >
              {task.title}
            </p>
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
            <button
              onClick={() => {
                onUpdate(task)
              }}
            >
              <Pencil size={18} className="text-gray-500 cursor-pointer" />
            </button>
            <button onClick={() => onDelete(task.id)}>
              <Trash2 size={18} className="text-gray-500 cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Tasks
