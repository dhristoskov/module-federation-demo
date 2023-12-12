import React from 'react'

import BaseIconButton from '@/components/elements/BaseIconButton/BaseIconButton'

const GlobalSearch = ({ mobile }) => {
  const mobileStyles = mobile
    ? 'w-full relative h-full block sm:hidden mb-3'
    : 'hidden sm:block w-full max-w-[45rem] mx-6 relative'

  return (
    <div className={mobileStyles}>
      <input
        className="w-full border-2 border-slate-500 rounded-3xl p-2 pl-6 outline-none"
        type="text"
        placeholder="Search for anything"
      />
      <div className="absolute right-2 top-1 bg-slate-200 transition-colors duration-150 ease-in-out hover:bg-slate-500 p-1 border-2 rounded-full shadow-sm cursor-pointer">
        <BaseIconButton
          icon="search"
          size="md"
        />
      </div>
    </div>
  )
}

export default GlobalSearch
