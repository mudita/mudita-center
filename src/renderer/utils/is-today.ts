import moment from "moment"

export const isToday = (date: Date) => moment(date).isSame(Date.now(), "days")
