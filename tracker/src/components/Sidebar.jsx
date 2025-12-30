import { ClipboardList, LayoutDashboard, ListChecks, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
const Siderbar = () => {
  return (
    <div className="min-h-screen   w-[300px]  border border-gray-200">
      <Link to="/">
        <div className="flex  gap-2 mb-4 shadow-xs px-8 py-4 ">
          <div className="bg-purple-700  p-1 rounded-lg ">
            <ClipboardList size={26} className="text-gray-200" />
          </div>
          <h1 className="text-2xl font-bold text-gray-700">TaskFlow</h1>
        </div>
      </Link>

      <div className="flex flex-col gap-3 text-gray-400  ">
      <a href='#dashboard'> 
        <div className="flex p-2 items-center gap-2 px-8 hover:bg-purple-200 hover:text-gray-700">
          <LayoutDashboard size={22} className="text-gray-500 " />

          <h1 className="text-lg font-semibold ">Dashboard</h1>
        </div>
      </a>

<a href="#tasks">

        <div className="flex hover:bg-purple-200 hover:text-gray-700 p-2 items-center gap-2 px-8">
          <ListChecks size={22} className="text-gray-500" />

          <h1 className="text-lg font-semibold ">Tasks</h1>
        </div>
</a>


        
      </div>
    </div>
  )
}

export default Siderbar
