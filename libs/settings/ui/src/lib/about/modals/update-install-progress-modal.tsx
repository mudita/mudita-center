/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages, useIntl } from "react-intl"
import styled from "styled-components"
import { Button, Icon, Modal, Typography } from "app-theme/ui"
import { ButtonType, IconSize, IconType, ModalSize } from "app-theme/models"
import { RoundIconWrapper } from "libs/app-theme/ui/src/lib/icon/icon-ui.styled"
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
    id: "page.settingsAbout.updateInstalling.title",
  },
  description: {
    id: "page.settingsAbout.updateInstalling.description",
  },
  cancelButton: {
    id: "page.settingsAbout.cancelButton.text",
  },
})

interface UpdateInstallProgressModalProps {
  opened: boolean
  progressPercent: number
  onClose: () => void
}

export const UpdateInstallProgressModal: FunctionComponent<
  UpdateInstallProgressModalProps
> = ({ opened, progressPercent, onClose }) => {
  const intl = useIntl()

  const handleCancel = () => {
    // abort download, to be implemented
  }

  return (
    <Modal opened={opened} size={ModalSize.Small} onRequestClose={onClose}>
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <Content>
        <RoundIconWrapper>
          <Icon type={IconType.MuditaLogo} size={IconSize.Large} />
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
        onClick={handleCancel}
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
