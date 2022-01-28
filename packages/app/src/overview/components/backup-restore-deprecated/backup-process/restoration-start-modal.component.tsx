/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React, { ComponentProps } from "react"
import {
  FileList,
  PureBackupModal,
} from "App/overview/components/backup-restore-deprecated/backup-process/modals.styled"
import { defineMessages } from "react-intl"
import { BackupItem } from "App/overview/components/backup-restore-deprecated/backup-process/modals.interface"
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
    id: "component.columnFileName",
  },
  size: {
    id: "component.columnSize",
  },
  cancel: { id: "component.cancelButton" },
  title: {
    id: "module.overview.backupRestoreBackupModalTitle",
  },
  body: {
    id: "module.overview.backupRestoreBackupModalBody",
  },
  actionButton: {
    id: "module.overview.backupRestoreButton",
  },
})

interface BackupRestorationStartModalProps {
  items: BackupItem[]
  restoreBackup?: () => void
}

export const BackupRestorationStartModal: FunctionComponent<
  BackupRestorationStartModalProps & ComponentProps<typeof PureBackupModal>
> = ({ items, restoreBackup = noop, ...props }) => (
  <PureBackupModal
    closeButtonLabel={intl.formatMessage(messages.cancel)}
    actionButtonLabel={intl.formatMessage(messages.actionButton)}
    onActionButtonClick={restoreBackup}
    size={ModalSize.Medium}
    {...props}
  >
    <Text
      message={messages.title}
      displayStyle={TextDisplayStyle.QuaternaryHeading}
    />
    <Text message={messages.body} displayStyle={TextDisplayStyle.LightText} />
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
