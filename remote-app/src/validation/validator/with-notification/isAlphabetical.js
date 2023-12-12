import { isAlphabetical as alphabetical} from '../raw/index'

const isAlphabetical = (value, message = 'The value must be alphabetical') => {
    return alphabetical(value) ? '' : message;
}

export default isAlphabetical;