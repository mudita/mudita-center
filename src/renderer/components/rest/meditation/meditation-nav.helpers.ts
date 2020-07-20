import moment from "moment"

export type MediationDate = string | number | Date

export interface MeditationNavProps {
  startDate: MediationDate
  endDate: MediationDate
}

export const formatDate = (input: MediationDate): string | Date => {
  if (typeof input === "string") {
    return input
  }

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
