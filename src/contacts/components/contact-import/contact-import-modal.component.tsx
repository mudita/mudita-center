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
import { NewContact } from "App/contacts/store/contacts.type"
import { ModalIcon } from "Renderer/modules/overview/backup-process/modals.styled"
import Icon from "Renderer/components/core/icon/icon.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "Renderer/utils/intl"
import { createFullName } from "App/contacts/store/contacts.helpers"
import { ContactImportModalTestIds } from "App/contacts/components/contact-import/contact-import-modal-test-ids.enum"
import { textColor } from "Renderer/styles/theming/theme-getters"

const messages = defineMessages({
  title: { id: "view.name.contacts.modal.import.title" },
  importingSubtitle: { id: "view.name.contacts.modal.import.subtitle" },
  importingBody: { id: "view.name.contacts.modal.import.body" },
  importingButton: { id: "view.name.contacts.modal.import.button" },
  importSuccessSubtitle: {
    id: "view.name.contacts.modal.importSuccess.subtitle",
  },
  importSuccessBody: { id: "view.name.contacts.modal.importSuccess.body" },
  importSuccessButton: { id: "view.name.contacts.modal.importSuccess.button" },
  importFailedSubtitle: {
    id: "view.name.contacts.modal.importFailed.subtitle",
  },
  importFailedBody: { id: "view.name.contacts.modal.importFailed.body" },
  importFailedBody2: { id: "view.name.contacts.modal.importFailed.body2" },
  importFailedButton: { id: "view.name.contacts.modal.importFailed.button" },
})

const Checkbox = styled(InputCheckbox)`
  margin-right: 2rem;
`

const TableContent = styled.div`
  overflow-y: scroll;
  height: 19.2rem;
`

const SyncTable = styled(Table)`
  --columnsTemplate: 1fr 1fr auto;
  margin-top: 4.8rem;
`

const Image = styled(ModalIcon)`
  margin: 1.6rem auto 3.2rem;
`

const Failed = styled(Col)`
  color: ${textColor("error")};
`

export enum ModalType {
  Success,
  Fail,
  Select,
}

interface Props {
  onActionButtonClick: (contacts: NewContact[]) => void
  contacts: NewContact[]
  modalType: ModalType
  successfulItemsCount?: number
}

const ContactImportModal: FunctionComponent<Props> = ({
  onActionButtonClick,
  contacts = [],
  modalType,
  successfulItemsCount,
}) => {
  const {
    toggleRow,
    toggleAll,
    getRowStatus,
    allRowsSelected,
    noneRowsSelected,
    selectedRows,
  } = useTableSelect<NewContact>(contacts)

  useEffect(() => {
    toggleAll()
  }, [])

  const SingleRow = ({
    data,
    index,
    ...rest
  }: {
    data: NewContact
    index: number
  }) => {
    const onChange = () => {
      toggleRow(data)
    }
    const { selected, indeterminate } = getRowStatus(data)
    return (
      <Row size={RowSize.Small} {...rest}>
        <Col>
          {[ModalType.Select, ModalType.Fail].includes(modalType) && (
            <Checkbox
              checked={selected}
              indeterminate={indeterminate}
              onChange={onChange}
              data-testid={ContactImportModalTestIds.RowCheckbox}
            />
          )}
          <p>{createFullName(data)}</p>
        </Col>
        <Col>
          {data.primaryPhoneNumber || data.secondaryPhoneNumber}
          {data.primaryPhoneNumber && data.secondaryPhoneNumber
            ? ", " + data.secondaryPhoneNumber
            : ""}
        </Col>
        <Failed data-testid={ContactImportModalTestIds.FailedIcon}>
          {modalType === ModalType.Fail && (
            <Icon type={Type.FailRed} size={2} />
          )}
        </Failed>
      </Row>
    )
  }

  const handleButtonClick = () => onActionButtonClick(selectedRows)

  return (
    <Modal
      title={intl.formatMessage(messages.title)}
      closeButton={false}
      actionButtonLabel={intl.formatMessage(
        modalType === ModalType.Success
          ? messages.importSuccessButton
          : modalType === ModalType.Select
          ? messages.importingButton
          : messages.importingButton
      )}
      onActionButtonClick={handleButtonClick}
      size={ModalSize.Medium}
      actionButtonDisabled={noneRowsSelected}
    >
      <Image>
        <Icon type={Type.Download} width={5} />
      </Image>
      {modalType === ModalType.Fail && (
        <>
          <ModalText
            message={messages.importFailedSubtitle}
            displayStyle={TextDisplayStyle.LargeBoldText}
          />
          <ModalText
            message={{
              ...messages.importFailedBody,
              values: { ...textFormatters, num: successfulItemsCount },
            }}
            displayStyle={TextDisplayStyle.MediumFadedLightText}
          />
          <ModalText
            message={messages.importFailedBody2}
            displayStyle={TextDisplayStyle.MediumFadedLightText}
          />
        </>
      )}
      {modalType === ModalType.Success && (
        <>
          <ModalText
            message={messages.importSuccessSubtitle}
            displayStyle={TextDisplayStyle.LargeBoldText}
          />
          <ModalText
            message={{
              ...messages.importSuccessBody,
              values: { ...textFormatters, num: contacts.length },
            }}
            displayStyle={TextDisplayStyle.MediumFadedLightText}
          />
        </>
      )}
      {modalType === ModalType.Select && (
        <>
          <ModalText
            message={messages.importingSubtitle}
            displayStyle={TextDisplayStyle.LargeBoldText}
          />
          <ModalText
            message={messages.importingBody}
            displayStyle={TextDisplayStyle.MediumFadedLightText}
          />
        </>
      )}
      <SyncTable>
        <Labels>
          <Col>
            {[ModalType.Select, ModalType.Fail].includes(modalType) && (
              <Checkbox
                onChange={toggleAll}
                checked={allRowsSelected}
                indeterminate={!allRowsSelected && !noneRowsSelected}
                data-testid={ContactImportModalTestIds.ToggleAllCheckbox}
              />
            )}
            <div>Contacts</div>
          </Col>
          <Col />
          <Col />
        </Labels>
        <TableContent>
          {contacts.map((row, index) => (
            <React.Fragment key={index}>
              <SingleRow
                data={row}
                data-testid={ContactImportModalTestIds.ContactRow}
                index={index}
              />
            </React.Fragment>
          ))}
        </TableContent>
      </SyncTable>
    </Modal>
  )
}

export default ContactImportModal
