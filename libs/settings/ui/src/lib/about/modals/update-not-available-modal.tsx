/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages, useIntl } from "react-intl"
import styled from "styled-components"
import { Icon, Modal, Typography } from "app-theme/ui"
import { IconSize, IconType, ModalSize } from "app-theme/models"
import { RoundIconWrapper } from "libs/app-theme/ui/src/lib/icon/icon-ui.styled"

interface UpdateNotAvailableModalProps {
  opened: boolean
  onClose: () => void
  currentVersion?: string
}

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
    id: "page.settingsAbout.updateNotAvailableMessage",
  },
  version: {
    id: "page.settingsAbout.updateVersion",
  },
})

export const UpdateNotAvailableModal: FunctionComponent<
  UpdateNotAvailableModalProps
> = ({ opened, onClose, currentVersion }) => {
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
            version: currentVersion,
          })}
        </Typography.P4>
      </Content>
      <Modal.Buttons>
        <Modal.CloseButton onClick={onClose} />
      </Modal.Buttons>
    </Modal>
  )
}
