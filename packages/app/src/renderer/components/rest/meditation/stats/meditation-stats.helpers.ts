/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import moment from "moment"
import { ChartType } from "Renderer/components/rest/meditation/stats/meditation-stats.enum"

/**
 * Calculates recommended time gradation for given amount of seconds.
 * This ensures that Y axis labels will be having nice time roundings.
 *
 * @param {number} maxTime - Maximum seconds from chart data
 * @returns {number} - Time gradation
 *
 */
const getYAxisGradation = (maxTime: number) => {
  const grades = [
    345600,
    86400,
    28800,
    14400,
    3600,
    1800,
    900,
    300,
    60,
    30,
    15,
    5,
  ]
  for (const grade of grades) {
    if (maxTime >= grade * 5) {
      return grade
    }
  }
  return 1
}

/**
 * Calculates the closest (to maxTime) but bigger amount of seconds
 * that is dividable by calculated gradation and 4.
 * This ensures that labels showed at 25%, 50%, 75% and 100%
 * will always be integers and also multipliers of gradation.
 *
 * @param {number} maxTime - Maximum seconds from chart data
 * @returns {number} - Maximum seconds presented on chart
 *
 */
export const getMaxChartValue = (maxTime: number) => {
  const gradation = getYAxisGradation(maxTime)
  const max = (maxTime - (maxTime % gradation)) / gradation
  return (max - (max % 4) + 4) * gradation
}

/**
 * Formats date in a way according to given chart type
 *
 * @param {string} date - Actual date
 * @param {ChartType} chartType - Type of chart view
 * @returns {string} - Formatted date
 *
 */
export const formatDate = (date: string, chartType: ChartType) => {
  return moment(date).format(chartType === ChartType.Yearly ? "MMM" : "ddd")
}
