import { isVideo as video } from '../raw/index'

const isVideo = (value, message = `The value must be a video file`) => {
    return video(value) ? '' : message
}

export default isVideo