import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { noop } from "Renderer/utils/noop"
import { Contact } from "Renderer/models/phone/phone.interface"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "Renderer/utils/intl"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"

const ModalComponent = styled(Modal)`
  padding: 2rem;
  box-sizing: border-box;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4.8rem 0;

  p {
    white-space: pre-wrap;
    text-align: center;
    line-height: 2.2rem;
    margin-top: 3.2rem;
  }
`

const messages = defineMessages({
  title: { id: "view.name.phone.contacts.modal.delete.title" },
  text: { id: "view.name.phone.contacts.modal.delete.text" },
  cancelButton: { id: "view.name.phone.contacts.modal.delete.cancelButton" },
  deleteButton: { id: "view.name.phone.contacts.modal.delete.deleteButton" },
})

interface DeleteContactModalProps {
  contact: Contact
  onDelete?: () => void
  onClose?: () => void
}

const DeleteContactModal: FunctionComponent<DeleteContactModalProps> = ({
  onDelete = noop,
  onClose = noop,
  contact,
}) => {
  const name = `${contact.firstName} ${contact.lastName}`
  return (
    <ModalComponent
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      onActionButtonClick={onDelete}
      actionButtonLabel={intl.formatMessage(messages.deleteButton)}
      onClose={onClose}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
    >
      <ModalContent>
        <Icon type={Type.DeleteBig} width={12} height={12} />
        <Text
          displayStyle={TextDisplayStyle.MediumText}
          message={{ ...messages.text, values: { name, ...textFormatters } }}
        />
      </ModalContent>
    </ModalComponent>
  )
}

export default DeleteContactModal
