/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages, useIntl } from "react-intl"
import styled from "styled-components"
import { Button, Icon, Modal, Typography, RoundIconWrapper } from "app-theme/ui"
import { ButtonType, IconSize, IconType, ModalSize } from "app-theme/models"
import { formatMessage } from "app-localize/utils"
import { ButtonSize } from "app-theme/models"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 0;
`

const ProgressBar = styled.div<{ percent: number }>`
  width: 100%;
  max-width: 24rem;
  height: 0.6rem;
  background-color: #e0e0e0;
  border-radius: 0.3rem;
  overflow: hidden;
  margin-top: 2rem;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ percent }) => percent}%;
    background-color: #357ebd;
    transition: width 0.3s ease-in-out;
  }
`

const ProgressValue = styled.div`
  margin-top: 0.8rem;
  font-size: 1.4rem;
`

const messages = defineMessages({
  title: {
    id: "page.settingsAbout.updateModalTitle",
  },
  subtitle: {
    id: "page.settingsAbout.downloadProgress.title",
  },
  description: {
    id: "page.settingsAbout.downloadProgress.description",
  },
  cancelButton: {
    id: "page.settingsAbout.cancelButton.text",
  },
})

interface UpdateDownloadProgressModalProps {
  opened: boolean
  progressPercent: number
  onClose: () => void
  onCancel: () => void
}

export const UpdateDownloadProgressModal: FunctionComponent<
  UpdateDownloadProgressModalProps
> = ({ opened, progressPercent, onClose, onCancel }) => {
  const intl = useIntl()

  const handleDownloadCancel = () => {
    onCancel()
    onClose()
  }

  return (
    <Modal opened={opened} size={ModalSize.Small} onClose={onClose}>
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <Content>
        <RoundIconWrapper>
          <Icon type={IconType.Download} size={IconSize.Big} />
        </RoundIconWrapper>
        <Typography.H4>{intl.formatMessage(messages.subtitle)}</Typography.H4>
        <Typography.P4>
          {intl.formatMessage(messages.description)}
        </Typography.P4>
        <ProgressBar percent={progressPercent} />
        <ProgressValue>{progressPercent}%</ProgressValue>
      </Content>
      <Button
        size={ButtonSize.Medium}
        onClick={handleDownloadCancel}
        type={ButtonType.Secondary}
      >
        {formatMessage(messages.cancelButton)}
      </Button>
      <Modal.Buttons>
        <Modal.CloseButton onClick={onClose} />
      </Modal.Buttons>
    </Modal>
  )
}
