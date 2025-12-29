import React from 'react'
import { Search } from 'lucide-react'
const SearchBar = () => {
  return (
    <div className="h-18 flex items-center px-4 bg-white ">
      <div className="flex bg-gray-50 items-center  px-3 py-1 rounded-md w-full max-w-md">
        <Search size={19} className="mr-1 text-gray-500" />
        <input
          type="text"
          className="w-full outline-none p-1 text-gray-600 text-lg"
          placeholder="search acrossyour workspace"
        />
      </div>
    </div>
  )
}

export default SearchBar
