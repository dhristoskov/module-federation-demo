import React, { useState } from 'react'

import BaseForm from '@/components/elements/BaseForm/BaseForm'
import BaseInputField from '@/components/elements/BaseInputField/BaseInputField'
import Typography from '@/components/elements/Typography/Typography'

const CheckoutBuyerInfo = () => {
  const [createAccount, setCreateAccount] = useState(false)
  const [buyerInfo, setBuyerInfo] = useState({
    first_name: '',
    last_name: '',
    country: '',
    street: '',
    street_number: '',
    city: '',
    postal_code: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: '',
    card_number: '',
    card_expiration_date: '',
    card_cvc: '',
  })

  const {
    first_name,
    last_name,
    country,
    street,
    street_number,
    city,
    postal_code,
    phone_number,
    email,
    password,
    confirm_password,
    card_number,
    card_expiration_date,
    card_cvc,
  } = buyerInfo

  const onChange = (e) => {
    setBuyerInfo({
      ...buyerInfo,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    console.log(buyerInfo)
    console.log(createAccount)
  }

  return (
    <BaseForm
      buttonTitle="Place order"
      formSubmit={onSubmit}
      formClass="flex w-full flex-col items-center gap-1"
    >
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <BaseInputField
          placeholder="First name"
          name="first_name"
          value={first_name}
          onChange={onChange}
        />
        <BaseInputField
          placeholder="Last name"
          name="last_name"
          value={last_name}
          onChange={onChange}
        />
      </div>
      <BaseInputField
        placeholder="Country"
        name="country"
        value={country}
        onChange={onChange}
      />
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <BaseInputField
          placeholder="Street"
          name="street"
          value={street}
          onChange={onChange}
        />
        <BaseInputField
          placeholder="Str. No."
          name="street_number"
          value={street_number}
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <BaseInputField
          placeholder="City"
          name="city"
          value={city}
          onChange={onChange}
        />
        <BaseInputField
          placeholder="Postal Code"
          name="postal_code"
          value={postal_code}
          onChange={onChange}
        />
      </div>
      <BaseInputField
        placeholder="Phone number"
        name="phone_number"
        value={phone_number}
        onChange={onChange}
      />
      <BaseInputField
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <div className="flex gap-2 items-center w-full mb-4">
        <input
          type="checkbox"
          checked={createAccount}
          onChange={() => setCreateAccount(!createAccount)}
          className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <p className="text-sm font-bold">Use my data to create new account</p>
      </div>
      {createAccount && (
        <>
          <BaseInputField
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <BaseInputField
            placeholder="Confirm password"
            name="confirm_password"
            value={confirm_password}
            onChange={onChange}
          />
        </>
      )}
      <div className="w-full text-start">
        <Typography additionalClasses="text-xl font-bold text-slate-900 mb-4 mt-8">Biling details:</Typography>
      </div>
      <BaseInputField
        type="text"
        placeholder="Card number"
        name="card_number"
        value={card_number}
        onChange={onChange}
      />
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <BaseInputField
          type="text"
          placeholder="Card expiration date"
          name="card_expiration_date"
          value={card_expiration_date}
          onChange={onChange}
        />
        <BaseInputField
          type="text"
          placeholder="Card CVC"
          name="card_cvc"
          value={card_cvc}
          onChange={onChange}
        />
      </div>
      <div className="flex gap-2 items-center w-full mb-4 mt-8">
        <input
          type="checkbox"
          value=""
          className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <p className="text-sm font-bold">I have read and agree to the website terms and conditions </p>
      </div>
    </BaseForm>
  )
}

export default CheckoutBuyerInfo
