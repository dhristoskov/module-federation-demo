import { isDecimal as decimal } from '../raw/index'

const isDecimal = (value, message = `The value must be a decimal`) => {
    return decimal(value) ? '' : message
}

export default isDecimal