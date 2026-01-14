/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  GenericDeleteFlow,
  GenericDeleteFlowProps,
  Table,
} from "app-theme/ui"
import styled from "styled-components"
import { useFormContext } from "react-hook-form"
import {
  ColumnCheckbox,
  ColumnMorePhones,
  ColumnName,
  ColumnPhone,
} from "./columns"
import { Details } from "./details"
import { Contact, ContactsNormalized } from "devices/common/models"
import { Panel } from "./panel"
import { Search } from "./search"
import { Form, FormValues } from "./form"
import { Empty } from "./empty"
import { makeName } from "./name-field"
import { defineMessages } from "app-localize/utils"
import {
  ContactsImportFlow,
  ImportCallback,
  ProviderSelectCallback,
} from "../contacts-import-flow/contacts-import-flow"

const messages = defineMessages({
  confirmDeleteModalTitle: {
    id: "apiDevice.contacts.delete.confirmModal.title",
  },
  confirmDeleteModalDescription: {
    id: "apiDevice.contacts.delete.confirmModal.description",
  },
  confirmDeleteModalCancelButtonText: {
    id: "general.app.backButton.text",
  },
  confirmDeleteModalConfirmButtonText: {
    id: "apiDevice.contacts.delete.confirmModal.confirmButton",
  },
  deleteFailedAllModalTitle: {
    id: "apiDevice.contacts.delete.allFailedModal.title",
  },
  deleteFailedAllModalDescription: {
    id: "apiDevice.contacts.delete.allFailedModal.description",
  },
  deleteFailedSomeModalTitle: {
    id: "apiDevice.contacts.delete.someFailedModal.title",
  },
  deleteFailedDescriptionModalDescription: {
    id: "apiDevice.contacts.delete.someFailedModal.description",
  },
  deleteFailedModalCloseButtonText: {
    id: "general.app.closeButton.text",
  },
  deletingModalTitle: {
    id: "apiDevice.contacts.delete.deletingModal.title",
  },
  deleteSuccessToastText: {
    id: "apiDevice.contacts.delete.successToast",
  },
})

enum DeleteType {
  ActiveContact,
  CheckedContacts,
}

interface Props {
  contacts: Contact[]
  onDelete: GenericDeleteFlowProps["deleteItemsAction"]
  onProviderSelect: ProviderSelectCallback
  onImport: ImportCallback
  onImportCancel: VoidFunction
  onManageDuplicates: VoidFunction
  onHelpClick?: VoidFunction
}

export const Contacts: FunctionComponent<Props> = (props) => {
  return (
    <Form>
      <ContactsInner {...props} />
    </Form>
  )
}

