/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages, useIntl } from "react-intl"
import styled from "styled-components"
import { Button, Icon, Modal, Typography } from "app-theme/ui"
import { IconSize, IconType, ModalSize } from "app-theme/models"
import { RoundIconWrapper } from "libs/app-theme/ui/src/lib/icon/icon-ui.styled"
import { formatMessage } from "app-localize/utils"
import { ButtonSize } from "app-theme/models"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 0;
`

const messages = defineMessages({
  title: {
    id: "page.settingsAbout.updateModalTitle",
  },
  subtitle: {
    id: "page.settingsAbout.updateDownloaded.title",
  },
  description: {
    id: "page.settingsAbout.updateDownloaded.description",
  },
  updateButton: {
    id: "page.settingsAbout.updateButton.text",
  },
})

interface UpdateDownloadedModalProps {
  opened: boolean
  onClose: () => void
  latestVersion?: string
}

export const UpdateDownloadedModal: FunctionComponent<
  UpdateDownloadedModalProps
> = ({ opened, onClose, latestVersion }) => {
  const intl = useIntl()

  const handleInstallUpdate = () => {
    // to be implemented
  }

  return (
    <Modal opened={opened} size={ModalSize.Small} onRequestClose={onClose}>
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <Content>
        <RoundIconWrapper>
          <Icon type={IconType.Pure} size={IconSize.Big} />
        </RoundIconWrapper>
        <Typography.H4>{intl.formatMessage(messages.subtitle)}</Typography.H4>
        <Typography.P4>
          {intl.formatMessage(messages.description, {
            version: latestVersion,
          })}
        </Typography.P4>
      </Content>
      <Button size={ButtonSize.Medium} onClick={handleInstallUpdate}>
        {formatMessage(messages.updateButton)}
      </Button>
      <Modal.Buttons>
        <Modal.CloseButton onClick={onClose} />
      </Modal.Buttons>
    </Modal>
  )
}
