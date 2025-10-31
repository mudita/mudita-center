/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useMemo, useRef } from "react"
import { TableNew } from "app-theme/ui"
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

interface Props {
  contacts: Contact[]
}

export const Contacts: FunctionComponent<Props> = ({ contacts }) => {
  return (
    <Form>
      <ContactsInner contacts={contacts} />
    </Form>
  )
}

const ContactsInner: FunctionComponent<Props> = ({ contacts }) => {
  const { setValue, watch } = useFormContext<FormValues>()
  const tableRef = useRef<TableNew<Contact, "contactId">>(null)

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
    (contact: Contact, index: number) => {
      const onClick = () => {
        handleRowClick(contact.contactId)
      }
      return (
        <TableNew.Row
          onClick={onClick}
          rowSelectorCheckboxDataAttr={"data-row-checkbox"}
          active={activeContactId === contact.contactId}
        >
          <ColumnCheckbox
            id={contact.contactId}
            index={index}
            checkboxDataAttr={"data-row-checkbox"}
          />
          <ColumnName contact={contact} />
          <ColumnPhone contact={contact} hidden={!!activeContactId} />
          <ColumnMorePhones contact={contact} hidden={!!activeContactId} />
        </TableNew.Row>
      )
    },
    [activeContactId, handleRowClick]
  )

  const table = useMemo(() => {
    return (
      <TableNew
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
    return <Panel contactsIds={contactsIds}>{search}</Panel>
  }, [contactsIds, search])

  const details = useMemo(() => {
    return <Details contact={activeContact} onClose={handleDetailsClose} />
  }, [activeContact, handleDetailsClose])

  if (contacts.length === 0) {
    return (
      <Empty
        onImport={() => {
          // TODO: implement import contacts action
        }}
      />
    )
  }

  return (
    <Wrapper>
      {panel}
      <TableWrapper>
        {table}
        {details}
      </TableWrapper>
    </Wrapper>
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

  div:has(table) {
    flex: 1;
    min-width: 36rem;
  }
`
