export const formatDateToMMDDYYYY = (standarizedDate?: string) => {
  if (standarizedDate === undefined) {
    console.warn("date is undefined")
    return 0
  }
  const date = new Date(standarizedDate)
  const year = date.getFullYear()
  const month = (1 + date.getMonth()).toString().padStart(2, "0")
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0")

  return month + "." + day + "." + year
}
