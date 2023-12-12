import { minLength as min } from '../raw/index'

const minLength = (value, minLength, message = `The value has to be longer or equal than ${minLength}`) => {
    return min(value, minLength) ? '' : message
}

export default minLength