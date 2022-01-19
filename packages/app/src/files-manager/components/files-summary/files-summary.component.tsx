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
  MemorySpaceCategory,
} from "App/files-manager/components/files-manager/files-manager.component"
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
import { filesSummaryElements } from "App/files-manager/constants"

const FilesSummaryWrapper = styled.div`
  display: flex;
  margin-bottom: 2.4rem;
`

export const messages = defineMessages({
  summaryTitle: { id: "component.filesManagerSummaryTitle" },
})

interface Props {
  memorySpace: MemorySpaceCategory
}

const FilesSummary: FunctionComponent<Props> = ({ memorySpace }) => {
  const { full, free } = memorySpace
  const systemMemory = full - free
  const fullMemoryPercent = Math.floor((systemMemory / full) * 100)

  const filesSummaryData: DiskSpaceCategory[] = filesSummaryElements.map(
    (element) => {
      if (element.filesType === "Free") {
        return {
          ...element,
          occupiedMemory: free,
          free: true,
        }
      }
      if (element.filesType === "Used space") {
        return {
          ...element,
          occupiedMemory: systemMemory,
        }
      }
      return element
    }
  )
  const filteredData = filesSummaryData.filter(
    (element) => element.occupiedMemory
  )
  const memoryToStackedBarChartData = (
    data: DiskSpaceCategory[]
  ): ChartItem[] => {
    return data.map((el) => {
      const { occupiedMemory, color } = el
      return {
        value: occupiedMemory ? occupiedMemory : 0,
        color,
      }
    })
  }

  return (
    <FilesSummaryContainer>
      <FilesSummaryHeading
        data-testid={FilesSummaryTestIds.Title}
        displayStyle={TextDisplayStyle.SecondaryBoldHeading}
        message={messages.summaryTitle}
      />
      <FilesSummaryWrapper data-testid={FilesSummaryTestIds.Wrapper}>
        {filteredData.map((box, index: number) => (
          <FilesSummaryItem {...box} key={index} />
        ))}
      </FilesSummaryWrapper>
      <StackedBarChart
        displayStyle={DisplayStyle.Thick}
        chartData={memoryToStackedBarChartData(filteredData)}
      />
      <StatsContainer>
        <Text displayStyle={TextDisplayStyle.MediumFadedText}>
          {`${systemMemory} MB (${fullMemoryPercent}%)`}
        </Text>
        <Text displayStyle={TextDisplayStyle.MediumFadedText}>
          {`${full} MB`}
        </Text>
      </StatsContainer>
    </FilesSummaryContainer>
  )
}

export default FilesSummary
