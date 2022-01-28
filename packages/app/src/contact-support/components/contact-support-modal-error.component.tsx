/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import {
  ModalContent as SimpleModal,
  RoundIconWrapper,
} from "Renderer/components/core/modal-dialog/modal-dialog-shared"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"

const messages = defineMessages({
  title: { id: "component.supportModalErrorTitle" },
  body: { id: "component.supportModalErrorBody" },
})

const ContactSupportModalError: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = (props) => (
  <ModalDialog size={ModalSize.Small} {...props}>
    <SimpleModal>
      <RoundIconWrapper>
        <Icon type={Type.MuditaLogo} width={4} />
      </RoundIconWrapper>
      <Text
        message={messages.title}
        displayStyle={TextDisplayStyle.QuaternaryHeading}
      />
      <Text
        message={messages.body}
        displayStyle={TextDisplayStyle.MediumFadedLightText}
      />
    </SimpleModal>
  </ModalDialog>
)

export default ContactSupportModalError
