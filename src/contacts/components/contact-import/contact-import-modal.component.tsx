import React, { useEffect } from "react"
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
import { Contact, NewContact } from "App/contacts/store/phone.typings"
import { ModalIcon } from "Renderer/modules/overview/backup-process/modals.styled"
import Icon from "Renderer/components/core/icon/icon.component"
import { ModalText } from "Renderer/components/rest/sync-modals/sync-contacts.styled"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { createFullName } from "App/contacts/store/phone.helpers"
import { ContactImportModalTestIds } from "App/contacts/components/contact-import/contact-import-modal-test-ids.enum"

const messages = defineMessages({
  title: { id: "view.name.contacts.syncModal.title" },
  button: { id: "view.name.contacts.syncModal.button" },
  subtitle: { id: "view.name.contacts.syncModal.subtitle" },
  body: { id: "view.name.contacts.syncModal.body" },
})

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
  onActionButtonClick: (contacts: NewContact[]) => void
  contacts: Contact[]
}

const ContactImportModal: FunctionComponent<Props> = ({
  onActionButtonClick,
  contacts = [],
}) => {
  const {
    toggleRow,
    toggleAll,
    getRowStatus,
    allRowsSelected,
    noneRowsSelected,
    selectedRows,
  } = useTableSelect<NewContact>(contacts)

  useEffect(() => toggleAll(), [])

  const SingleRow = ({ data, ...rest }: { data: Contact }) => {
    const onChange = () => {
      toggleRow(data)
    }
    const { selected, indeterminate } = getRowStatus(data)
    return (
      <Row size={RowSize.Small} {...rest}>
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
  const handleButtonClick = () => onActionButtonClick(selectedRows)
  return (
    <Modal
      title={intl.formatMessage(messages.title)}
      closeButton={false}
      actionButtonLabel={intl.formatMessage(messages.button)}
      onActionButtonClick={handleButtonClick}
      size={ModalSize.Medium}
      actionButtonDisabled={noneRowsSelected}
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
              data-testid={ContactImportModalTestIds.ToggleAllCheckbox}
            />
            <div>Contacts</div>
          </Col>
          <Col />
        </Labels>
        <TableContent>
          {contacts.map((row, index) => (
            <React.Fragment key={index}>
              <SingleRow
                data={row}
                data-testid={ContactImportModalTestIds.ContactRow}
              />
            </React.Fragment>
          ))}
        </TableContent>
      </SyncTable>
    </Modal>
  )
}

export default ContactImportModal
