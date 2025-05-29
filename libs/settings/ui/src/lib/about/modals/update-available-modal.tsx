/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages, useIntl } from "react-intl"
import styled from "styled-components"
import { Button, Icon, Modal, Typography, RoundIconWrapper } from "app-theme/ui"
import { IconSize, IconType, ModalSize } from "app-theme/models"
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
    id: "page.settingsAbout.updateAvailable",
  },
  version: {
    id: "page.settingsAbout.updateVersion",
  },
  downloadButton: {
    id: "page.settingsAbout.downloadButton.text",
  },
})

interface UpdateAvailableModalProps {
  opened: boolean
  onClose: () => void
  onDownload: () => void
  latestVersion?: string
}

export const UpdateAvailableModal: FunctionComponent<
  UpdateAvailableModalProps
> = ({ opened, onClose, onDownload, latestVersion }) => {
  const intl = useIntl()

  return (
    <Modal opened={opened} size={ModalSize.Small} onRequestClose={onClose}>
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <Content>
        <RoundIconWrapper>
          <Icon type={IconType.Pure} size={IconSize.Big} />
        </RoundIconWrapper>
        <Typography.H4>{intl.formatMessage(messages.subtitle)}</Typography.H4>
        <Typography.P4>
          {intl.formatMessage(messages.version, {
            version: latestVersion,
          })}
        </Typography.P4>
      </Content>
      <Button size={ButtonSize.Medium} onClick={onDownload}>
        {formatMessage(messages.downloadButton)}
      </Button>
      <Modal.Buttons>
        <Modal.CloseButton onClick={onClose} />
      </Modal.Buttons>
    </Modal>
  )
}
