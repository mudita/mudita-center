import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import MeditationStats, {
  MeditationStatsProps,
} from "Renderer/components/rest/meditation/stats/meditation-stats.component"
import {
  statsMonthly,
  statsWeekly,
  statsYearly,
} from "App/__mocks__/meditation-stats.mock"
import {
  ChartType,
  MeditationStatsTestIds,
} from "Renderer/components/rest/meditation/stats/meditation-stats.enum"
import moment from "moment"
import theme from "Renderer/styles/theming/theme"

const mainLabel = "view.name.meditationStats.chart.mainLabel"

const renderMeditationStats = ({
  chartType,
  statsData,
}: MeditationStatsProps) => {
  const outcome = renderWithThemeAndIntl(
    <MeditationStats chartType={chartType} statsData={statsData} />
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
const commonMock = jest.mock("moment", () => () => ({
  format: () => "2020-08-21",
  daysInMonth: () => 31,
}))

describe("general meditation stats", () => {
  beforeAll(() => commonMock)
  beforeEach(() => {
    chart = renderMeditationStats({
      chartType: ChartType.Weekly,
      statsData: statsWeekly,
    })
  })
  afterAll(() => {
    jest.clearAllMocks()
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
  beforeAll(() => commonMock)
  beforeEach(() => {
    chart = renderMeditationStats({
      chartType: ChartType.Weekly,
      statsData: statsWeekly,
    })
  })
  afterAll(() => {
    jest.clearAllMocks()
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
  beforeAll(() => commonMock)
  beforeEach(() => {
    chart = renderMeditationStats({
      chartType: ChartType.Monthly,
      statsData: statsMonthly,
    })
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  const dayIndex = 20

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
    const currentBarWrapper = getBarWrappers()[dayIndex]

    expect(currentBarWrapper.querySelector("div")).toHaveStyleRule(
      "background-color",
      theme.color.background.chartBar
    )
  })

  test("highlights current label properly", () => {
    const { getXLabels } = chart

    expect(getXLabels()[Math.ceil(dayIndex / 7) - 1]).toHaveStyle(
      "font-weight: 600;"
    )
  })
})

describe("yearly meditation stats", () => {
  beforeAll(() =>
    jest.mock("moment", () => () => ({
      format: () => "Aug",
      daysInMonth: () => 31,
    }))
  )
  beforeEach(() => {
    chart = renderMeditationStats({
      chartType: ChartType.Yearly,
      statsData: statsYearly,
    })
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  const monthIndex = 7

  test("renders months bars properly", () => {
    const { getBarWrappers } = chart
    expect(getBarWrappers()).toHaveLength(12)
  })

  test("highlights current bar properly", () => {
    const { getBarWrappers } = chart
    const currentBarWrapper = getBarWrappers()[monthIndex]

    expect(currentBarWrapper.querySelector("div")).toHaveStyleRule(
      "background-color",
      theme.color.background.chartBar
    )
  })

  test("highlights current label properly", () => {
    const { getXLabels } = chart
    expect(getXLabels()[monthIndex]).toHaveStyle("font-weight: 600;")
  })
})
