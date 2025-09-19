/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonType, IconType } from "app-theme/models"
import { Button, Modal, Typography } from "app-theme/ui"
import { FileFailed } from "./manage-files.types"

export interface ManageFilesFailedModalProps {
  opened: boolean
  onClose: VoidFunction
  title: string
  description: string
  buttonText: string
  failedFiles?: FileFailed[]
}

export const ManageFilesFailedModal: FunctionComponent<
  ManageFilesFailedModalProps
> = ({ opened, failedFiles, title, description, buttonText, onClose }) => {
  const showList = !!failedFiles?.length

  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Failed} />
      <Modal.Title>{title}</Modal.Title>
      <Typography.P1>{description}</Typography.P1>

      {showList && <FailedFilesList files={failedFiles} />}

      <Modal.Buttons>
        <Button onClick={onClose} type={ButtonType.Secondary}>
          {buttonText}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}

const FailedFilesList = ({ files }: { files: FileFailed[] }) => (
  <Modal.ScrollableContent>
    <FilesList>
      {files.map((file) => (
        <li key={file.id}>
          <FileListItem>
            <Typography.P1>
              {file.name} [{file.label}]
            </Typography.P1>
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
