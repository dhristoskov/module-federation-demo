import { useEffect, useState, useCallback } from 'react'
import validate from './validate'

const useValidation = (entry) => {
  if (!entry) return
  const [errors, setErrors] = useState('')
  const [fieldValidators, setFieldValidators] = useState(entry.validators)

  useEffect(() => {
    setFieldValidators(entry.validators)
  }, [])

  const validateField = useCallback(
    (value) => {
      const results = fieldValidators.map((validator) => validate(value, validator))
      return results
    },
    [fieldValidators],
  )

  useEffect(() => {
    const results = validateField(entry.value)
    if (entry.value === '') return setErrors('')
    setErrors(results)
  }, [entry.value])

  return { errors }
}

export default useValidation
