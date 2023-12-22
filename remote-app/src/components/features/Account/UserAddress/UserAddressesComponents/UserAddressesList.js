import React, { useState, useEffect } from 'react'

import getAllAddresses from '../../utils/getAllAddresses'
import UserAddressItem from './UserAddressItem'
import addNotification from '@/components/features/Basket/utils/addNotification'

import 'tailwindcss/tailwind.css'

const UserAddressesList = ({ id, reload, setReload, editAddress, setEditAddress }) => {
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    if (!id) return
    getAllAddresses(setAddresses, addNotification, setReload)
  }, [id, reload])

  return (
    addresses &&
    addresses?.length > 0 && (
      <section className="grid xs:grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-4 md:w-6/12 w-full">
        {addresses.map((address) => (
          <UserAddressItem
            key={address._id}
            address={address}
            setReload={setReload}
            editAddress={editAddress}
            setEditAddress={setEditAddress}
          />
        ))}
      </section>
    )
  )
}

export default UserAddressesList
