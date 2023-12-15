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

  const firstNameValidation = {
    value: buyerInfo.first_name,
    validators: [{ validator: 'isAlphabetical', message: 'First name must be alphabetical' }],
  }

  const lastNameValidation = {
    value: buyerInfo.last_name,
    validators: [{ validator: 'isAlphabetical', message: 'Last name must be alphabetical' }],
  }

  const countryValidation = {
    value: buyerInfo.country,
    validators: [{ validator: 'isAlphabetical', message: 'Country must be alphabetical' }],
  }

  const streetValidation = {
    value: buyerInfo.street,
    validators: [{ validator: 'minLength', minLength: 3, message: 'Street must be at least 3 characters long' }],
  }

  const streetNumberValidation = {
    value: buyerInfo.street_number,
    validators: [{ validator: 'isAlphanumeric', message: 'Street number must be alphanumeric' }],
  }

  const cityValidation = {
    value: buyerInfo.city,
    validators: [{ validator: 'isAlphabetical', message: 'City must be alphabetical' }],
  }

  const postalCodeValidation = {
    value: buyerInfo.postal_code,
    validators: [{ validator: 'isAlphanumeric', message: 'Postal code must be alphanumeric' }],
  }

  const emailValidation = {
    value: buyerInfo.email,
    validators: [{ validator: 'isEmail', message: 'Email must be valid' }],
  }

  const passwordValidation = {
    value: buyerInfo.password,
    validators: [{ validator: 'minLength', minLength: 6, message: 'Password must be at least 6 characters long' }],
  }

  const confirmPasswordValidation = {
    value: buyerInfo.confirm_password,
    validators: [{ validator: 'minLength', minLength: 6, message: 'Password must be at least 6 characters long' }],
  }

  const cardNumberValidation = {
    value: buyerInfo.card_number,
    validators: [{ validator: 'isInteger', message: 'Card number must be numeric' }],
  }

  const cardExpirationDateValidation = {
    value: buyerInfo.card_expiration_date,
    validators: [{ validator: 'isDate', message: 'Card expiration date in format mm/yyyy' }],
  }

  const cardCVCValidation = {
    value: buyerInfo.card_cvc,
    validators: [{ validator: 'isInteger', message: 'Card CVC must be numeric' }],
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
          validation={firstNameValidation}
        />
        <BaseInputField
          placeholder="Last name"
          name="last_name"
          value={last_name}
          onChange={onChange}
          validation={lastNameValidation}
        />
      </div>
      <BaseInputField
        placeholder="Country"
        name="country"
        value={country}
        onChange={onChange}
        validation={countryValidation}
      />
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <BaseInputField
          placeholder="Street"
          name="street"
          value={street}
          onChange={onChange}
          validation={streetValidation}
        />
        <BaseInputField
          placeholder="Str. No."
          name="street_number"
          value={street_number}
          onChange={onChange}
          validation={streetNumberValidation}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <BaseInputField
          placeholder="City"
          name="city"
          value={city}
          onChange={onChange}
          validation={cityValidation}
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
        validation={emailValidation}
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
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            validation={passwordValidation}
          />
          <BaseInputField
            type="password"
            placeholder="Confirm password"
            name="confirm_password"
            value={confirm_password}
            onChange={onChange}
            validation={confirmPasswordValidation}
          />
        </>
      )}
      <div className="w-full text-start">
        <Typography additionalClasses="text-xl font-bold text-slate-900 mb-4 mt-8">Biling details:</Typography>
      </div>
      <BaseInputField
        placeholder="Card number"
        name="card_number"
        value={card_number}
        onChange={onChange}
        validation={cardNumberValidation}
      />
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <BaseInputField
          placeholder="Card expiration date (mm/yyyy)"
          name="card_expiration_date"
          value={card_expiration_date}
          onChange={onChange}
          validation={cardExpirationDateValidation}
        />
        <BaseInputField
          placeholder="Card CVC"
          name="card_cvc"
          value={card_cvc}
          onChange={onChange}
          validation={cardCVCValidation}
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
