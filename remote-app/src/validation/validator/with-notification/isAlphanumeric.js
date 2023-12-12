import { isAlphanumeric as alphanumeric} from '../raw/index';

const isAlphanumeric = (value, message = 'The value must be alpha-numeric') => {
    return alphanumeric(value) ? '' : message;
}

export default isAlphanumeric;