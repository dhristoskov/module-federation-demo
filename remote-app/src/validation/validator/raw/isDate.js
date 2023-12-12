const isDate = (value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
}

export default isDate;