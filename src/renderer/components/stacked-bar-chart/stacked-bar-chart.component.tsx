import * as React from "react"
import Text, { TextDisplayStyle } from "Renderer/components/text/text.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

export enum DisplayStyle {
  Simple,
  MultiColor,
}

interface Props {
  chartData: Array<{ value: number; color: string }>
  maxLabel?: string
  displayStyle: DisplayStyle
  occupiedSpaceLabel?: string
  occupiedSpaceInPercent?: string
}

interface BarInterface {
  color: string
  percentage: number
  borderType?: DisplayStyle
}

const simpleBorderStyles = css`
  &:first-child {
    border-top-left-radius: 1.5px;
    border-bottom-left-radius: 1.5px;
  }

  &:last-child {
    border-top-right-radius: 1.5px;
    border-bottom-right-radius: 1.5px;
  }
`

const multiColorBorderStyles = css`
  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Progress = styled.div<{ barHeight: DisplayStyle }>`
  display: flex;
  background-color: ${backgroundColor("free")};
  width: 90%;
  height: 8px;
  ${({ barHeight }) => {
    switch (barHeight) {
      case 0:
        return css`
          height: 3px;
        `
      case 1:
        return css`
          height: 8px;
        `
      default:
        return null
    }
  }}
`

const Bar = styled.div<BarInterface>`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: ${({ color }) => color};

  ${({ borderType }) => {
    switch (borderType) {
      case 0:
        return simpleBorderStyles
      case 1:
        return multiColorBorderStyles
      default:
        return null
    }
  }}
`

const BarWithLabel = styled(Bar)<Omit<BarInterface, "borderType">>`
  position: relative;
`

const BarLabel = styled(Text)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateX(50%);
  width: max-content;
`

const PercentageLabel = styled(Text)`
  margin-left: 5px;
`

const MemoryLabel = styled(Text)`
  margin-left: 24px;
`

const StackedBarChart: FunctionComponent<Props> = ({
  chartData,
  maxLabel,
  occupiedSpaceLabel,
  occupiedSpaceInPercent,
  displayStyle,
}) => {
  const max = chartData.reduce((acc, { value }) => acc + value, 0)
  const barData = chartData.map(obj => ({
    ...obj,
    percentage: (obj.value / max) * 100,
  }))
  const oneBeforeLast = barData.length - 2
  return (
    <ProgressWrapper>
      <Progress barHeight={displayStyle}>
        {barData.map(({ color, percentage }, index) => {
          if (index === oneBeforeLast) {
            return (
              <BarWithLabel color={color} percentage={percentage} key={index}>
                <BarLabel displayStyle={TextDisplayStyle.MediumText}>
                  {occupiedSpaceLabel}
                  <PercentageLabel
                    displayStyle={TextDisplayStyle.MediumFadedLightText}
                    element="span"
                  >
                    {occupiedSpaceInPercent}
                  </PercentageLabel>
                </BarLabel>
              </BarWithLabel>
            )
          }
          return (
            <Bar
              borderType={displayStyle}
              color={color}
              percentage={percentage}
              key={index}
            />
          )
        })}
      </Progress>
      <MemoryLabel
        displayStyle={TextDisplayStyle.TertiaryHeading}
        element={"p"}
      >
        {maxLabel}
      </MemoryLabel>
    </ProgressWrapper>
  )
}

export default StackedBarChart
