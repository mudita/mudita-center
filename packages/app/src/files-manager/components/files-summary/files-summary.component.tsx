/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import FilesSummaryItem from "App/files-manager/components/files-summary-item/files-summary-item.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import {
  DiskSpaceCategory,
  MemorySpace,
} from "App/files-manager/components/files-manager/files-manager.interface"
import { FilesSummaryTestIds } from "App/files-manager/components/files-summary/files-summary-test-ids.enum"
import {
  FilesSummaryContainer,
  FilesSummaryHeading,
  StatsContainer,
} from "App/files-manager/components/files-manager/files-manager.styled"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import StackedBarChart, {
  DisplayStyle,
  ChartItem,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { defineMessages } from "react-intl"
import { convertFromBytesToDecimal } from "Renderer/utils/convert-from-bytes-to-decimal/convert-from-bytes-to-decimal"

const FilesSummaryWrapper = styled.div`
  display: flex;
  margin-bottom: 2.4rem;
  div:not(:last-of-type) {
    margin-right: 3.2rem;
  }
`

export const messages = defineMessages({
  summaryTitle: { id: "component.filesManagerSummaryTitle" },
})

interface Props {
  memorySpace: MemorySpace
  diskSpaceCategories: DiskSpaceCategory[]
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
  memorySpace,
  diskSpaceCategories,
}) => {
  const { full, free } = memorySpace
  const systemMemory = full - free
  const fullMemoryPercent = Math.floor((systemMemory / full) * 100)

  return (
    <FilesSummaryContainer>
      <FilesSummaryHeading
        data-testid={FilesSummaryTestIds.Title}
        displayStyle={TextDisplayStyle.SecondaryBoldHeading}
        message={messages.summaryTitle}
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
        <Text displayStyle={TextDisplayStyle.MediumFadedText}>
          {`${convertFromBytesToDecimal(systemMemory)} (${fullMemoryPercent}%)`}
        </Text>
        <Text displayStyle={TextDisplayStyle.MediumFadedText}>
          {convertFromBytesToDecimal(full)}
        </Text>
      </StatsContainer>
    </FilesSummaryContainer>
  )
}

export default FilesSummary
