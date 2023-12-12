const isBetween = (value, minValue, maxValue) => {
    return +value >= minValue && +value <= maxValue;
}

export default isBetween;