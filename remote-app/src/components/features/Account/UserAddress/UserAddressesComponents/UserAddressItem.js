import React, { useState } from 'react'

import Typography from '@/components/elements/Typography/Typography'
import deleteSelectedAddress from '../../utils/deleteSelectedAddress'
import setAsDefaultAddress from '../../utils/setAsDefaultAddress'
import addNotification from '@/components/features/Basket/utils/addNotification'
import triggerCustomUpdateEvent from '../events/triggerCustomUpdateEvent'

import 'tailwindcss/tailwind.css'

const UserAddressItem = ({ address, setReload, editAddress, setEditAddress }) => {
  const buttonStyles = 'cursor-pointer bg-white transition-colors duration-150 ease-in-out hover:bg-slate-400 px-2 py-1'
  const selected = address.selected_status ? 'bg-slate-300' : 'bg-white'

  const [open, setOpen] = useState(false)
  const isOnEdit = editAddress && editAddress._id === address._id

  const deleteItem = async () => {
    await deleteSelectedAddress(address._id, addNotification, setReload)
    triggerCustomUpdateEvent('address-updated')
  }

  const setAsDefault = async () => {
    await setAsDefaultAddress(address._id, addNotification, setReload)
    triggerCustomUpdateEvent('address-updated')
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  const setOnEdit = () => {
    if (address) {
      setEditAddress(address)
    }
  }

  return (
    <div className={`flex flex-col gap-1 shadow-xl rounded-xl p-4 relative ${selected}`}>
      <div className="w-full flex justify-end">
        <p
          className="cursor-pointer text-xs font-bold text-slate-700 hover:text-slate-900 mb-2"
          onClick={toggleOpen}
          onMouseEnter={() => setOpen(true)}
        >
          menu
        </p>
      </div>
      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute border-2 border-slate-200 shadow-md z-20 top-9 right-3 bg-white flex flex-col text-sm text-slate-900"
        >
          <p
            className={buttonStyles}
            onClick={setAsDefault}
          >
            {!address.selected_status ? 'Set as default' : 'Unset default'}
          </p>
          <p
            className={buttonStyles}
            onClick={setOnEdit}
          >
            Edit
          </p>
          {!address.selected_status && !isOnEdit && (
            <p
              className={buttonStyles}
              onClick={deleteItem}
            >
              Delete
            </p>
          )}
        </div>
      )}
      <Typography additionalClasses="text-md font-semibold text-slate-600">
        {address.street} {address.street_number}
      </Typography>
      <Typography additionalClasses="text-md font-semibold text-slate-600">
        {address.postal_code} {address.city}
      </Typography>
      <Typography additionalClasses="text-md font-semibold text-slate-600">{address.country}</Typography>
    </div>
  )
}

export default UserAddressItem
