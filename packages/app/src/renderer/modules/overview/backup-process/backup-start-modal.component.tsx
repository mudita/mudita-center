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
} from "Renderer/modules/overview/backup-process/modals.styled"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import { defineMessages } from "react-intl"
import {
  Col,
  Labels,
  Row,
} from "Renderer/components/core/table/table.component"
import { BackupItem } from "Renderer/modules/overview/backup-process/modals.interface"
import moment from "moment"
import styled from "styled-components"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"

const messages = defineMessages({
  filename: {
    id: "component.column.filename",
  },
  size: {
    id: "component.column.size",
  },
  lastBackup: {
    id: "component.column.lastBackup",
  },
  cancel: { id: "component.button.cancel" },
  title: {
    id: "module.overview.backup.createBackupModal.title",
  },
  total: {
    id: "module.overview.backup.createBackupModal.total",
  },
})

const TotalTextWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 0.95fr;
  margin-top: 1.6rem;
  margin-bottom: 9.6rem;
`

const SizeColumn = styled(Col)`
  min-width: 4rem;
`

const BackupFileList = styled(FileList)`
  --columnsTemplate: 4fr 2fr 1fr;
`

const TotalText = styled(Text)`
  margin-left: 0.8rem;
`

interface BackupStartModalProps {
  startBackup?: () => void
  date?: string
  total?: string
  items: BackupItem[]
  open: boolean
}

export const BackupStartModal: FunctionComponent<
  BackupStartModalProps & ComponentProps<typeof PureBackupModal>
> = ({ startBackup = noop, date, total, items, open, ...props }) => (
  <ModalDialog
    title={intl.formatMessage(messages.title)}
    onActionButtonClick={startBackup}
    actionButtonLabel={intl.formatMessage(messages.title)}
    closeButtonLabel={intl.formatMessage(messages.cancel)}
    size={ModalSize.Medium}
    open={open}
    {...props}
  >
    <BackupFileList>
      <Labels>
        <Col>{intl.formatMessage(messages.filename)}</Col>
        <Col>{intl.formatMessage(messages.lastBackup)}</Col>
        <SizeColumn>{intl.formatMessage(messages.size)}</SizeColumn>
      </Labels>
      {items.map((item) => (
        <Row key={item.name}>
          <Col>{item.name}</Col>
          <Col>{moment(date).format("ll")}</Col>
          <SizeColumn>{item.size}</SizeColumn>
        </Row>
      ))}
    </BackupFileList>
    <TotalTextWrapper>
      <Col>
        <TotalText
          message={messages.total}
          displayStyle={TextDisplayStyle.SmallText}
        />
      </Col>
      <Col />
      <SizeColumn>
        <Text displayStyle={TextDisplayStyle.MediumText}>{total}</Text>
      </SizeColumn>
    </TotalTextWrapper>
  </ModalDialog>
)
