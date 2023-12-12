import { isInteger as integer } from '../raw/index'

const isInteger = (value, message = `The value must be an integer`) => {
    return integer(value) ? '' : message
}

export default isInteger