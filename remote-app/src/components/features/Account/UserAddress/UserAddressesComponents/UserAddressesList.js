import React, { useState, useEffect, useContext } from 'react'

import getAllAddresses from '../../utils/getAllAddresses'
import UserAddressItem from './UserAddressItem'
import { NotificationContext } from '@/store/NotificationContext'

import 'tailwindcss/tailwind.css'

const UserAddressesList = ({ id, reload, setReload, setEditAddress }) => {
  const { showNotification } = useContext(NotificationContext)
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    if (!id) return
    getAllAddresses(setAddresses, showNotification, setReload)
  }, [id, reload])

  return (
    addresses && addresses?.length > 0 && (
      <section className="grid xs:grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-4 md:w-6/12 w-full">
        {addresses.map((address) => (
          <UserAddressItem
            key={address._id}
            address={address}
            setReload={setReload}
            setEditAddress={setEditAddress}
          />
        ))}
      </section>
    )
  )
}

export default UserAddressesList
