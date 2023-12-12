import React, { useContext } from 'react'

import Typography from '@/components/elements/Typography/Typography'
import addOptionInLocalStorage from './utils/addOptionInLocalStorage'
import { NotificationContext } from '@/store/NotificationContext'

const AddOption = ({ title, option }) => {
  const { showNotification } = useContext(NotificationContext)
  const handleAddOption = () => {
    addOptionInLocalStorage(option)
    showNotification({ message: 'Option added to basket!', type: 'success' })
    
    const event = new CustomEvent('addOption')
    window.dispatchEvent(event)
  }

  return (
    <div
      onClick={handleAddOption}
      className="flex items-center border-2 border-slate-900 rounded-3xl max-w-fit cursor-pointer"
    >
      <Typography additionalClasses="text-sm text-slate-900 p-2 bg-white rounded-l-3xl">€ {option.price}</Typography>
      <p className="text-sm border-l-2 border-l-slate-900 p-2 bg-slate-900 text-white rounded-r-3xl">{title}</p>
    </div>
  )
}

export default AddOption
