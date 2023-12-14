import React from 'react'

import BaseIconButton from '@/components/elements/BaseIconButton/BaseIconButton'

const AccountCtA = ({ onClick }) => {
  return (
    <div className='fixed right-2 lg:right-10 top-2/3 z-30 lg:z-20 rounded-full p-2 shadow-xl border-2 border-slate-200 bg-white'>
      <BaseIconButton
        icon="cog"
        size="lg"
        onClick={onClick}
      />
    </div>
  )
}

export default AccountCtA
