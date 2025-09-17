/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import styled from "styled-components"
import { formatMessage, Messages } from "app-localize/utils"
import { ButtonType, IconType } from "app-theme/models"
import { AppUpdaterTestIds } from "app-updater/models"
import { Button, Modal, Typography } from "app-theme/ui"
import { FileManagerFile } from "./manage-files.types"

export interface ManageFilesDeleteFailedModalProps {
  opened: boolean
  onClose: VoidFunction
  failedFiles: FileManagerFile[]
  allFiles: FileManagerFile[]
  messages: {
    deleteFailedAllModalTitle: Messages
    deleteFailedSomeModalTitle: Messages
    deleteFailedAllModalDescription: Messages
    deleteFailedDescriptionModalDescription: Messages
    deleteFailedModalSecondaryButtonText: Messages
  }
}

export const ManageFilesDeleteFailedModal: FunctionComponent<
  ManageFilesDeleteFailedModalProps
> = ({ opened, messages, failedFiles, allFiles, onClose }) => {
  const isAllFailed = allFiles.length === failedFiles.length
  const successCount = allFiles.length - failedFiles.length

  const title = useTitle(messages, isAllFailed, failedFiles.length)
  const description = useDescription(
    messages,
    isAllFailed,
    failedFiles.length,
    successCount
  )

  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Failed} />
      <Modal.Title>{title}</Modal.Title>
      <Typography.P1>{description}</Typography.P1>
      {!isAllFailed && <FailedFilesList files={failedFiles} />}
      <Modal.Buttons>
        <Button
          data-testid={AppUpdaterTestIds.UpdateErrorModalButton}
          onClick={onClose}
          type={ButtonType.Secondary}
        >
          {formatMessage(messages.deleteFailedModalSecondaryButtonText)}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}

const useTitle = (
  messages: ManageFilesDeleteFailedModalProps["messages"],
  isAllFailed: boolean,
  failedCount: number
) =>
  useMemo(() => {
    return isAllFailed
      ? formatMessage(messages.deleteFailedAllModalTitle, {
          failedCount,
        })
      : formatMessage(messages.deleteFailedSomeModalTitle)
  }, [isAllFailed, messages, failedCount])

const useDescription = (
  messages: ManageFilesDeleteFailedModalProps["messages"],
  isAllFailed: boolean,
  failedCount: number,
  succeededCount: number
) =>
  useMemo(() => {
    return isAllFailed
      ? formatMessage(messages.deleteFailedAllModalDescription, {
          failedCount,
        })
      : formatMessage(messages.deleteFailedDescriptionModalDescription, {
          succeededCount,
          failedCount,
        })
  }, [isAllFailed, messages, failedCount, succeededCount])

const FailedFilesList = ({ files }: { files: FileManagerFile[] }) => (
  <Modal.ScrollableContent>
    <FilesList>
      {files.map((file) => (
        <li key={file.id}>
          <FileListItem>
            <Typography.P1>{file.name}</Typography.P1>
          </FileListItem>
        </li>
      ))}
    </FilesList>
  </Modal.ScrollableContent>
)

const FilesList = styled.ul`
  li {
    p {
      &:first-child {
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:nth-child(2) {
        white-space: nowrap;
        color: ${({ theme }) => theme.app.color.grey2};
      }
    }
  }
`

const FileListItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.4rem;
  justify-content: space-between;
  overflow: hidden;
`
