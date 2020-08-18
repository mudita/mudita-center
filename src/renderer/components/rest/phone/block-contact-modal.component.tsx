import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { noop } from "Renderer/utils/noop"
import { Contact } from "Renderer/models/phone/phone.typings"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "Renderer/utils/intl"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import Loader from "Renderer/components/core/loader/loader.component"
import { createFullName } from "Renderer/models/phone/phone.helpers"

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    white-space: pre-wrap;
    text-align: center;
    line-height: 2.2rem;
    margin-top: 3.2rem;
  }
`

const messages = defineMessages({
  title: { id: "view.name.phone.contacts.modal.block.title" },
  text: { id: "view.name.phone.contacts.modal.block.text" },
  cancelButton: { id: "view.name.phone.contacts.modal.block.cancelButton" },
  blockButton: { id: "view.name.phone.contacts.modal.block.blockButton" },
})

interface DeleteContactModalProps {
  contact: Contact
  onBlock?: () => void
  onClose?: () => void
  blocking?: boolean
}

const BlockContactModal: FunctionComponent<DeleteContactModalProps> = ({
  onBlock = noop,
  onClose = noop,
  blocking,
  contact,
}) => {
  return (
    <Modal
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      onActionButtonClick={onBlock}
      actionButtonLabel={
        blocking ? (
          <Loader size={2} type={LoaderType.Spinner} />
        ) : (
          intl.formatMessage(messages.blockButton)
        )
      }
      onClose={onClose}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
    >
      <ModalContent>
        <Icon type={Type.DeleteBig} width={12} height={12} />
        <Text
          displayStyle={TextDisplayStyle.MediumText}
          message={{
            ...messages.text,
            values: { name: createFullName(contact), ...textFormatters },
          }}
        />
      </ModalContent>
    </Modal>
  )
}

export default BlockContactModal
