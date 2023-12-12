const isInteger = (value) => {
    if(typeof value === 'number') { 
        return (value % 1) === 0;
    }
    return /^[+-]?\d+$/.test(value);
}

export default isInteger;
