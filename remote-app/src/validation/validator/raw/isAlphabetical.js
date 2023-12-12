const isAlphabetical = (value) => {
    if (value.length > 0) {
        return /^[a-zA-Z-_]+$/.test(value);
    }
    return true
}

export default isAlphabetical;

