import * as React from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { borderRadius, height } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

export enum DisplayStyle {
  Simple,
  MultiColor,
}

interface ChartItem {
  value: number
  color: string
}

interface Props {
  chartData: ChartItem[]
  maxLabel?: string
  displayStyle: DisplayStyle
  occupiedSpaceLabel?: string
  occupiedSpaceInPercent?: string
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
  width: 90%;
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
      case DisplayStyle.Simple:
        return css`
          --radius: ${borderRadius("small")};
        `
      case DisplayStyle.MultiColor:
        return css`
          --radius: ${borderRadius("medium")};
        `
      default:
        return null
    }
  }}

  ${({ barHeight }) => {
    switch (barHeight) {
      case DisplayStyle.Simple:
        return css`
          height: ${height("small")}rem;
        `
      case DisplayStyle.MultiColor:
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
`

const StackedBarChart: FunctionComponent<Props> = ({
  chartData,
  maxLabel,
  occupiedSpaceLabel,
  occupiedSpaceInPercent,
  displayStyle,
}) => {
  const sum = chartData.reduce((acc, { value }) => acc + value, 0)
  const barData = chartData.map(obj => ({
    ...obj,
    percentage: (obj.value / sum) * 100,
  }))
  const oneBeforeLast = barData.length - 2
  return (
    <ProgressWrapper>
      <Progress>
        {barData.map(({ color, percentage }, index) => {
          if (
            index === oneBeforeLast &&
            occupiedSpaceLabel &&
            occupiedSpaceInPercent
          ) {
            return (
              <BarWithLabel
                barHeight={displayStyle}
                data-testid="bar-with-label"
                color={color}
                percentage={percentage}
                key={index}
              >
                <BarLabel displayStyle={TextDisplayStyle.MediumText}>
                  {occupiedSpaceLabel}
                  <PercentageLabel
                    displayStyle={TextDisplayStyle.MediumFadedLightText}
                    element="span"
                  >
                    ( {occupiedSpaceInPercent})
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
      {maxLabel && (
        <MemoryLabel
          displayStyle={TextDisplayStyle.TertiaryHeading}
          element={"p"}
        >
          {maxLabel}
        </MemoryLabel>
      )}
    </ProgressWrapper>
  )
}

export default StackedBarChart
