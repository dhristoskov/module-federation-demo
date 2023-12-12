import { maxLength as max } from '../raw/index'

const maxLength = (value, maxLength, message = `The value has to be not longer than ${maxLength}`) => {
    return max(value, maxLength) ? '' : message
}

export default maxLength