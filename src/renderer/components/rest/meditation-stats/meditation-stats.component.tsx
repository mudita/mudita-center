import React, { Fragment } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import formatDuration from "Renderer/utils/format-duration"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
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
} from "Renderer/components/rest/meditation-stats/meditation-stats.styled"
import { MeditationStatsTestIds } from "Renderer/components/rest/meditation-stats/meditation-stats.interface"

export enum ChartType {
  Weekly,
  Monthly,
  Yearly,
}

export interface BarData {
  date: string
  time: number
}

export interface MeditationStatsProps {
  data: BarData[]
  chartType: ChartType
}

const messages = defineMessages({
  mainLabel: {
    id: "view.name.meditationStats.chart.mainLabel",
  },
})

const MeditationStats: FunctionComponent<MeditationStatsProps> = ({
  className,
  chartType,
  data,
}) => {
  const dateFormat = chartType === ChartType.Yearly ? "YYYY-MM" : "YYYY-MM-DD"
  const activeBarIndex = data.findIndex(
    ({ date }) => date === moment().format(dateFormat)
  )
  const times = data?.map(({ time }) => time)
  const maxTime = Math.max(...times)

  const getYAxisGradation = () => {
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

  const getMaxChartValue = () => {
    const gradation = getYAxisGradation()
    const max = (maxTime - (maxTime % gradation)) / gradation
    return (max - (max % 4) + 4) * gradation
  }

  const maxChartValue = getMaxChartValue()

  const horizontalGridLines = [0, 25, 50, 75, 100]

  const formatDate = (date: string) => {
    switch (chartType) {
      case ChartType.Weekly:
        return moment(date).format("ddd")
      case ChartType.Monthly:
        return moment(date).format("D")
      case ChartType.Yearly:
        return moment(date).format("MMM")
    }
  }

  const renderBarWrapper = (
    index: number,
    barData: BarData,
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
        <Bar height={(time / maxChartValue) * 100}>
          <Tooltip>
            <Text displayStyle={TextDisplayStyle.SmallFadedText}>
              {formatDuration(time)}
            </Text>
          </Tooltip>
        </Bar>
        {withLabel && (
          <Label data-testid={MeditationStatsTestIds.XAxisLabel}>
            {formatDate(date)}
          </Label>
        )}
      </BarWrapper>
    )
  }

  return (
    <Chart className={className} chartType={chartType}>
      <Bars>
        {chartType === ChartType.Monthly
          ? chunk(data, 7).map((week, weekIndex) => {
              const daysInMonth = moment(data[0].date).daysInMonth()
              const lastDay = 7 + weekIndex * 7
              const firstWeekDay = 1 + weekIndex * 7
              const lastWeekDay = lastDay < daysInMonth ? lastDay : daysInMonth
              const active = week.includes(data[activeBarIndex])
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
                  <Label data-testid={MeditationStatsTestIds.XAxisLabel}>
                    {firstWeekDay === lastWeekDay
                      ? firstWeekDay
                      : `${firstWeekDay} - ${lastWeekDay}`}
                  </Label>
                </GroupWrapper>
              )
            })
          : data.map((barData, index) => {
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
          {horizontalGridLines.map((percent, index) => (
            <Fragment key={index}>
              {Boolean(percent) && (
                <Label
                  position={percent}
                  data-testid={MeditationStatsTestIds.YAxisLabel}
                >
                  {formatDuration((maxChartValue / 4) * index)}
                </Label>
              )}
            </Fragment>
          ))}
        </YAxis>
        <YAxisTitle message={messages.mainLabel} />
      </Grid>
    </Chart>
  )
}

export default MeditationStats
