import { isEqual as equal } from '../raw/index'

const isEqual = (value, equalTo, message = `The values must be equal`) => {
    return equal(value, equalTo) ? '' : message
}

export default isEqual;