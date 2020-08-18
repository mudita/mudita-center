import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import {
  Col,
  Labels,
  Row,
} from "Renderer/components/core/table/table.component"
import { intl } from "Renderer/utils/intl"
import React from "react"
import { BaseModalProps } from "Renderer/modules/overview/backup-process/modals.interface"
import {
  FileList,
  LoadingModalText,
  ModalIcon,
} from "Renderer/modules/overview/backup-process/modals.styled"

const messages = {
  filename: {
    id: "view.generic.filename",
  },
  size: {
    id: "view.generic.size",
  },
}

export interface BackupItem {
  name: string
  size: string
}
interface BackupFinishedModalProps extends BaseModalProps {
  body: MessageInterface
  closeAction: () => void
  closeLabel: string
  items: BackupItem[]
}

export const BackupFinishedModal: FunctionComponent<BackupFinishedModalProps> = ({
  title,
  body,
  closeAction,
  closeLabel,
  items,
}) => {
  return (
    <Modal
      size={ModalSize.Medium}
      closeButton={false}
      onActionButtonClick={closeAction}
      actionButtonLabel={closeLabel}
    >
      <ModalIcon>
        <Icon type={Type.FilesManager} width={5} />
      </ModalIcon>
      <LoadingModalText
        message={{ id: title }}
        displayStyle={TextDisplayStyle.LargeBoldText}
      />
      <LoadingModalText
        message={body}
        displayStyle={TextDisplayStyle.MediumFadedLightText}
      />
      <FileList>
        <Labels>
          <Col>{intl.formatMessage(messages.filename)}</Col>
          <Col>{intl.formatMessage(messages.size)}</Col>
        </Labels>
        {items.map((item) => (
          <Row key={item.name}>
            <Col>{item.name}</Col>
            <Col>{item.size}</Col>
          </Row>
        ))}
      </FileList>
    </Modal>
  )
}
