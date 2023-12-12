const minLength = (value, minLength) => {
    if(typeof value === 'number') {
        return false
    }
    if (Array.isArray(value)) {
        return value.length >= minLength;
    }
    else if (typeof value === 'object') {
        return Object.keys(value).length >= minLength;
    }
    return value.length >= minLength;
}

export default minLength;