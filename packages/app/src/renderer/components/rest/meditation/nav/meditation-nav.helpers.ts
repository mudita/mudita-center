/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import moment from "moment"

export type MediationDate = string | number | Date
export enum DateFormatItems {
  Year = "Year",
  Month = "Month",
  Day = "Day",
}

export interface MeditationNavProps {
  startDate: MediationDate
  endDate?: MediationDate
  show?: DateFormatItems[]
}

export const formatDate = (input: MediationDate): string | Date => {
  return new Date(input)
}

export const dateWithinThisWeek = ({
  startDate,
  endDate,
}: MeditationNavProps): boolean => {
  const currentDate = Date.now()

  return (
    moment(startDate).isSame(currentDate, "isoWeek") &&
    moment(endDate).isSame(currentDate, "isoWeek")
  )
}
