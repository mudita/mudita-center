import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import React from "react"
import { BaseModalProps } from "Renderer/modules/overview/backup-process/modals.interface"
import {
  LoadingModalText,
  ModalIcon,
} from "Renderer/modules/overview/backup-process/modals.styled"

interface BackupStartModalProps extends BaseModalProps {
  onActionButtonClick: () => void
  body: MessageInterface
}

export const BackupStartModal: FunctionComponent<BackupStartModalProps> = ({
  title,
  body,
  onActionButtonClick,
  actionButtonLabel,
  closeButtonLabel,
}) => (
  <Modal
    size={ModalSize.Small}
    title={title}
    onActionButtonClick={onActionButtonClick}
    actionButtonLabel={actionButtonLabel}
    closeButtonLabel={closeButtonLabel}
  >
    <ModalIcon>
      <Icon type={Type.FilesManager} width={5} />
    </ModalIcon>
    <LoadingModalText
      message={body}
      displayStyle={TextDisplayStyle.MediumFadedLightText}
    />
  </Modal>
)
