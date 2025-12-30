import { Pencil, Trash2 } from 'lucide-react'

const Tasks = ({fetchedTasks,onUpdate,onDelete}) => {

  return (
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
            <button onClick={() => {onUpdate(task)}}>
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
