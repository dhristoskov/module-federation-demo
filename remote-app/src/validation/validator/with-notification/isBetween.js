import { isBetween as between } from '../raw/index'

const isBetween = (value, minValue, maxValue, message = `The value must be between ${minValue} and ${maxValue}`) => {
    return between(value, minValue, maxValue) ? '' : message
}

export default isBetween