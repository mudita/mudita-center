/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ContactListTestIdsEnum } from "App/contacts/components/contact-list/contact-list-test-ids.enum"
import { ContactListProps } from "App/contacts/components/contact-list/contact-list.component.interface"
import { SelectableContacts } from "App/contacts/components/contact-list/contact-list.styled"
import { HighlightContactList } from "App/contacts/components/highlight-contact-list/highlight-contact-list.component"
import { ResultState } from "App/contacts/reducers/contacts.interface"
import {
  EmptyState,
  LoadingState,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import useTableScrolling from "App/__deprecated__/renderer/utils/hooks/use-table-scrolling"
import { isEqual } from "lodash"
import React, { createRef, useEffect, useState } from "react"
import { defineMessages } from "react-intl"
import { ContactGroup } from "App/contacts/components/contact-group"
import { ContactCategory } from "App/contacts/dto"

const messages = defineMessages({
  forwardNamecard: {
    id: "module.contacts.forwardNamecard",
  },
  unblock: {
    id: "module.contacts.unblock",
  },
  block: {
    id: "module.contacts.block",
  },
  exportAsVcard: {
    id: "module.contacts.exportAsVcard",
  },
  editBulkAction: {
    id: "module.contacts.editBulkAction",
  },
  deleteBulkAction: {
    id: "module.contacts.deleteBulkAction",
  },
  emptyListTitle: {
    id: "module.contacts.emptyListTitle",
  },
  emptySearchDescription: {
    id: "module.contacts.emptySearchDescription",
  },
  emptyPhonebook: {
    id: "module.contacts.emptyPhonebook",
  },
  listUnnamedContact: {
    id: "module.contacts.listUnnamedContact",
  },
})

const ContactList: FunctionComponent<ContactListProps> = ({
  activeRow,
  selectedContact,
  onSelect,
  onExport,
  onEdit,
  onForward,
  onBlock,
  onUnblock,
  onDelete,
  resultsState,
  editMode,
  selectedItems,
  toggleRow,
  contactList,
}) => {
  const [componentContactList, setComponentContactList] =
    useState<ContactCategory[]>(contactList)

  useEffect(() => {
    // prevents contacts list to flash when edit mode is enabled
    if (!isEqual(componentContactList, contactList)) {
      setComponentContactList(contactList)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactList])

  const { enableScroll, disableScroll, scrollable } = useTableScrolling()
  const tableRef = createRef<HTMLDivElement>()
  const [ref, setRef] = useState<HTMLElement>()

  useEffect(() => {
    const table = tableRef.current
    if (table) {
      if (editMode) {
        disableScroll()
      } else {
        enableScroll()
      }
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode])

  useEffect(() => {
    if (tableRef.current) {
      setRef(tableRef.current)
    }
  }, [tableRef])

  return (
    <SelectableContacts
      hideableColumnsIndexes={[2, 3, 4]}
      hideColumns={Boolean(activeRow || editMode)}
      scrollable={scrollable}
      mouseLock={editMode}
      ref={tableRef}
    >
      <HighlightContactList
        contactList={componentContactList}
        selectedContact={selectedContact}
      >
        {resultsState === ResultState.Loaded &&
          componentContactList.length !== 0 &&
          componentContactList.map(({ category, contacts }, categoryIndex) => (
            <ContactGroup
              key={category}
              parentRef={ref}
              category={category}
              contacts={contacts}
              activeRow={activeRow}
              editMode={editMode}
              selectedItems={selectedItems}
              toggleRow={toggleRow}
              onExport={onExport}
              onEdit={onEdit}
              onForward={onForward}
              onBlock={onBlock}
              onUnblock={onUnblock}
              onDelete={onDelete}
              onSelect={onSelect}
              categoryIndex={categoryIndex}
              componentContactList={componentContactList}
              disableScroll={disableScroll}
              enableScroll={enableScroll}
            />
          ))}
        {resultsState === ResultState.Loaded &&
          componentContactList.length === 0 && (
            <EmptyState
              data-testid={ContactListTestIdsEnum.ContactListNoResult}
              title={messages.emptyListTitle}
              description={messages.emptySearchDescription}
            />
          )}
        {(resultsState === ResultState.Empty ||
          resultsState === ResultState.Error) && (
          <EmptyState
            data-testid={ContactListTestIdsEnum.ContactListEmpty}
            title={messages.emptyListTitle}
            description={messages.emptyPhonebook}
          />
        )}
        {resultsState === ResultState.Loading && (
          <LoadingState
            data-testid={ContactListTestIdsEnum.ContactListLoading}
          />
        )}
      </HighlightContactList>
    </SelectableContacts>
  )
}

export default ContactList
