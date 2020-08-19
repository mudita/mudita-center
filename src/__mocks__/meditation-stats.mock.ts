import moment, { DurationInputArg2, Moment } from "moment"
import { StatsData } from "Renderer/components/rest/meditation/stats/meditation-stats.component"
import { ChartType } from "Renderer/components/rest/meditation/stats/meditation-stats.enum"

export const generateMeditationData = (
  chartType: ChartType = ChartType.Weekly
): StatsData[] => {
  const data = []

  let periods: number
  let date: Moment
  let format = "YYYY-MM-DD"
  let unit: DurationInputArg2 = "days"
  let maxTime = 2000

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

export const statsWeekly = [
  {
    date: "2020-08-29",
    time: 0,
  },
  {
    date: "2020-08-30",
    time: 0,
  },
  {
    date: "2020-08-31",
    time: 0,
  },
]

export const statsMonthly = [
  {
    date: "2020-08-01",
    time: 614,
  },
  {
    date: "2020-08-02",
    time: 679,
  },
  {
    date: "2020-08-03",
    time: 436,
  },
  {
    date: "2020-08-04",
    time: 73,
  },
  {
    date: "2020-08-05",
    time: 1315,
  },
  {
    date: "2020-08-06",
    time: 500,
  },
  {
    date: "2020-08-07",
    time: 1545,
  },
  {
    date: "2020-08-08",
    time: 1392,
  },
  {
    date: "2020-08-09",
    time: 1859,
  },
  {
    date: "2020-08-10",
    time: 1117,
  },
  {
    date: "2020-08-11",
    time: 1985,
  },
  {
    date: "2020-08-12",
    time: 391,
  },
  {
    date: "2020-08-13",
    time: 928,
  },
  {
    date: "2020-08-14",
    time: 232,
  },
  {
    date: "2020-08-15",
    time: 329,
  },
  {
    date: "2020-08-16",
    time: 1229,
  },
  {
    date: "2020-08-17",
    time: 635,
  },
  {
    date: "2020-08-18",
    time: 74,
  },
  {
    date: "2020-08-19",
    time: 0,
  },
  {
    date: "2020-08-20",
    time: 0,
  },
  {
    date: "2020-08-21",
    time: 0,
  },
  {
    date: "2020-08-22",
    time: 0,
  },
  {
    date: "2020-08-23",
    time: 0,
  },
  {
    date: "2020-08-24",
    time: 0,
  },
  {
    date: "2020-08-25",
    time: 0,
  },
  {
    date: "2020-08-26",
    time: 0,
  },
  {
    date: "2020-08-27",
    time: 0,
  },
  {
    date: "2020-08-28",
    time: 0,
  },
  {
    date: "2020-08-29",
    time: 0,
  },
  {
    date: "2020-08-30",
    time: 0,
  },
  {
    date: "2020-08-31",
    time: 0,
  },
]

export const statsYearly = [
  {
    date: "2020-01",
    time: 26493,
  },
  {
    date: "2020-02",
    time: 34355,
  },
  {
    date: "2020-03",
    time: 47618,
  },
  {
    date: "2020-04",
    time: 59038,
  },
  {
    date: "2020-05",
    time: 33426,
  },
  {
    date: "2020-06",
    time: 35546,
  },
  {
    date: "2020-07",
    time: 49366,
  },
  {
    date: "2020-08",
    time: 36009,
  },
  {
    date: "2020-09",
    time: 0,
  },
  {
    date: "2020-10",
    time: 0,
  },
  {
    date: "2020-11",
    time: 0,
  },
  {
    date: "2020-12",
    time: 0,
  },
]
