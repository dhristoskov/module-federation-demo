import { isEmail as email } from '../raw/index'

const isEmail = (value, message = `The value must be an email`) => {
    return email(value) ? '' : message
}

export default isEmail