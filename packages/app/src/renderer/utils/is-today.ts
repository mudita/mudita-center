import moment, { MomentInput } from "moment"

export const isToday = (date: MomentInput) =>
  moment(date).isSame(Date.now(), "days")
