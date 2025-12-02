/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { Messages } from "app-localize/utils"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { Button, SelectionManager, Typography } from "app-theme/ui"
import { manageFilesMessages } from "../manage-files.messages"

export interface FileListPanelHeaderProps {
  header: string
  onAddFileClick?: () => void
  messages: {
    addFileButtonText: Messages
  }
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
        message={props.messages.addFileButtonText.id}
        onClick={onAddFileClick}
      />
    </ManageFilesFileListPanelHeader>
  )
}

export interface ManageFilesFileListPanelSelectModeProps {
  count: number
  onAllCheckboxClick: (checked: boolean) => void
  onDeleteClick: VoidFunction
  onDownloadClick?: VoidFunction
  allFilesSelected: boolean
}

export const ManageFilesFileListPanelSelectMode: FunctionComponent<
  ManageFilesFileListPanelSelectModeProps
> = ({
  count,
  allFilesSelected,
  onAllCheckboxClick,
  onDeleteClick,
  onDownloadClick,
}) => {
  const buttons = [
    ...(onDownloadClick
      ? [
          <DownloadButton
            icon={IconType.Upload}
            message={manageFilesMessages.selectionDownload.id}
            type={ButtonType.Text}
            onClick={() => onDownloadClick()}
          />,
        ]
      : []),
    <DeleteButton
      icon={IconType.Trash}
      message={manageFilesMessages.selectionDelete.id}
      type={ButtonType.Text}
      onClick={() => onDeleteClick()}
    />,
  ]

  return (
    <FileListPanelSelector>
      <SelectionManager
        selectedItemsNumber={count}
        allItemsSelected={allFilesSelected}
        message={manageFilesMessages.selectionSelectedCount}
        onToggle={(event) => onAllCheckboxClick(event.target.checked)}
        buttons={buttons}
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
`

const DownloadButton = styled(Button)`
  height: 2.2rem;
`

const DeleteButton = styled(Button)`
  height: 2.2rem;
`
