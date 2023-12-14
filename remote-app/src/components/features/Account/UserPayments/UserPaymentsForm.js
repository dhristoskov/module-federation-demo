import React, { useState } from 'react'

import BaseForm from '@/components/elements/BaseForm/BaseForm'
import BaseInputField from '@/components/elements/BaseInputField/BaseInputField'

import 'tailwindcss/tailwind.css'

const UserPaymentsForm = ({ id }) => {
  const [userPayOptions, setUserPayOptions] = useState({
    card_number: '',
    card_owner: '',
    card_expiration_date: '',
    card_cvc: '',
  })

  const { card_number, card_owner, card_expiration_date, card_cvc, paypal_account } = userPayOptions

  const onOptionChange = (e) => {
    setUserPayOptions({
      ...userPayOptions,
      [e.target.name]: e.target.value,
    })
  }

  const onPayOptionsUpdate = () => {
    console.log('onPayOptionsUpdate')
  }
  return (
    <BaseForm
      buttonTitle="Add/Update Payment"
      formSubmit={onPayOptionsUpdate}
      formClass="xs:w-full md:max-w-[32rem] flex flex-col gap-1"
    >
      <BaseInputField
        type="text"
        placeholder="Card number"
        name="card_number"
        value={card_number}
        onChange={onOptionChange}
      />
      <BaseInputField
        type="text"
        placeholder="Card owner"
        name="card_owner"
        value={card_owner}
        onChange={onOptionChange}
      />
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <BaseInputField
          type="text"
          placeholder="Card expiration date"
          name="card_expiration_date"
          value={card_expiration_date}
          onChange={onOptionChange}
        />
        <BaseInputField
          type="text"
          placeholder="Card CVC"
          name="card_cvc"
          value={card_cvc}
          onChange={onOptionChange}
        />
      </div>
    </BaseForm>
  )
}

export default UserPaymentsForm
