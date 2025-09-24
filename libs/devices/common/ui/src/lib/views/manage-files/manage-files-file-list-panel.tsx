/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import {
  ButtonSize,
  ButtonType,
  CheckboxSize,
  IconType,
} from "app-theme/models"
import { Button, Checkbox, Typography } from "app-theme/ui"
import { manageFilesMessages } from "./manage-files.messages"

interface FileListPanelHeaderProps {
  header: string
  onAddFileClick?: () => void
}

export const ManageFilesFileListPanelHeader: FunctionComponent<
  FileListPanelHeaderProps & PropsWithChildren
> = ({ header, children }) => {
  return (
    <FileListPanel>
      <Typography.H3>{header}</Typography.H3>
      {children}
    </FileListPanel>
  )
}

export const ManageFilesFileListPanelDefaultMode: FunctionComponent<
  FileListPanelHeaderProps
> = ({ onAddFileClick, ...props }) => {
  return (
    <ManageFilesFileListPanelHeader {...props}>
      <Button
        size={ButtonSize.Medium}
        message={manageFilesMessages.addFileButtonText.id}
        onClick={onAddFileClick}
      />
    </ManageFilesFileListPanelHeader>
  )
}

export interface ManageFilesFileListPanelSelectModeProps {
  count: number
  onAllCheckboxClick: (checked: boolean) => void
  onDeleteClick: VoidFunction
}

export const ManageFilesFileListPanelSelectMode: FunctionComponent<
  ManageFilesFileListPanelSelectModeProps
> = ({ count, onAllCheckboxClick, onDeleteClick }) => {
  return (
    <FileListPanelSelector>
      <Checkbox
        size={CheckboxSize.Small}
        indeterminate
        onChange={(event) => onAllCheckboxClick(event.target.checked)}
      />
      <Typography.P4
        message={manageFilesMessages.selectionSelectedCount.id}
        values={{ count }}
      />
      <DeleteButton
        icon={IconType.Trash}
        message={manageFilesMessages.selectionDelete.id}
        type={ButtonType.Text}
        onClick={onDeleteClick}
      />
    </FileListPanelSelector>
  )
}

const FileListPanel = styled.div`
  margin: 2.8rem 3.2rem;
  height: 4rem;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: center;
`

const FileListPanelSelector = styled.div`
  margin: 2.8rem 3.2rem;
  padding: 0.8rem 2.4rem 0.8rem 1.2rem;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto 1fr auto auto;
  gap: 0 1.4rem;
  align-items: center;

  background: ${({ theme }) => theme.app.color.grey5};
  border: solid 0.1rem ${({ theme }) => theme.app.color.grey4};
  border-radius: 0.4rem;
`

const DeleteButton = styled(Button)`
  height: 2.2rem;
`
