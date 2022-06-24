/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import {
  ModalContent as SimpleModal,
  RoundIconWrapper,
} from "App/__deprecated__/renderer/components/core/modal-dialog/modal-dialog-shared"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import ModalDialog from "App/__deprecated__/renderer/components/core/modal-dialog/modal-dialog.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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
        <Icon type={IconType.MuditaLogo} width={4} />
      </RoundIconWrapper>
      <Text
        message={messages.title}
        displayStyle={TextDisplayStyle.Headline4}
      />
      <Text
        message={messages.body}
        displayStyle={TextDisplayStyle.Paragraph4}
        color="secondary"
      />
    </SimpleModal>
  </ModalDialog>
)

export default ContactSupportModalError
