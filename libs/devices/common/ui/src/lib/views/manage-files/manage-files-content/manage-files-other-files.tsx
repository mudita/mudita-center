/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { IconType } from "app-theme/models"
import { formatBytes, Icon, Tooltip, Typography } from "app-theme/ui"
import { manageFilesMessages } from "../manage-files.messages"

export interface ManageFilesOtherFilesProps {
  otherFiles: { name: string }[]
  otherSpaceBytes: number
}

export const ManageFilesOtherFiles: FunctionComponent<
  ManageFilesOtherFilesProps
> = ({ otherFiles, otherSpaceBytes }) => {
  const sizeText = `(${formatBytes(otherSpaceBytes, { minUnit: "KB" })})`

  return (
    <Wrapper>
      <NameWrapper>
        <Name message={manageFilesMessages.otherFilesTitle.id} />
        <Size>{sizeText}</Size>
      </NameWrapper>
      <Tooltip placement="bottom-left" offset={{ x: 10, y: 0 }}>
        <Tooltip.Content>
          <OtherFilesList>
            {otherFiles.map((file, index) => (
              <OtherFilesListItem key={index}>
                <OtherFilesListItemMarker>▪</OtherFilesListItemMarker>
                <OtherFilesListItemName>{file.name}</OtherFilesListItemName>
              </OtherFilesListItem>
            ))}
          </OtherFilesList>
        </Tooltip.Content>
        <Tooltip.Anchor>
          <Icon type={IconType.Info} />
        </Tooltip.Anchor>
      </Tooltip>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: 2.8rem 3.2rem 1rem 3.2rem;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
`

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Name = styled(Typography.H4)``

const Size = styled(Typography.P3)`
  display: flex;
  color: ${({ theme }) => theme.app.color.black};
  margin: 0 0 0 0.3rem;
`

const OtherFilesList = styled.div`
  padding: 0.6rem 0;
  display: flex;
  flex-direction: column;
`

const OtherFilesListItem = styled.div`
  display: flex;
  flex-direction: row;
`

const OtherFilesListItemMarker = styled(Typography.P5)`
  margin: 0 0.6rem;
  color: ${({ theme }) => theme.app.color.grey1};
`

const OtherFilesListItemName = styled(Typography.P5)`
  color: ${({ theme }) => theme.app.color.grey1};
`
