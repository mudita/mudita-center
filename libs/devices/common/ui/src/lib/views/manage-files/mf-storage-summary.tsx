/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { TypographyModifier } from "app-theme/models"
import { formatMessage } from "app-localize/utils"
import {
  formatBytes,
  ISegmentBarItem,
  SegmentBar,
  Typography,
} from "app-theme/ui"
import { manageFilesMessages } from "./manage-files.messages"

interface Props {
  summaryHeader: string
  usedSpaceBytes: number
  freeSpaceBytes: number
  segments: ISegmentBarItem[]
}

export const MfStorageSummary: FunctionComponent<Props> = ({
  summaryHeader,
  usedSpaceBytes,
  freeSpaceBytes,
  segments,
}) => {
  const usedText = `${formatMessage(manageFilesMessages.summaryUsedLabel)} ${formatBytes(usedSpaceBytes, { minUnit: "KB" })}`

  return (
    <Wrapper>
      <Header>{summaryHeader}</Header>
      <Content>
        <UsedText>{usedText}</UsedText>
        <FreeText modifier={TypographyModifier.FormatBytes} minUnit={"KB"}>
          {freeSpaceBytes}
        </FreeText>
        <SegmentBarWrapper>
          <SegmentBar segments={segments} />
        </SegmentBarWrapper>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 3.2rem 3.2rem 6.4rem 3.2rem;
  display: flex;
  flex-direction: column;
`

const Header = styled(Typography.H3)`
  margin: 0 0 2.4rem 0;
`

const Content = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
`

const UsedText = styled(Typography.P3)`
  display: flex;
  color: ${({ theme }) => theme.app.color.black};
  grid-area: 1 / 1 / 2 / 2;
`

const FreeText = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.grey2};
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const SegmentBarWrapper = styled.div`
  grid-area: 2 / 1 / 3 / 3;
  margin: 0.4rem 0 0 0;
`
