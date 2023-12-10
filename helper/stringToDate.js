function stringToDate(date) {
  const [day, month, year] = date.split('-').map(Number);
  // Note: Months in JavaScript are zero-based, so we subtract 1 from the month
  return new Date(year, month - 1, day);
}

module.exports = {stringToDate}