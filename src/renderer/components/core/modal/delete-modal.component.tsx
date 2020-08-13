import React, { ReactNode } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { noop } from "Renderer/utils/noop"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import Loader from "Renderer/components/core/loader/loader.component"

export const ModalContent = styled.div`
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
  cancelButton: { id: "view.name.phone.contacts.modal.delete.cancelButton" },
  deleteButton: { id: "view.name.phone.contacts.modal.delete.deleteButton" },
})

interface DeleteContactModalProps {
  onDelete?: () => void
  onClose?: () => void
  deleting?: boolean
  title?: string
  text?: ReactNode
}

const DeleteModal: FunctionComponent<DeleteContactModalProps> = ({
  onDelete = noop,
  onClose = noop,
  deleting = false,
  title,
  text,
  ...rest
}) => {
  return (
    <Modal
      title={title}
      size={ModalSize.Small}
      onActionButtonClick={onDelete}
      actionButtonLabel={
        deleting ? (
          <Loader size={2} type={LoaderType.Spinner} />
        ) : (
          intl.formatMessage(messages.deleteButton)
        )
      }
      onClose={onClose}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
      {...rest}
    >
      <ModalContent>
        <Icon type={Type.DeleteBig} width={12} height={12} />
        <Text displayStyle={TextDisplayStyle.MediumText}>{text}</Text>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal
