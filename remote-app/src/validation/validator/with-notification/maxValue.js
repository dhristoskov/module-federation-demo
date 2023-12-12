import { maxValue as max } from '../raw/index'

const maxValue = (value, maxValue, message = `The value has to be not greater than ${maxValue}`) => {
    return max(value, maxValue) ? '' : message
}

export default maxValue