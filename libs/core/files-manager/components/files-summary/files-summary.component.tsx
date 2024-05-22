/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import FilesSummaryItem from "Core/files-manager/components/files-summary-item/files-summary-item.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { DiskSpaceCategory } from "Core/files-manager/components/files-manager-core/files-manager.interface"
import { FilesSummaryTestIds } from "Core/files-manager/components/files-summary/files-summary-test-ids.enum"
import {
  FilesSummaryContainer,
  FilesSummaryHeading,
  StatsContainer,
} from "Core/files-manager/components/files-manager-core/files-manager.styled"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import StackedBarChart, {
  DisplayStyle,
  ChartItem,
} from "Core/__deprecated__/renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { convertBytes } from "Core/core/helpers/convert-bytes/convert-bytes"
import { Message } from "Core/__deprecated__/renderer/interfaces/message.interface"

const FilesSummaryWrapper = styled.div`
  display: flex;
  margin-bottom: 2.4rem;
  div:not(:last-of-type) {
    margin-right: 3.2rem;
  }
`

interface Props {
  diskSpaceCategories: DiskSpaceCategory[]
  usedMemory: number
  totalMemorySpace: number
  summaryTitleMessage: Message
}

const memoryToStackedBarChartData = (
  diskSpaceCategories: DiskSpaceCategory[]
): ChartItem[] => {
  return diskSpaceCategories.map((diskSpaceCategory) => {
    const { size, color } = diskSpaceCategory
    return {
      value: size,
      color,
    }
  })
}

const FilesSummary: FunctionComponent<Props> = ({
  diskSpaceCategories,
  usedMemory,
  totalMemorySpace,
  summaryTitleMessage,
}) => {
  const usedMemoryPercent = Math.floor((usedMemory / totalMemorySpace) * 100)

  return (
    <FilesSummaryContainer>
      <FilesSummaryHeading
        data-testid={FilesSummaryTestIds.Title}
        displayStyle={TextDisplayStyle.Headline3}
        message={summaryTitleMessage}
      />
      <FilesSummaryWrapper data-testid={FilesSummaryTestIds.Wrapper}>
        {diskSpaceCategories.map((diskSpaceCategory, index: number) => (
          <FilesSummaryItem {...diskSpaceCategory} key={index} />
        ))}
      </FilesSummaryWrapper>
      <StackedBarChart
        displayStyle={DisplayStyle.Thick}
        chartData={memoryToStackedBarChartData(diskSpaceCategories)}
      />
      <StatsContainer>
        <Text
          displayStyle={TextDisplayStyle.Paragraph3}
          color="secondary"
          testId={FilesSummaryTestIds.UsedMemory}
        >
          {`${convertBytes(usedMemory)} (${usedMemoryPercent}%)`}
        </Text>
        <Text
          displayStyle={TextDisplayStyle.Paragraph3}
          color="secondary"
          testId={FilesSummaryTestIds.TotalMemory}
        >
          {convertBytes(totalMemorySpace)}
        </Text>
      </StatsContainer>
    </FilesSummaryContainer>
  )
}

export default FilesSummary
