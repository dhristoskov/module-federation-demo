import React from 'react'

import Button from '../Button/Button'

import 'tailwindcss/tailwind.css'

const BaseForm = ({ children, formSubmit, formClass, submitButtonClass, buttonTitle }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    formSubmit()
  }
  return (
    <form
      className={formClass}
      onSubmit={onSubmit}
    >
      {children}
      <Button
        variant="primary"
        onClick={() => {}}
        fullWidth={true}
        className={submitButtonClass}
      >
        {buttonTitle}
      </Button>
    </form>
  )
}

export default BaseForm
