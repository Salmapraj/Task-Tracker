import React from 'react'
import { Plus } from 'lucide-react'
import SearchBar from './SearchBar'
const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col w-full">
      <div className="">
        <SearchBar />
      </div>

      <div className=" flex bg-white justify-between px-4 border border-gray-500 py-3 mt-8 mx-8 rounded-lg">
        <div>
          <h2>Workspace Tasks</h2>
          <p>Manage and track your active projects</p>
        </div>
        <div className="bg-gray-100">
          <ul className="flex gap-2 justify-between">
            <li>All</li>
            <li>Pending</li>
            <li>Done</li>
          <Plus className="text-black" />
          </ul>
        </div>
       
      </div>
    </div>
  )
}

export default Dashboard
