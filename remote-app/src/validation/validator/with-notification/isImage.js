import { isImage as image } from '../raw/index'

const isImage = (value, message = `The value must be an image`) => {
    return image(value) ? '' : message
}

export default isImage