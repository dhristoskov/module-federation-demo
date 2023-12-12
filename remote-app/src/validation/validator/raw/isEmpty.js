const isEmpty = (value ) => {
    if(typeof value === 'string') {
        return value.trim().length === 0;
    }
    return value === undefined || value === null;
}

export default isEmpty;
