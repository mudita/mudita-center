import React, { ReactNode } from "react"

import Icon from "Renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import { ModalContent } from "Renderer/components/core/modal/delete-modal.component"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"

const messages = defineMessages({
  cancel: { id: "view.name.messages.templatesDeleteModal.cancel" },
  delete: { id: "view.name.messages.templatesDeleteModal.action" },
})

interface DeleteTemplateModalProps {
  onDelete?: (ids?: string[]) => void | Promise<void>
  onClose?: () => void | Promise<void>
  title: string
  text: string | ReactNode
}

const DeleteTemplateModal: FunctionComponent<DeleteTemplateModalProps> = ({
  title,
  text,
  onClose = noop,
  onDelete = noop,
}) => {
  return (
    <Modal
      size={ModalSize.Small}
      title={title}
      onClose={onClose}
      actionButtonLabel={intl.formatMessage(messages.delete)}
      closeButtonLabel={intl.formatMessage(messages.cancel)}
      onActionButtonClick={onDelete}
    >
      <ModalContent>
        <Icon type={Type.DeleteBig} width={12} height={12} />
        <Text displayStyle={TextDisplayStyle.MediumText}>{text}</Text>
      </ModalContent>
    </Modal>
  )
}

export default DeleteTemplateModal
