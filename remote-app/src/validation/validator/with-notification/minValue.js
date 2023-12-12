import { minValue as min } from '../raw/index'

const minValue = (value, minValue, message = `The value has to be not less than ${minValue}`) => {
    return min(value, minValue) ? '' : message
}

export default minValue