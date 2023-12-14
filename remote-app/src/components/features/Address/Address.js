import React, { use, useContext, useEffect, useState } from 'react'
import axios from '@/axios'

import Typography from '@/components/elements/Typography/Typography'
import { AuthContext } from '@/store/AuthContext'

import 'tailwindcss/tailwind.css'

const Address = () => {
  const { user } = useContext(AuthContext)
  const [reload, setReload] = useState(false)
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
        setReload(false)
      }
    } catch (err) {
      console.log(err)
      setReload(false)
    }
  }

  useEffect(() => {
    window.addEventListener('address-updated', () => {
      setReload(!reload)
    })

    return () => {
      window.removeEventListener('address-updated', () => {})
    }
  }, [])

  useEffect(() => {
    if (user && user.id) {
      getUserAddress(user.id)
    }
  }, [reload])

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
