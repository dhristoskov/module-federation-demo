const isEqual = (value, equalTo) => {
    if((typeof value === 'string' && typeof equalTo === 'string') && (value.length === 0 || equalTo.length === 0)) {
        return true
    }
    if (typeof value === 'object' && typeof equalTo === 'object') {
        return JSON.stringify(value) === JSON.stringify(equalTo);
    }
    if (Array.isArray(value) && Array.isArray(equalTo)) {
        return value.length === equalTo.length && value.every((v, i) => v === equalTo[i]);
    }
    return value === equalTo;
}

export default isEqual;