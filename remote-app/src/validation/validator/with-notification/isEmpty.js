import { isEmpty as empty } from '../raw/index'

const isEmpty = (value, message = `Required`) => {
    return empty(value) ? message : ''
}

export default isEmpty