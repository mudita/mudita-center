import moment from "moment"

export const isToday = (date: Date | undefined) =>
  moment(date).isSame(Date.now(), "days")