const ContactsInner: FunctionComponent<Props> = ({
  contacts,
  onDelete,
  onProviderSelect,
  onImport,
  onImportCancel,
  onManageDuplicates,
  onHelpClick,
}) => {
  const { setValue, watch, getValues } = useFormContext<FormValues>()
  const tableRef = useRef<Table<Contact, "contactId">>(null)
  const genericDeleteRef = useRef<GenericDeleteFlow>(null)
  const importFlowRef = useRef<ContactsImportFlow>(null)
  const [deleteType, setDeleteType] = useState<DeleteType>()

  const activeContactId = watch("activeContactId")
  const activeContact = contacts?.find(
    (contact) => contact.contactId === activeContactId
  )

  const contactsIds = useMemo(
    () => contacts.map((contact) => contact.contactId),
    [contacts]
  )
  const normalizedContacts = useMemo(() => {
    return Object.fromEntries(
      contacts.map((contact) => [contact.contactId, contact])
    ) as ContactsNormalized
  }, [contacts])

  const handleActiveContactDelete = useCallback(async () => {
    if (!activeContactId) {
      return
    }
    setDeleteType(DeleteType.ActiveContact)
    genericDeleteRef.current?.deleteItems([
      {
        id: activeContactId,
        name: makeName(normalizedContacts[activeContactId], true),
      },
    ])
  }, [activeContactId, normalizedContacts])

  const handleCheckedContactsDelete = useCallback(() => {
    const checkedContacts = Object.entries(getValues().selectedContacts)
      .filter(([, isChecked]) => isChecked)
      .map(([id]) => id)

    if (checkedContacts.length === 0) {
      return
    }

    setDeleteType(DeleteType.CheckedContacts)
    genericDeleteRef.current?.deleteItems(
      checkedContacts.map((id) => ({
        id: id,
        name: makeName(normalizedContacts[id], true),
      }))
    )
  }, [getValues, normalizedContacts])

  const handleDeleteSuccess: NonNullable<
    GenericDeleteFlowProps["onDeleteSuccess"]
  > = useCallback(
    async ({ allItems, failedItems }) => {
      const activeContactId = getValues().activeContactId

      if (deleteType === DeleteType.CheckedContacts) {
        // Update checked contacts, removing successfully deleted ones
        setValue(
          "selectedContacts",
          Object.fromEntries(
            contactsIds.map((id) => [
              id,
              !!failedItems?.find((item) => item.id === id),
            ])
          )
        )

        // If the active contact was deleted successfully, clear it
        if (
          activeContactId &&
          allItems.find((item) => item.id === activeContactId) &&
          !failedItems?.find((item) => item.id === activeContactId)
        ) {
          setValue("activeContactId", undefined)
        }
      }

      if (deleteType === DeleteType.ActiveContact) {
        // If the active contact was checked, remove it from checked contacts
        if (
          activeContactId !== undefined &&
          getValues().selectedContacts[activeContactId] &&
          !failedItems?.find((item) => item.id === activeContactId)
        ) {
          setValue("selectedContacts", {
            ...getValues().selectedContacts,
            [activeContactId]: false,
          })
        }

        // If the active contact was deleted successfully, clear it
        if (!failedItems?.find((item) => item.id === activeContactId)) {
          setValue("activeContactId", undefined)
        }
      }
    },
    [contactsIds, deleteType, getValues, setValue]
  )

  const handleImportStart = useCallback(() => {
    importFlowRef.current?.start()
  }, [])

  const handleRowClick = useCallback(
    (contactId: Contact["contactId"]) => {
      setValue("activeContactId", contactId)
    },
    [setValue]
  )

  const handleDetailsClose = useCallback(() => {
    setValue("activeContactId", undefined)
  }, [setValue])

  const handleSearchResultClick = useCallback(
    (contactId: Contact["contactId"]) => {
      tableRef.current?.scrollToItem(contactId)
      setValue("activeContactId", contactId)
    },
    [setValue]
  )

  const rowRenderer = useCallback(
    (contact: Contact) => {
      const onClick = () => {
        handleRowClick(contact.contactId)
      }
      return (
        <Table.Row
          key={contact.contactId}
          onClick={onClick}
          rowSelectorCheckboxDataAttr={"data-row-checkbox"}
          active={activeContactId === contact.contactId}
        >
          <ColumnCheckbox
            id={contact.contactId}
            checkboxDataAttr={"data-row-checkbox"}
          />
          <ColumnName contact={contact} />
          <ColumnPhone
            phoneNumbers={contact.phoneNumbers}
            hidden={!!activeContactId}
          />
          <ColumnMorePhones
            phoneNumbers={contact.phoneNumbers}
            hidden={!!activeContactId}
          />
        </Table.Row>
      )
    },
    [activeContactId, handleRowClick]
  )

  const table = useMemo(() => {
    return (
      <Table
        ref={tableRef}
        itemIdField={"contactId"}
        items={contacts || []}
        rowRenderer={rowRenderer}
      />
    )
  }, [contacts, rowRenderer])

  const search = useMemo(() => {
    return (
      <Search
        normalizedContacts={normalizedContacts}
        dataIds={contactsIds}
        onSelectContact={handleSearchResultClick}
      />
    )
  }, [contactsIds, handleSearchResultClick, normalizedContacts])

  const panel = useMemo(() => {
    return (
      <Panel
        contactsIds={contactsIds}
        onDeleteClick={handleCheckedContactsDelete}
        onImportClick={handleImportStart}
      >
        {search}
      </Panel>
    )
  }, [contactsIds, handleCheckedContactsDelete, handleImportStart, search])

  const details = useMemo(() => {
    return (
      <Details
        contact={activeContact}
        onClose={handleDetailsClose}
        onDelete={handleActiveContactDelete}
      />
    )
  }, [activeContact, handleDetailsClose, handleActiveContactDelete])

  const deleteFlow = useMemo(() => {
    return (
      <GenericDeleteFlow
        ref={genericDeleteRef}
        deleteItemsAction={onDelete}
        deleteFlowMessages={messages}
        onDeleteSuccess={handleDeleteSuccess}
      />
    )
  }, [handleDeleteSuccess, onDelete])

  const importFlow = useMemo(() => {
    return (
      <ContactsImportFlow
        ref={importFlowRef}
        onProviderSelect={onProviderSelect}
        onImport={onImport}
        onImportCancel={onImportCancel}
        onManageDuplicates={onManageDuplicates}
        onHelpClick={onHelpClick}
      />
    )
  }, [
    onHelpClick,
    onImport,
    onImportCancel,
    onManageDuplicates,
    onProviderSelect,
  ])

  return (
    <>
      {contacts.length === 0 ? (
        <Empty onImportClick={handleImportStart} />
      ) : (
        <>
          <Wrapper>
            {panel}
            <TableWrapper>
              {table}
              {details}
            </TableWrapper>
          </Wrapper>
          {deleteFlow}
        </>
      )}
      {importFlow}
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.app.color.white};
`

const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
`
