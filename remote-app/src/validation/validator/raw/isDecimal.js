const isDecimal = (value) => {
    if(typeof value === 'number') {
        return (value % 1) !== 0;
    }
    return /^[+-]?\d+(\.\d+)?$/.test(value);
}

export default isDecimal;
