import * as React from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { borderRadius, height } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import { convertBytes } from "Renderer/utils/convert-bytes"
import styled, { css } from "styled-components"

export enum DisplayStyle {
  Thin,
  Thick,
}

export interface ChartItem {
  value: number
  color: string
  free?: boolean
}

interface Props {
  chartData: ChartItem[]
  displayStyle?: DisplayStyle
  labels?: boolean
}

interface BarProps {
  color: string
  percentage: number
  borderType?: DisplayStyle
  barHeight?: DisplayStyle
}

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Progress = styled.div`
  display: flex;
  width: 100%;
`

const Bar = styled.div<BarProps>`
  width: ${({ percentage }) => percentage}%;
  background-color: ${({ color }) => color};

  &:first-child {
    border-radius: var(--radius) 0 0 var(--radius);
  }
  &:last-child {
    border-radius: 0 var(--radius) var(--radius) 0;
  }

  ${({ borderType }) => {
    switch (borderType) {
      case DisplayStyle.Thin:
        return css`
          --radius: ${borderRadius("small")};
        `
      case DisplayStyle.Thick:
        return css`
          --radius: ${borderRadius("medium")};
        `
      default:
        return null
    }
  }}

  ${({ barHeight }) => {
    switch (barHeight) {
      case DisplayStyle.Thin:
        return css`
          height: ${height("small")}rem;
        `
      case DisplayStyle.Thick:
        return css`
          height: ${height("medium")}rem;
        `
      default:
        return null
    }
  }}
`

const BarWithLabel = styled(Bar)<Omit<BarProps, "borderType">>`
  position: relative;
`

const BarLabel = styled(Text)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateX(50%);
  width: max-content;
  margin: 1.4rem 0;
`

const PercentageLabel = styled(Text)`
  margin-left: 0.5rem;
`

const MemoryLabel = styled(Text)`
  margin-left: 2.4rem;
  white-space: nowrap;
`

const StackedBarChart: FunctionComponent<Props> = ({
  className,
  chartData,
  displayStyle = DisplayStyle.Thick,
  labels,
}) => {
  const availableSpace = (data: ChartItem[]): number =>
    data.reduce((acc, { value }) => acc + value, 0)
  const usedMemoryInBytes = chartData
    .filter(chartObject => !chartObject.free)
    .reduce((acc, { value }) => acc + value, 0)
  const usedMemoryConverted =
    labels && convertBytes(usedMemoryInBytes, { fixedFractionDigits: false })
  const percentageOfAvailableSpace = (value: number) =>
    (value / availableSpace(chartData)) * 100
  const barData = chartData.map(obj => ({
    ...obj,
    percentage: percentageOfAvailableSpace(obj.value),
  }))
  const indexOfOneBeforeLast = barData.length >= 2 && barData.length - 2
  const formatPercentage = (value: number) => {
    const isInt = Number.isInteger(value)
    if (isInt) {
      return value
    }
    return value.toFixed(2)
  }
  return (
    <ProgressWrapper className={className}>
      <Progress>
        {barData.map(({ color, percentage }, index) => {
          if (index === indexOfOneBeforeLast && labels) {
            return (
              <BarWithLabel
                barHeight={displayStyle}
                data-testid="bar-with-label"
                color={color}
                percentage={percentage}
                key={index}
              >
                <BarLabel
                  displayStyle={TextDisplayStyle.MediumText}
                  data-testid="occupied-space"
                >
                  {usedMemoryConverted}
                  <PercentageLabel
                    displayStyle={TextDisplayStyle.MediumFadedLightText}
                    element="span"
                  >
                    {`( ${formatPercentage(
                      percentageOfAvailableSpace(usedMemoryInBytes)
                    )}%)`}
                  </PercentageLabel>
                </BarLabel>
              </BarWithLabel>
            )
          }
          return (
            <Bar
              borderType={displayStyle}
              barHeight={displayStyle}
              color={color}
              percentage={percentage}
              key={index}
              data-testid="bar"
            />
          )
        })}
      </Progress>
      {labels && (
        <MemoryLabel
          displayStyle={TextDisplayStyle.TertiaryHeading}
          element={"p"}
        >
          {convertBytes(availableSpace(chartData), {
            fixedFractionDigits: false,
          })}
        </MemoryLabel>
      )}
    </ProgressWrapper>
  )
}

export default StackedBarChart
