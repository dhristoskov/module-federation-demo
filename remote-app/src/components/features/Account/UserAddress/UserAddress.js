import React, { useState } from 'react'

import UserAddressForm from './UserAddressesComponents/UserAddressForm'
import UserAddressesList from './UserAddressesComponents/UserAddressesList'

import 'tailwindcss/tailwind.css'

const UserAddress = ({ id }) => {
  const [editAddress, setEditAddress] = useState({})
  const [reload, setReload] = useState(false)

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      <div className="md:w-6/12 w-full">
        <UserAddressForm
          id={id}
          setReload={setReload}
          editAddress={editAddress}
          setEditAddress={setEditAddress}
        />
      </div>
      <UserAddressesList
        id={id}
        reload={reload}
        setReload={setReload}
        editAddress={editAddress}

        setEditAddress={setEditAddress}
      />
    </div>
  )
}

export default UserAddress
