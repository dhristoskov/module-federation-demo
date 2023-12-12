import React from 'react'

import BaseField from '../BaseField/BaseField'
import useValidation from '@/validation/input-validate/useValidation'

import 'tailwindcss/tailwind.css'

const BaseInputField = ({ label, placeholder, helpMessage, type = 'text', value, name, onChange, validation}) => {
  const hasValue = !!value
  const openMessage = !!(value && value?.length > 80)

  let fieldErrors = null
  if (validation) {
    const { errors } = validation && useValidation(validation)
    fieldErrors = errors
  }

  return (
    <BaseField
      label={label}
      helpMessage={helpMessage}
      openMessage={openMessage}
      errorMessage={fieldErrors}
    >
      {placeholder && (
        <div
          className={`absolute left-[0.625rem] top-[0.325rem] text-neutral-400 text-xs font-bold ${
            hasValue ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {placeholder}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="border-2 border-neutral-200 px-2 pt-4 pb-1 placeholder:text-xs placeholder:font-bold outline-none w-full rounded-md text-slate-400 focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
      />
    </BaseField>
  )
}

export default BaseInputField
