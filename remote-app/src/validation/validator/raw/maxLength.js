const maxLength = (value, maxLength) => {
    if(typeof value === 'number') {
        return false
    }
    if (Array.isArray(value)) {
        return value.length <= maxLength;
    }
    else if (typeof value === 'object') {
        return Object.keys(value).length <= maxLength;
    }
    return value.length <= maxLength;
}

export default maxLength;