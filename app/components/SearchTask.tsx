'use client'

import React, { useState } from 'react'

const SearchTask = () => {
  const [searchVal, setSearchVal] = useState<string>('')

  return (
    <input
      value={searchVal}
      type="text"
      placeholder="Type to search..."
      className="input input-bordered w-full bg-white text-black flex-1"
      onChange={(e) => setSearchVal(e.target.value)}
    />
  )
}

export default SearchTask
