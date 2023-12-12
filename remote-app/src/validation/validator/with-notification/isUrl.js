import { isUrl as url } from '../raw/index'

const isUrl = (value, message = `The value must be a url`) => {
    return url(value) ? '' : message
}

export default isUrl