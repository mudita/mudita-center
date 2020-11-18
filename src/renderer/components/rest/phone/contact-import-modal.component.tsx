import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Table, {
  Col,
  Labels,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import styled from "styled-components"
import { Contact } from "Renderer/models/phone/phone.typings"
import { ModalIcon } from "Renderer/modules/overview/backup-process/modals.styled"
import Icon from "Renderer/components/core/icon/icon.component"
import { ModalText } from "Renderer/components/rest/sync-modals/sync-contacts.styled"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { createFullName } from "Renderer/models/phone/phone.helpers"

const Checkbox = styled(InputCheckbox)`
  margin-right: 2rem;
`

const TableContent = styled.div`
  overflow-y: scroll;
  height: 24rem;
`

const SyncTable = styled(Table)`
  margin-top: 4.8rem;
`

const Image = styled(ModalIcon)`
  margin: 1.6rem auto 3.2rem;
`

interface Props {
  onActionButtonClick: () => void
  contacts: Contact[]
}

const ContactImportModal: FunctionComponent<Props> = ({
  onActionButtonClick,
  contacts,
}) => {
  const {
    toggleRow,
    toggleAll,
    getRowStatus,
    allRowsSelected,
    noneRowsSelected,
  } = useTableSelect(contacts)

  const SingleRow = ({ data }: { data: Contact }) => {
    const onChange = () => {
      toggleRow(data)
    }
    const { selected, indeterminate } = getRowStatus(data)
    return (
      <Row size={RowSize.Small}>
        <Col>
          <Checkbox
            checked={selected}
            indeterminate={indeterminate}
            onChange={onChange}
          />
          <p>{createFullName(data)}</p>
        </Col>
        <Col>{data.primaryPhoneNumber}</Col>
      </Row>
    )
  }

  const messages = defineMessages({
    title: { id: "view.name.contacts.syncModal.title" },
    button: { id: "view.name.contacts.syncModal.button" },
    subtitle: { id: "view.name.contacts.syncModal.subtitle" },
    body: { id: "view.name.contacts.syncModal.body" },
  })

  return (
    <Modal
      title={intl.formatMessage(messages.title)}
      closeButton={false}
      actionButtonLabel={intl.formatMessage(messages.button)}
      onActionButtonClick={onActionButtonClick}
      size={ModalSize.Medium}
    >
      <Image>
        <Icon type={Type.ContactGoogle} width={5} />
      </Image>
      <ModalText
        message={messages.subtitle}
        displayStyle={TextDisplayStyle.LargeBoldText}
      />
      <ModalText
        message={messages.body}
        displayStyle={TextDisplayStyle.MediumFadedLightText}
      />
      <SyncTable>
        <Labels>
          <Col>
            <Checkbox
              onChange={toggleAll}
              checked={allRowsSelected}
              indeterminate={!allRowsSelected && !noneRowsSelected}
            />
            <div>Contacts</div>
          </Col>
          <Col />
        </Labels>
        <TableContent>
          {contacts.map((row, index) => (
            <React.Fragment key={index}>
              <SingleRow data={row} />
            </React.Fragment>
          ))}
        </TableContent>
      </SyncTable>
    </Modal>
  )
}

export default ContactImportModal
