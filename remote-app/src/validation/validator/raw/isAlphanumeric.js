const isAlphanumeric = (value) => {
    if (value.length > 0) {
        return /^[a-zA-Z0-9-/]+$/.test(value);
    }
    return true
}

export default isAlphanumeric;