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

const messages = defineMessages({
  title: {
    id: "page.settingsAbout.updateModalTitle",
  },
  subtitle: {
    id: "page.settingsAbout.updateFailed.title",
  },
  description: {
    id: "page.settingsAbout.updateFailed.description",
  },
  contactSupportButton: {
    id: "page.settingsAbout.contactSupportButton.text",
  },
  helpButton: {
    id: "page.settingsAbout.goToHelpButton.text",
  },
})

interface UpdateFailedModalProps {
  opened: boolean
  onClose: () => void
}

export const UpdateFailedModal: FunctionComponent<UpdateFailedModalProps> = ({
  opened,
  onClose,
}) => {
  const intl = useIntl()

  const handleContactSupport = () => {
    // will be added later, when contact support will be ready
    console.log("contact support")
  }

  const handleGoToHelp = () => {
    // will be added later, when help page will be ready
    console.log("help")
  }

  return (
    <Modal opened={opened} size={ModalSize.Small} onClose={onClose}>
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <Content>
        <RoundIconWrapper>
          <Icon type={IconType.CheckCircleBlack} size={IconSize.Big} />
        </RoundIconWrapper>
        <Typography.H4>{intl.formatMessage(messages.subtitle)}</Typography.H4>
        <Typography.P4>
          {intl.formatMessage(messages.description)}
        </Typography.P4>
      </Content>
      <Modal.Buttons>
        <Modal.CloseButton onClick={onClose} />
        <Button
          size={ButtonSize.Medium}
          onClick={handleContactSupport}
          type={ButtonType.Secondary}
        >
          {formatMessage(messages.helpButton)}
        </Button>
        <Button size={ButtonSize.Medium} onClick={handleGoToHelp}>
          {formatMessage(messages.helpButton)}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
