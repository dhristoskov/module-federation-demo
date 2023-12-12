import React, { useState } from 'react'

import Typography from '@/components/elements/Typography/Typography'
import BaseInputField from '@/components/elements/BaseInputField/BaseInputField'
import Button from '@/components/elements/Button/Button'

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
    <div className="max-w-[32rem] flex flex-col gap-3">
      <Typography
        tag="h3"
        spacingBottom="text-2xl mb-6 font-bold text-gray-800"
      >
        Add payment options
      </Typography>
      <BaseInputField
        type="text"
        label="Card number"
        name="card_number"
        value={card_number}
        onChange={onOptionChange}
      />
      <BaseInputField
        type="text"
        label="Card owner"
        name="card_owner"
        value={card_owner}
        onChange={onOptionChange}
      />
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <BaseInputField
          type="text"
          label="Card expiration date"
          name="card_expiration_date"
          value={card_expiration_date}
          onChange={onOptionChange}
        />
        <BaseInputField
          type="text"
          label="Card CVC"
          name="card_cvc"
          value={card_cvc}
          onChange={onOptionChange}
        />
      </div>
      <Button
        variant="primary"
        fullWidth={true}
        onClick={onPayOptionsUpdate}
      >
        Update Payment
      </Button>
    </div>
  )
}

export default UserPaymentsForm
