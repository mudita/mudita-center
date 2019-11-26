import * as React from "react"
import Text, { TextDisplayStyle } from "Renderer/components/text/text.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Progress = styled.div`
  display: flex;
  background-color: ${backgroundColor("free")};
  width: 90%;
  height: 10px;
`

const Bar = styled.div<{ color: string; percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  height: 10px;
  background-color: ${({ color }) => color};
`

const OtherText = styled(Text)`
  margin-left: 30px;
`

interface Props {
  chartData: Array<{ value: number; color: string }>
  maxLabel: string
}

const StackedBarChart: FunctionComponent<Props> = ({ chartData, maxLabel }) => {
  const max = chartData.reduce((acc, { value }) => acc + value, 0)
  const barData = chartData.map(obj => ({
    ...obj,
    percentage: (obj.value / max) * 100,
  }))
  console.log(barData)
  return (
    <ProgressWrapper>
      <Progress>
        {barData.map(bar => (
          <Bar color={bar.color} percentage={bar.percentage} key={bar.color} />
        ))}
      </Progress>
      <OtherText displayStyle={TextDisplayStyle.TertiaryBoldHeading} as="p">
        {maxLabel}
      </OtherText>
    </ProgressWrapper>
  )
}

export default StackedBarChart
