/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ModalDialog, RoundIconWrapper } from "Core/ui"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"

const messages = defineMessages({
  title: {
    id: "module.quotations.notEnoughSpaceModal.title",
  },
  subtitle: {
    id: "module.quotations.notEnoughSpaceModal.subtitle",
  },
  description: {
    id: "module.quotations.notEnoughSpaceModal.description",
  },
  cancelButton: {
    id: "module.quotations.notEnoughSpaceModal.cancelButton",
  },
})

interface Props {
  opened?: boolean
  onCancel: VoidFunction
}

export const NotEnoughSpaceModal: FunctionComponent<Props> = ({
  opened = false,
  onCancel,
}) => {
  return (
    <ModalDialog
      size={ModalSize.Small}
      open={opened}
      title={intl.formatMessage(messages.title)}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
      closeButton
      onCloseButton={onCancel}
    >
      <IconWrapper>
        <Icon type={IconType.Fail} size={IconSize.Enormous} />
      </IconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.subtitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        message={messages.description}
      />
    </ModalDialog>
  )
}

const ModalText = styled(Text)`
  text-align: center;
`

const IconWrapper = styled(RoundIconWrapper)`
  margin-left: auto;
  margin-right: auto;

  & + ${ModalText} {
    margin-bottom: 0.8rem;
  }
`
