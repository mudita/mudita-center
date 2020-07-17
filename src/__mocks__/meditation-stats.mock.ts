import moment from "moment"
import { StatsData } from "Renderer/components/rest/meditation-stats/meditation-stats.component"

export const generateWeeklyMediationData = (): StatsData[] => {
  const data = []
  for (let i = 0; i < 7; i++) {
    const date = moment().startOf("isoWeek").add(i, "days")
    data.push({
      date: date.format("YYYY-MM-DD"),
      time: date <= moment() ? Math.round(Math.random() * 1000) : 0,
    })
  }
  return data
}

export const generateMonthlyMeditationData = (): StatsData[] => {
  const data = []
  for (let i = 0; i < moment().daysInMonth(); i++) {
    const date = moment().startOf("month").add(i, "days")
    data.push({
      date: date.format("YYYY-MM-DD"),
      time: date <= moment() ? Math.round(Math.random() * 2000) : 0,
    })
  }
  return data
}

export const generateYearlyMeditationData = (): StatsData[] => {
  const data = []
  for (let i = 0; i < 12; i++) {
    const date = moment().startOf("year").add(i, "months")
    data.push({
      date: date.format("YYYY-MM"),
      time: date <= moment() ? Math.round(Math.random() * 60000) : 0,
    })
  }
  return data
}
