/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { DiskSpaceCategory } from "App/files-manager/components/files-manager/files-manager.interface"
import {
  backgroundColor,
  borderRadius,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import styled from "styled-components"
import Icon, {
  IconSize,
} from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { FilesSummaryItemTestIds } from "App/files-manager/components/files-summary-item/files-summary-item-test-ids.enum"
import { defineMessages } from "react-intl"
import { convertBytes } from "App/core/helpers/convert-bytes/convert-bytes"

const FilesSummaryItemContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${backgroundColor("row")};
  padding: 1.6rem;
  width: 28rem;
`

const SummaryIcon = styled(Icon)<{ fileColor: string }>`
  margin-right: 1.6rem;
  background-color: ${({ fileColor }) => fileColor};
  border-radius: ${borderRadius("medium")};
  padding: 1.2rem;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`
export const messages = defineMessages({
  summaryItemDescription: {
    id: "component.filesManagerSummaryItemDescription",
  },
})

const FilesSummaryItem: FunctionComponent<DiskSpaceCategory> = ({
  color,
  filesAmount,
  label,
  size = 0,
  icon,
}) => {
  return (
    <FilesSummaryItemContainer data-testid={FilesSummaryItemTestIds.Wrapper}>
      <SummaryIcon fileColor={color} type={icon} size={IconSize.Medium} />
      <TextWrapper>
        <Text
          displayStyle={TextDisplayStyle.Paragraph1}
          element={"p"}
          data-testid={FilesSummaryItemTestIds.Title}
        >
          {label}
        </Text>
        {filesAmount ? (
          <Text
            displayStyle={TextDisplayStyle.Paragraph4}
            data-testid={FilesSummaryItemTestIds.Description}
            message={{
              ...messages.summaryItemDescription,
              values: {
                filesAmount: filesAmount,
                size: convertBytes(size),
              },
            }}
          />
        ) : (
          <Text
            displayStyle={TextDisplayStyle.Paragraph4}
            element={"p"}
            data-testid={FilesSummaryItemTestIds.Description}
          >
            {`(${convertBytes(size)})`}
          </Text>
        )}
      </TextWrapper>
    </FilesSummaryItemContainer>
  )
}

export default FilesSummaryItem
