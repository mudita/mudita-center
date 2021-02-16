/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import React from "react"
import {
  ModalContent as SimpleModal,
  RoundIconWrapper,
} from "Renderer/components/rest/app-update/app-update.modals"
import { defineMessages } from "react-intl"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const messages = defineMessages({
  title: { id: "component.modal.support.fail.title" },
  body: { id: "component.modal.support.fail.body" },
})

export const ContactSupportFailed: FunctionComponent = (props) => (
  <Modal size={ModalSize.Small} {...props}>
    <SimpleModal>
      <RoundIconWrapper>
        <Icon type={Type.MuditaLogo} width={4} />
      </RoundIconWrapper>
      <Text
        message={messages.title}
        displayStyle={TextDisplayStyle.LargeBoldText}
      />
      <Text
        message={messages.body}
        displayStyle={TextDisplayStyle.MediumFadedLightText}
      />
    </SimpleModal>
  </Modal>
)
