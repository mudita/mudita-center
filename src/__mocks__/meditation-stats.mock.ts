import moment, { DurationInputArg2, Moment } from "moment"
import { StatsData } from "Renderer/components/rest/meditation-stats/meditation-stats.component"
import { ChartType } from "Renderer/components/rest/meditation-stats/meditation-stats.enum"

export const generateMeditationData = (
  chartType: ChartType = ChartType.Weekly
): StatsData[] => {
  const data = []

  let periods: number
  let date: Moment
  let format: string = "YYYY-MM-DD"
  let unit: DurationInputArg2 = "days"
  let maxTime: number = 2000

  switch (chartType) {
    case ChartType.Yearly:
      periods = 12
      date = moment().startOf("year")
      format = "YYYY-MM"
      unit = "months"
      maxTime = 60000
      break
    case ChartType.Weekly:
      periods = 7
      date = moment().startOf("isoWeek")
      break
    case ChartType.Monthly:
      periods = moment().daysInMonth()
      date = moment().startOf("month")
      break
  }

  for (let i = 0; i < periods; i++) {
    const currentDate = i > 0 ? date.add(1, unit) : date
    data.push({
      date: currentDate.format(format),
      time: currentDate <= moment() ? Math.round(Math.random() * maxTime) : 0,
    })
  }
  return data
}
