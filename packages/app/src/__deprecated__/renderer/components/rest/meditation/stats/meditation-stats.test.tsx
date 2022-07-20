/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import MeditationStats, {
  MeditationStatsProps,
} from "App/__deprecated__/renderer/components/rest/meditation/stats/meditation-stats.component"
import {
  statsMonthly,
  statsWeekly,
  statsYearly,
} from "App/__mocks__/meditation-stats.mock"
import {
  ChartType,
  MeditationStatsTestIds,
} from "App/__deprecated__/renderer/components/rest/meditation/stats/meditation-stats.enum"

const mainLabel = "module.meditation.statsMainLabel"

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
const mockedDate = 1598832000000 // 2020-08-31
const dateMock = jest.spyOn(Date, "now").mockImplementation(() => mockedDate)

describe("general meditation stats", () => {
  beforeAll(() => dateMock)
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
  beforeAll(() => dateMock)
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
      const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      expect(label).toHaveTextContent(dayLabels[index])
    })
  })

  test("highlights current bar properly", () => {
    const { getBarWrappers } = chart
    const currentBarWrapper = getBarWrappers()[0]

    expect(currentBarWrapper.querySelector("div")).toHaveAttribute(
      "data-active",
      "true"
    )
  })

  test("highlights current label properly", () => {
    const { getXLabels } = chart

    expect(getXLabels()[0]).toHaveAttribute("data-active", "true")
  })
})

describe("monthly meditation stats", () => {
  beforeAll(() => dateMock)
  beforeEach(() => {
    chart = renderMeditationStats({
      chartType: ChartType.Monthly,
      statsData: statsMonthly,
    })
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  const dayIndex = 30
  const daysInMonth = 31

  test("renders days bars properly", () => {
    const { getBarWrappers, getGroupWrappers } = chart
    expect(getBarWrappers()).toHaveLength(daysInMonth)
    expect(getGroupWrappers()).toHaveLength(Math.ceil(daysInMonth / 7))
  })

  test("renders groups labels properly", () => {
    const { getXLabels } = chart
    expect(getXLabels()).toHaveLength(Math.ceil(daysInMonth / 7))
  })

  test("highlights current bar properly", () => {
    const { getBarWrappers } = chart
    const currentBarWrapper = getBarWrappers()[dayIndex]

    expect(currentBarWrapper.querySelector("div")).toHaveAttribute(
      "data-active",
      "true"
    )
  })

  test("highlights current label properly", () => {
    const { getXLabels } = chart

    expect(getXLabels()[Math.ceil(dayIndex / 7) - 1]).toHaveAttribute(
      "data-active",
      "true"
    )
  })
})

describe("yearly meditation stats", () => {
  beforeAll(() => dateMock)
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

    expect(currentBarWrapper.querySelector("div")).toHaveAttribute(
      "data-active",
      "true"
    )
  })

  test("highlights current label properly", () => {
    const { getXLabels } = chart
    expect(getXLabels()[monthIndex]).toHaveAttribute("data-active", "true")
  })
})
