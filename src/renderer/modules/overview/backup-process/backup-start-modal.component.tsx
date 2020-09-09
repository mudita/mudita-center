import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import { FileList } from "Renderer/modules/overview/backup-process/modals.styled"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import { defineMessages } from "react-intl"
import Modal from "Renderer/components/core/modal/modal.component"
import {
  Col,
  Labels,
  Row,
} from "Renderer/components/core/table/table.component"
import { BackupItem } from "Renderer/modules/overview/backup-process/modals.interface"
import moment from "moment"
import styled from "styled-components"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"

const messages = defineMessages({
  filename: {
    id: "view.generic.filename",
  },
  size: {
    id: "view.generic.size",
  },
  lastBackup: {
    id: "view.name.overview.backup.lastBackup",
  },
  cancel: { id: "view.generic.button.cancel" },
  title: {
    id: "view.name.overview.backup.createBackupModal.title",
  },
  total: {
    id: "view.name.overview.backup.createBackupModal.total",
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
}

export const BackupStartModal: FunctionComponent<BackupStartModalProps> = ({
  startBackup = noop,
  date,
  total,
  items,
}) => (
  <Modal
    title={intl.formatMessage(messages.title)}
    onActionButtonClick={startBackup}
    actionButtonLabel={intl.formatMessage(messages.title)}
    closeButtonLabel={intl.formatMessage(messages.cancel)}
    size={ModalSize.Medium}
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
          displayStyle={TextDisplayStyle.MediumText}
        />
      </Col>
      <Col />
      <SizeColumn>
        <Text displayStyle={TextDisplayStyle.MediumText}>{total}</Text>
      </SizeColumn>
    </TotalTextWrapper>
  </Modal>
)
