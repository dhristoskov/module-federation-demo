import {
  isAlphabetical,
  isAlphanumeric,
  isBetween,
  isDate,
  isDecimal,
  isEmail,
  isEmpty,
  isEqual,
  isImage,
  isInteger,
  isUrl,
  isVideo,
  maxLength,
  maxValue,
  minLength,
  minValue,
} from '../validator/with-notification'

const validators = {
  isAlphabetical,
  isAlphanumeric,
  isBetween,
  isDate,
  isDecimal,
  isEmail,
  isEmpty,
  isEqual,
  isImage,
  isInteger,
  isUrl,
  isVideo,
  maxLength,
  maxValue,
  minLength,
  minValue,
}

const validateCases = (value, validate) => {
  switch (validate.validator) {
    case 'isEqual':
      return validators[validate.validator](value, validate.equalTo, validate.message)
    case 'maxLength':
      return validators[validate.validator](value, validate.maxLength, validate.message)
    case 'minLength':
      return validators[validate.validator](value, validate.minLength, validate.message)
    case 'maxValue':
      return validators[validate.validator](value, validate.maxValue, validate.message)
    case 'minValue':
      return validators[validate.validator](value, validate.minValue, validate.message)
    case 'isBetween':
      return validators[validate.validator](value, validate.maxValue, validate.minValue, validate.message)
    default:
      return validators[validate.validator](value, validate.message)
  }
}

const validate = (value, validate) => {
  if (validate.validator in validators) {
    return validateCases(value, validate)
  }
  return ''
}

export default validate
