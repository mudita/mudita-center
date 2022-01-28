/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
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
import Icon from "Renderer/components/core/icon/icon.component"
import {
  ModalText,
  SelectedText,
} from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "Renderer/utils/intl"
import { createFullNameStartingFromLastName } from "App/contacts/helpers/contacts.helpers"
import { ContactImportModalTestIds } from "App/contacts/components/contact-import/contact-import-modal-test-ids.enum"
import { textColor } from "Renderer/styles/theming/theme-getters"
import { ModalIcon } from "Renderer/components/core/modal-shared/modal-shared"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { NewContact } from "App/contacts/reducers/contacts.interface"

const messages = defineMessages({
  title: { id: "module.contacts.importTitle" },
  importingSubtitle: { id: "module.contacts.importSubtitle" },
  importingBody: { id: "module.contacts.importBody" },
  importingButton: { id: "module.contacts.importButton" },
  importSuccessSubtitle: {
    id: "module.contacts.importSuccessSubtitle",
  },
  importSuccessBody: { id: "module.contacts.importSuccessBody" },
  importSuccessButton: { id: "module.contacts.importSuccessButton" },
  importFailedSubtitle: {
    id: "module.contacts.importFailedSubtitle",
  },
  importFailedBody: { id: "module.contacts.importFailedBody" },
  importFailedBody2: { id: "module.contacts.importFailedBody2" },
  importFailedButton: { id: "module.contacts.importFailedButton" },
  importingListTitle: { id: "module.contacts.importingListTitle" },
  importingListSelected: { id: "module.contacts.importingListSelected" },
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

interface Props
  extends Omit<ComponentProps<typeof ModalDialog>, "onActionButtonClick"> {
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
  ...props
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

  const selectedContactsLength = selectedRows.length

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
          <p>{createFullNameStartingFromLastName(data)}</p>
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

  const sortedContacts = contacts.sort((a, b) => {
    const lastNameA = a.lastName || a.firstName || ""
    const lastNameB = b.lastName || b.firstName || ""
    return lastNameA.localeCompare(lastNameB)
  })
  return (
    <ModalDialog
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
      {...props}
    >
      <Image>
        <Icon type={Type.Download} width={5} />
      </Image>
      {modalType === ModalType.Fail && (
        <>
          <ModalText
            message={messages.importFailedSubtitle}
            displayStyle={TextDisplayStyle.QuaternaryHeading}
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
            displayStyle={TextDisplayStyle.QuaternaryHeading}
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
            displayStyle={TextDisplayStyle.QuaternaryHeading}
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
            <Text
              message={{
                ...messages.importingListTitle,
                values: { number: contacts.length },
              }}
              displayStyle={TextDisplayStyle.MediumFadedLightText}
            />
          </Col>
          {[ModalType.Select].includes(modalType) && (
            <SelectedText
              displayStyle={TextDisplayStyle.MediumFadedLightText}
              data-testid={ContactImportModalTestIds.SelectedText}
            >
              {`${selectedContactsLength} ${intl.formatMessage(
                messages.importingListSelected
              )}`}
            </SelectedText>
          )}
          <Col />
        </Labels>
        <TableContent>
          {sortedContacts.map((row, index) => (
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
    </ModalDialog>
  )
}

export default ContactImportModal
