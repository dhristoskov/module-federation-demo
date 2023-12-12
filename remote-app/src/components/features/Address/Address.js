import React, { useContext, useEffect, useState } from 'react'
import axios from '@/axios'

import Typography from '@/components/elements/Typography/Typography'
import { AuthContext } from '@/store/AuthContext'

import 'tailwindcss/tailwind.css'

const Address = () => {
  const { user } = useContext(AuthContext)
  const [address, setAddress] = useState({
    street: '',
    street_number: '',
    postal_code: '',
    city: '',
  })

  const getUserAddress = async (id) => {
    try {
      const response = await axios.get(`/address/selected/`)

      if (response.data) {
        const { street, city, street_number, postal_code } = response.data.address
        setAddress({
          street,
          city,
          street_number,
          postal_code,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    if (user && user.id) {
      getUserAddress(user.id)
    }
  }, [])

  return (
    address.city &&
    address.street &&
    address.street_number &&
    address.postal_code && (
      <div className="flex gap-1">
        <Typography additionalClasses="text-xs font-bold text-white whitespace-nowrap">
          {address.street} {address.street_number},
        </Typography>
        <Typography additionalClasses="text-xs font-bold text-white whitespace-nowrap">
          {address.postal_code} {address.city}
        </Typography>
      </div>
    )
  )
}

export default Address
