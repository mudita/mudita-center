/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export function formatDate(date: Date): string {
  let month = String(date.getMonth() + 1)
  let day = String(date.getDate())
  const year = date.getFullYear()

  if (month.length < 2) {
    month = "0" + month
  }
  if (day.length < 2) {
    day = "0" + day
  }

  return [year, month, day].join("-")
}
