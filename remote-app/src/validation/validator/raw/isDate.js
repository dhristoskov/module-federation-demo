const isDate = (value) => {
  // mm/yyyy (e.g. 12/2020) or dd/mm/yyyy (e.g. 31/12/2020)
  const dateSlashRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/
  const dateSlashRegexFullDate = /^(0[1-9]|[12][0-9]|3[01])\/?(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/

  // mm-yyyy (e.g. 12-2020) or dd-mm-yyyy (e.g. 31-12-2020)
  const dateDashRegex = /^(0[1-9]|1[0-2])\-?([0-9]{4}|[0-9]{2})$/
  const dateDashRegexFullDate = /^(0[1-9]|[12][0-9]|3[01])\-?(0[1-9]|1[0-2])\-?([0-9]{4}|[0-9]{2})$/

  // mm.yyyy (e.g. 12.2020) or dd.mm.yyyy (e.g. 31.12.2020)
  const dateDotRegex = /^(0[1-9]|1[0-2])\.?([0-9]{4}|[0-9]{2})$/
  const dateDotRegexFullDate = /^(0[1-9]|[12][0-9]|3[01])\.?(0[1-9]|1[0-2])\.?([0-9]{4}|[0-9]{2})$/

  const dateRegex = new RegExp(
    `${dateSlashRegex.source}|${dateSlashRegexFullDate.source}|${dateDashRegex.source}|${dateDashRegexFullDate.source}|${dateDotRegex.source}|${dateDotRegexFullDate.source}`,
  )

  return dateRegex.test(value)
}

export default isDate
