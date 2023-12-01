/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactImportRow } from "App/contacts/components/contact-import-row/contact-import-row.component"
import { ContactImportModalTestIds } from "App/contacts/components/contact-import/contact-import-modal-test-ids.enum"
import { ModalType } from "App/contacts/components/contact-import/contact-import-modal.enum"
import { ContactImportModalProps } from "App/contacts/components/contact-import/contact-import-modal.interface"
import {
  Checkbox,
  Image,
  SubtitleText,
  SyncTable,
  TableContent,
} from "App/contacts/components/contact-import/contact-import-modal.styled"
import {
  ModalText,
  SelectedText,
} from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { NewContact } from "App/contacts/reducers/contacts.interface"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import {
  Col,
  Labels,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import useTableSelect from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import React, { useEffect } from "react"
import { defineMessages } from "react-intl"
import { Virtuoso } from "react-virtuoso"

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

export const ContactImportModal: FunctionComponent<ContactImportModalProps> = ({
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedContactsLength = selectedRows.length

  const handleButtonClick = () => onActionButtonClick(selectedRows)

  const sortedContacts = contacts.sort((a, b) => {
    const lastNameA = a.lastName || a.firstName || ""
    const lastNameB = b.lastName || b.firstName || ""
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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
        <Icon type={IconType.Download} width={2.8} />
      </Image>
      {modalType === ModalType.Fail && (
        <>
          <SubtitleText
            message={messages.importFailedSubtitle}
            displayStyle={TextDisplayStyle.Headline4}
          />
          <ModalText
            message={{
              ...messages.importFailedBody,
              values: { ...textFormatters, num: successfulItemsCount },
            }}
            displayStyle={TextDisplayStyle.Paragraph4}
          />
          <ModalText
            message={messages.importFailedBody2}
            displayStyle={TextDisplayStyle.Paragraph4}
          />
        </>
      )}
      {modalType === ModalType.Success && (
        <>
          <SubtitleText
            message={messages.importSuccessSubtitle}
            displayStyle={TextDisplayStyle.Headline4}
          />
          <ModalText
            message={{
              ...messages.importSuccessBody,
              values: { ...textFormatters, num: contacts.length },
            }}
            displayStyle={TextDisplayStyle.Paragraph3}
          />
        </>
      )}
      {modalType === ModalType.Select && (
        <>
          <SubtitleText
            message={messages.importingSubtitle}
            displayStyle={TextDisplayStyle.Headline4}
          />
          <ModalText
            message={messages.importingBody}
            displayStyle={TextDisplayStyle.Paragraph4}
            color="secondary"
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
              displayStyle={TextDisplayStyle.Title}
              color="secondary"
            />
          </Col>
          {[ModalType.Select].includes(modalType) && (
            <SelectedText
              displayStyle={TextDisplayStyle.Paragraph4}
              data-testid={ContactImportModalTestIds.SelectedText}
              color="secondary"
            >
              {`${selectedContactsLength} ${intl.formatMessage(
                messages.importingListSelected
              )}`}
            </SelectedText>
          )}
          <Col />
        </Labels>
        <TableContent>
          <Virtuoso
            data={sortedContacts}
            itemContent={(_index, data) => {
              return (
                <ContactImportRow
                  testId={ContactImportModalTestIds.ContactRow}
                  data={data}
                  modalType={modalType}
                  getRowStatus={getRowStatus}
                  toggleRow={toggleRow}
                />
              )
            }}
          />
        </TableContent>
      </SyncTable>
    </ModalDialog>
  )
}
