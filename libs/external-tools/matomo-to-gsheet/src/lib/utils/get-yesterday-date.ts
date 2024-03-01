/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Returns yesterday's date as a string in 'YYYY-MM-DD' format.
 *
 * Utilizes the Date object to subtract one day from the current date,
 * then formats it to ISO string, extracting only the date part.
 *
 * @returns {string} Yesterday's date in 'YYYY-MM-DD'.
 */
function getYesterdayDateString(): string {
  const date: Date = new Date()
  date.setDate(date.getDate() - 1)

  return date.toISOString().split("T")[0]
}

export default getYesterdayDateString
