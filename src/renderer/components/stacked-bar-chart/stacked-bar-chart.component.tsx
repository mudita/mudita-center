import * as React from "react"
import Text, { TextDisplayStyle } from "Renderer/components/text/text.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Progress = styled.div<{ barHeight?: number }>`
  display: flex;
  background-color: ${backgroundColor("free")};
  width: 90%;
  height: ${({ barHeight }) => barHeight}px;
`

const Bar = styled.div<{ color: string; percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: ${({ color }) => color};
`

const Label = styled(Text)`
  margin-left: 24px;
`

interface Props {
  chartData: Array<{ value: number; color: string }>
  maxLabel: string
  barHeight?: number
}

const StackedBarChart: FunctionComponent<Props> = ({
  chartData,
  maxLabel,
  barHeight = 8,
}) => {
  const max = chartData.reduce((acc, { value }) => acc + value, 0)
  const barData = chartData.map(obj => ({
    ...obj,
    percentage: (obj.value / max) * 100,
  }))
  return (
    <ProgressWrapper>
      <Progress barHeight={barHeight}>
        {barData.map(({ color, percentage }, index) => (
          <Bar color={color} percentage={percentage} key={index} />
        ))}
      </Progress>
      <Label displayStyle={TextDisplayStyle.TertiaryHeading} element={"p"}>
        {maxLabel}
      </Label>
    </ProgressWrapper>
  )
}

export default StackedBarChart
