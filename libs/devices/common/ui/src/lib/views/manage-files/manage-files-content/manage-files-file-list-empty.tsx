/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { Button, Typography } from "app-theme/ui"
import { ManageFilesFileListPanelHeader } from "./manage-files-file-list-panel"
import { Messages } from "app-localize/utils"

export interface ManageFilesFileListEmptyProps {
  description?: string
  header?: string
  onAddFileClick?: () => void
  messages: {
    emptyStateTitle: Messages
    addFileButtonText: Messages
  }
}

export const ManageFilesFileListEmpty: FunctionComponent<
  ManageFilesFileListEmptyProps
> = ({ description = "", header = "", onAddFileClick, messages }) => {
  return (
    <>
      <ManageFilesFileListPanelHeader header={header} />
      <Container>
        <Header message={messages.emptyStateTitle.id} />
        <Description>{description}</Description>
        <FileListEmptyButton
          message={messages.addFileButtonText.id}
          onClick={onAddFileClick}
        />
      </Container>
    </>
  )
}

const Container = styled.div`
  padding: 0 0 9.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Header = styled(Typography.H4)`
  margin: 0 0 0.8rem 0;
`

const Description = styled(Typography.P3)`
  margin: 0 auto 2.4rem auto;
  width: 38.8rem;
  text-align: center;
`

const FileListEmptyButton = styled(Button)`
  width: 15.6rem;
`
