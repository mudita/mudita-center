export const formatDateToMMDDYYYY = (standarizedDate?: string) => {
  if (standarizedDate === undefined) {
    console.warn("date is undefined")
    return 0
  }
  return new Date(standarizedDate).toLocaleDateString("en-US")
}
