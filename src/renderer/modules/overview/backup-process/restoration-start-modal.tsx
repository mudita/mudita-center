import FunctionComponent from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import {
  FileList,
  PureBackupModal,
} from "Renderer/modules/overview/backup-process/modals.styled"
import { defineMessages } from "react-intl"
import { BackupItem } from "Renderer/modules/overview/backup-process/modals.interface"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import {
  Col,
  Labels,
  Row,
} from "Renderer/components/core/table/table.component"

const messages = defineMessages({
  filename: {
    id: "view.generic.filename",
  },
  size: {
    id: "view.generic.size",
  },
  cancel: { id: "view.generic.button.cancel" },
  title: {
    id: "view.name.overview.backup.restoreBackupModal.title",
  },
  body: {
    id: "view.name.overview.backup.restoreBackupModal.body",
  },
  actionButton: {
    id: "view.name.overview.backup.restoreBackupModal.restoreButton",
  },
})

interface BackupRestorationStartModalProps {
  items: BackupItem[]
  restoreBackup?: () => void
}

export const BackupRestorationStartModal: FunctionComponent<BackupRestorationStartModalProps> = ({
  items,
  restoreBackup = noop,
}) => (
  <PureBackupModal
    closeButtonLabel={intl.formatMessage(messages.cancel)}
    actionButtonLabel={intl.formatMessage(messages.actionButton)}
    onActionButtonClick={restoreBackup}
    size={ModalSize.Medium}
  >
    <Text
      message={messages.title}
      displayStyle={TextDisplayStyle.LargeBoldText}
    />
    <Text
      message={messages.body}
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
  </PureBackupModal>
)
