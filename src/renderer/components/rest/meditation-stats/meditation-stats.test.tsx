import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import MeditationStats, {
  ChartType,
  MeditationStatsProps,
} from "Renderer/components/rest/meditation-stats/meditation-stats.component"
import {
  generateWeeklyMediationData,
  generateMonthlyMeditationData,
  generateYearlyMeditationData,
} from "App/__mocks__/meditation-stats.mock"
import { MeditationStatsTestIds } from "Renderer/components/rest/meditation-stats/meditation-stats.interface"
import moment from "moment"
import theme from "Renderer/styles/theming/theme"

const mainLabel = "view.name.meditationStats.chart.mainLabel"

const renderMeditationStats = ({ chartType, data }: MeditationStatsProps) => {
  const outcome = renderWithThemeAndIntl(
    <MeditationStats chartType={chartType} data={data} />
  )
  return {
    ...outcome,
    getBarWrappers: () =>
      outcome.getAllByTestId(MeditationStatsTestIds.BarWrapper),
    getGroupWrappers: () =>
      outcome.getAllByTestId(MeditationStatsTestIds.GroupWrapper),
    getXLabels: () => outcome.getAllByTestId(MeditationStatsTestIds.XAxisLabel),
    getYLabels: () => outcome.getAllByTestId(MeditationStatsTestIds.YAxisLabel),
    getHorizontalLines: () =>
      outcome.getAllByTestId(MeditationStatsTestIds.HorizontalLine),
  } as const
}

let chart: ReturnType<typeof renderMeditationStats>

describe("general meditation stats", () => {
  beforeEach(() => {
    chart = renderMeditationStats({
      chartType: ChartType.Weekly,
      data: generateWeeklyMediationData(),
    })
  })

  test("renders horizontal lines properly", () => {
    const { getHorizontalLines } = chart
    getHorizontalLines().forEach((line, index) => {
      expect(line).toHaveStyleRule("bottom", `${index * 25}%`)
    })
  })

  test("renders horizontal labels properly", () => {
    const { getYLabels } = chart
    getYLabels().forEach((label, index) => {
      expect(label).toHaveStyleRule("bottom", `${(index + 1) * 25}%`)
    })
  })

  test("renders title properly", () => {
    const { getByText } = chart
    expect(getByText(mainLabel, { exact: false })).toBeTranslationKey()
  })
})

describe("weekly meditation stats", () => {
  beforeEach(() => {
    chart = renderMeditationStats({
      chartType: ChartType.Weekly,
      data: generateWeeklyMediationData(),
    })
  })

  test("renders weekdays bars properly", () => {
    const { getBarWrappers } = chart
    expect(getBarWrappers()).toHaveLength(7)
  })

  test("renders weekdays labels properly", () => {
    const { getXLabels } = chart
    expect(getXLabels()).toHaveLength(7)
    getXLabels().forEach((label, index) => {
      const date = moment().startOf("isoWeek").add(index, "days")
      expect(label).toHaveTextContent(date.format("ddd"))
    })
  })

  test("highlights current bar properly", () => {
    const { getBarWrappers } = chart
    const currentBarWrapper = getBarWrappers()[moment().isoWeekday() - 1]

    expect(currentBarWrapper.querySelector("div")).toHaveStyleRule(
      "background-color",
      theme.color.background.chartBar
    )
  })

  test("highlights current label properly", () => {
    const { getXLabels } = chart

    expect(getXLabels()[moment().isoWeekday() - 1]).toHaveStyle(
      "font-weight: 600;"
    )
  })
})

describe("monthly meditation stats", () => {
  beforeEach(() => {
    chart = renderMeditationStats({
      chartType: ChartType.Monthly,
      data: generateMonthlyMeditationData(),
    })
  })

  test("renders days bars properly", () => {
    const { getBarWrappers, getGroupWrappers } = chart
    expect(getBarWrappers()).toHaveLength(moment().daysInMonth())
    expect(getGroupWrappers()).toHaveLength(
      Math.ceil(moment().daysInMonth() / 7)
    )
  })

  test("renders groups labels properly", () => {
    const { getXLabels } = chart
    expect(getXLabels()).toHaveLength(Math.ceil(moment().daysInMonth() / 7))
  })

  test("highlights current bar properly", () => {
    const { getBarWrappers } = chart
    const dayIndex = Number(moment().format("D"))
    const currentBarWrapper = getBarWrappers()[dayIndex]

    expect(currentBarWrapper.querySelector("div")).toHaveStyleRule(
      "background-color",
      theme.color.background.chartBar
    )
  })

  test("highlights current label properly", () => {
    const { getXLabels } = chart
    const dayIndex = Number(moment().format("D"))

    expect(getXLabels()[Math.ceil(dayIndex / 7) - 1]).toHaveStyle(
      "font-weight: 600;"
    )
  })
})

describe("yearly meditation stats", () => {
  beforeEach(() => {
    chart = renderMeditationStats({
      chartType: ChartType.Yearly,
      data: generateYearlyMeditationData(),
    })
  })

  test("renders months bars properly", () => {
    const { getBarWrappers } = chart
    expect(getBarWrappers()).toHaveLength(12)
  })

  test("highlights current bar properly", () => {
    const { getBarWrappers } = chart
    const monthIndex = Number(moment().format("M")) - 1
    const currentBarWrapper = getBarWrappers()[monthIndex]

    expect(currentBarWrapper.querySelector("div")).toHaveStyleRule(
      "background-color",
      theme.color.background.chartBar
    )
  })

  test("highlights current label properly", () => {
    const { getXLabels } = chart
    const monthIndex = Number(moment().format("M")) - 1

    expect(getXLabels()[monthIndex]).toHaveStyle("font-weight: 600;")
  })
})
