/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  Col,
  Labels,
  Row,
} from "Renderer/components/core/table/table.component"
import { intl, textFormatters } from "Renderer/utils/intl"
import React, { ComponentProps } from "react"
import {
  FileList,
  PureBackupModal,
} from "Renderer/modules/overview/backup-process/modals.styled"
import { BackupItem } from "Renderer/modules/overview/backup-process/modals.interface"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  filename: {
    id: "component.columnFileName",
  },
  size: {
    id: "component.columnSize",
  },
  ok: { id: "component.okButton" },
  title: {
    id: "module.overview.backupFinishedBackupModalTitle",
  },
  body: {
    id: "module.overview.backupFinishedBackupModalTitle",
  },
})

interface BackupFinishedModalProps {
  items: BackupItem[]
  destination: string
}

export const BackupFinishedModal: FunctionComponent<
  BackupFinishedModalProps & ComponentProps<typeof PureBackupModal>
> = ({ items, destination, ...props }) => (
  <PureBackupModal
    actionButtonLabel={intl.formatMessage(messages.ok)}
    size={ModalSize.Medium}
    {...props}
  >
    <Text
      message={messages.title}
      displayStyle={TextDisplayStyle.LargeBoldText}
    />
    <Text
      message={{
        ...messages.body,
        values: {
          destination,
          ...textFormatters,
        },
      }}
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
