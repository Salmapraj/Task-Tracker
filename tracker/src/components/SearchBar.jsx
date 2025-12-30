import { useState,React, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useDebounce } from '../hooks/useDebounce'

const SearchBar = ({onSearch}) => {
const [searchTerm,setSearchTerm]=useState("")
const debounce=useDebounce(searchTerm,500) ;
useEffect(()=>{
onSearch(debounce)
},[debounce])


  return (
    <div className="h-18 flex items-center px-4 bg-white ">
      <div className="flex bg-gray-50 items-center  px-3 py-1 rounded-md w-full max-w-md">
        <Search size={19} className="mr-1 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          className="w-full outline-none p-1 text-gray-600 "
          placeholder="Search across your workspace"
        />
      </div>
    </div>
  )
}

export default SearchBar
