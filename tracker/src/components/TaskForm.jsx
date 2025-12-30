import { useState, useEffect } from 'react'

const TaskModal = ({ setModel, initialTask=null, onFormSubmit}) => {
  const [task, setTask] = useState('')
  const [status, setStatus] = useState('pending')
  const [dueDate, setDueDate] = useState('')
  const formData = {
    title: task,
    dueDate,
    status: status.toLowerCase(),
  }

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask.title)
      setStatus(initialTask.status)
      setDueDate(initialTask.dueDate.split('T')[0]) // Format date for input
    }
  }, [initialTask])

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    try {
      await onFormSubmit(formData)
      setModel(false)
    } catch (error) {
      console.log('Error submitting task:', error)
    }
  }

  const isEditing = !!initialTask

  return (
    <div>
      <div
        className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4"
        onClick={() => setModel(false)}
      >
        <div
          className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl p-8"
          onClick={e => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-6 text-gray-600">
              {isEditing ? 'Edit Task' : 'New Task'}
            </h1>
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
                onClick={() => setModel(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800"
              >
                {' '}
                {isEditing ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskModal
