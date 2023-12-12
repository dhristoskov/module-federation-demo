import { isDate as date } from '../raw/index'

const isDate = (value, message = `The value must be a date`) => {
    return date(value) ? '' : message
}

export default isDate