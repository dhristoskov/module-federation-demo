import React, { useState, useEffect, useContext } from 'react'

import Button from '@/components/elements/Button/Button'
import BaseInputField from '@/components/elements/BaseInputField/BaseInputField'
import addNewAddress from '../../utils/addNewAddress'
import editUserAddress from '../../utils/editUserAddress'
import { NotificationContext } from '@/store/NotificationContext'

import 'tailwindcss/tailwind.css'

const UserAddressForm = ({ id, editAddress, setEditAddress, setReload }) => {
  const { showNotification } = useContext(NotificationContext)
  const [userAddresses, setUserAddresses] = useState({
    street: '',
    city: '',
    street_number: '',
    postal_code: '',
    country: '',
    username: '',
  })

  const postalCodeValidation = {
    value: userAddresses.postal_code,
    validators: [{ validator: 'isAlphanumeric', message: 'Postal code must be alphanumeric' }],
  }

  const countryValidation = {
    value: userAddresses.country,
    validators: [{ validator: 'isAlphabetical', message: 'Country must be alphabetical' }],
  }

  const streetValidation = {
    value: userAddresses.street,
    validators: [{ validator: 'minLength', minLength: 3, message: 'Street must be at least 3 characters long' }],
  }

  const cityValidation = {
    value: userAddresses.city,
    validators: [{ validator: 'isAlphabetical', message: 'City must be alphabetical' }],
  }

  const streetNumberValidation = {
    value: userAddresses.street_number,
    validators: [{ validator: 'isAlphanumeric', message: 'Street number must be alphanumeric' }],
  }

  const { street, city, street_number, postal_code, country } = userAddresses

  const onChange = (e) => {
    setUserAddresses({
      ...userAddresses,
      [e.target.name]: e.target.value,
    })
  }

  const onAddNewAddress = async () => {
    if (!street || !city || !street_number || !postal_code || !country) return

    const address = {
      street,
      city,
      street_number,
      postal_code,
      country,
    }

    addNewAddress(id, setUserAddresses, showNotification, setReload, address)
  }

  const onEditAddress = () => {
    if (!street || !city || !street_number || !postal_code || !country) return

    const address = {
      street,
      city,
      street_number,
      postal_code,
      country,
    }

    if (editAddress._id) {
      editUserAddress(editAddress._id, setUserAddresses, showNotification, setReload, address)
    }
  }

  const onFormSubmit = () => {
    Object.keys(editAddress).length !== 0 ? onEditAddress() : onAddNewAddress()
  }

  const clearForm = () => {
    setUserAddresses({
      street: '',
      city: '',
      street_number: '',
      postal_code: '',
      country: '',
      username: '',
    })
    setEditAddress({})
  }

  useEffect(() => {
    if (Object.keys(editAddress).length !== 0) {
      setUserAddresses({
        street: editAddress.street,
        city: editAddress.city,
        street_number: editAddress.street_number,
        postal_code: editAddress.postal_code,
        country: editAddress.country,
        username: editAddress.username,
      })
    }
  }, [editAddress])

  return (
    <div className="max-w-[32rem] flex flex-col gap-1">
      {Object.keys(editAddress).length !== 0 ? (
        <div className="w-full flex justify-end">
          <p
            className="cursor-pointer text-xs font-bold text-slate-700 hover:text-slate-900"
            onClick={clearForm}
          >
            Clear form
          </p>
        </div>
      ) : (
        <div className="w-full flex justify-end h-4" />
      )}
      <BaseInputField
        placeholder="Street"
        name="street"
        value={street}
        onChange={onChange}
        validation={streetValidation}
      />
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <BaseInputField
          placeholder="Str. No."
          name="street_number"
          value={street_number}
          onChange={onChange}
          validation={streetNumberValidation}
        />
        <BaseInputField
          placeholder="Postal Code"
          name="postal_code"
          value={postal_code}
          onChange={onChange}
          validation={postalCodeValidation}
        />
      </div>
      <BaseInputField
        placeholder="City"
        name="city"
        value={city}
        onChange={onChange}
        validation={cityValidation}
      />
      <BaseInputField
        placeholder="Country"
        name="country"
        value={country}
        onChange={onChange}
        validation={countryValidation}
      />
      <Button
        variant="primary"
        onClick={onFormSubmit}
        fullWidth={true}
      >
        {Object.keys(editAddress).length !== 0 ? 'Edit' : 'Add new address'}
      </Button>
    </div>
  )
}

export default UserAddressForm
