/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Generates an array of date strings between two specified dates.
 *
 * @param startDate The start date in `YYYY-MM-DD` format.
 * @param endDate The end date in `YYYY-MM-DD` format.
 * @returns An array of dates (inclusive) between `startDate` and `endDate`, formatted as `YYYY-MM-DD`.
 */
function generateDateRange(startDate: string, endDate: string): string[] {
  const start = new Date(startDate)
  start.setDate(start.getDate() + 1)
  const end = new Date(endDate)
  const currentDate = new Date(start)
  const dateRange: string[] = []

  while (currentDate <= end) {
    dateRange.push(currentDate.toISOString().split("T")[0])
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dateRange
}

export default generateDateRange
