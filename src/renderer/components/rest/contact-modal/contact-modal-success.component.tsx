import FunctionComponent from "Renderer/types/function-component.interface"
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
  title: { id: "component.modal.support.success.title" },
  body: { id: "component.modal.support.success.body" },
  bodyWithoutEmail: { id: "component.modal.support.success.bodyWithoutEmail" },
})

interface ContactSupportSuccessProps {
  withoutEmail?: boolean
}

export const ContactSupportSuccess: FunctionComponent<ContactSupportSuccessProps> = ({
  children,
  withoutEmail,
  ...props
}) => (
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
        message={withoutEmail ? messages.bodyWithoutEmail : messages.body}
        displayStyle={TextDisplayStyle.MediumFadedLightText}
      />
    </SimpleModal>
  </Modal>
)
