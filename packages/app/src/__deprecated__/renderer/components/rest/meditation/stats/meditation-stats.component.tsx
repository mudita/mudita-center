/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import formatDuration from "App/__deprecated__/renderer/utils/format-duration"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import moment from "moment"
import chunk from "lodash/chunk"
import { defineMessages } from "react-intl"
import {
  Bar,
  Bars,
  BarWrapper,
  Chart,
  Grid,
  GroupWrapper,
  HorizontalLine,
  Label,
  Tooltip,
  YAxis,
  YAxisTitle,
} from "App/__deprecated__/renderer/components/rest/meditation/stats/meditation-stats.styled"
import {
  ChartType,
  MeditationStatsTestIds,
} from "App/__deprecated__/renderer/components/rest/meditation/stats/meditation-stats.enum"
import {
  formatDate,
  getMaxChartValue,
} from "App/__deprecated__/renderer/components/rest/meditation/stats/meditation-stats.helpers"

export interface StatsData {
  date: string
  time: number
}

export interface MeditationStatsProps {
  statsData: StatsData[]
  chartType: ChartType
}

const messages = defineMessages({
  mainLabel: {
    id: "module.meditation.statsMainLabel",
  },
})

const MeditationStats: FunctionComponent<MeditationStatsProps> = ({
  className,
  chartType,
  statsData,
}) => {
  const dateFormat = chartType === ChartType.Yearly ? "YYYY-MM" : "YYYY-MM-DD"
  const activeBarIndex = statsData.findIndex(
    ({ date }) => date === moment().format(dateFormat)
  )
  const times = statsData?.map(({ time }) => time)
  const maxTime = Math.max(...times)

  const maxChartValue = getMaxChartValue(maxTime)

  const horizontalGridLines = [0, 25, 50, 75, 100]

  const renderBarWrapper = (
    index: number,
    barData: StatsData,
    withLabel?: boolean
  ) => {
    const { date, time } = barData
    return (
      <BarWrapper
        key={index}
        active={activeBarIndex === index}
        disabled={index > activeBarIndex && activeBarIndex > -1}
        data-testid={MeditationStatsTestIds.BarWrapper}
      >
        <Bar
          height={(time / maxChartValue) * 100}
          data-active={activeBarIndex === index}
        >
          <Tooltip>
            <Text displayStyle={TextDisplayStyle.Label}>
              {formatDuration(time)}
            </Text>
          </Tooltip>
        </Bar>
        {withLabel && (
          <Label
            data-testid={MeditationStatsTestIds.XAxisLabel}
            data-active={activeBarIndex === index}
          >
            {formatDate(date, chartType)}
          </Label>
        )}
      </BarWrapper>
    )
  }

  return (
    <Chart className={className} chartType={chartType}>
      <Bars>
        {chartType === ChartType.Monthly
          ? chunk(statsData, 7).map((week, weekIndex) => {
              const daysInMonth = moment(statsData[0].date).daysInMonth()
              const lastDay = 7 + weekIndex * 7
              const firstWeekDay = 1 + weekIndex * 7
              const lastWeekDay = lastDay < daysInMonth ? lastDay : daysInMonth
              const active = week.includes(statsData[activeBarIndex])
              return (
                <GroupWrapper
                  key={weekIndex}
                  bars={week.length}
                  active={active}
                  data-testid={MeditationStatsTestIds.GroupWrapper}
                >
                  {week.map((barData, dayIndex) => {
                    const barIndex = weekIndex * 7 + dayIndex
                    return renderBarWrapper(barIndex, barData)
                  })}
                  <Label
                    data-testid={MeditationStatsTestIds.XAxisLabel}
                    data-active={active}
                  >
                    {firstWeekDay === lastWeekDay
                      ? firstWeekDay
                      : `${firstWeekDay} - ${lastWeekDay}`}
                  </Label>
                </GroupWrapper>
              )
            })
          : statsData.map((barData, index) => {
              return renderBarWrapper(index, barData, true)
            })}
      </Bars>
      <Grid>
        {horizontalGridLines.map((percent, index) => (
          <HorizontalLine
            key={index}
            position={percent}
            data-testid={MeditationStatsTestIds.HorizontalLine}
          />
        ))}
        <YAxis>
          {horizontalGridLines.map((percent, index) =>
            percent ? (
              <Label
                key={index}
                position={percent}
                data-testid={MeditationStatsTestIds.YAxisLabel}
              >
                {formatDuration((maxChartValue / 4) * index)}
              </Label>
            ) : null
          )}
        </YAxis>
        <YAxisTitle message={messages.mainLabel} />
      </Grid>
    </Chart>
  )
}

export default MeditationStats
