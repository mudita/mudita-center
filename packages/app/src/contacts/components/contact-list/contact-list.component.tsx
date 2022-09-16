/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactListTestIdsEnum } from "App/contacts/components/contact-list/contact-list-test-ids.enum"
import { ContactListProps } from "App/contacts/components/contact-list/contact-list.component.interface"
import { SelectableContacts } from "App/contacts/components/contact-list/contact-list.styled"
import { VirtualizedContactList } from "App/contacts/components/virtualized-contact-list"
import {
  ContactCategory,
  ResultState,
} from "App/contacts/reducers/contacts.interface"
import {
  EmptyState,
  LoadingState,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import useTableScrolling from "App/__deprecated__/renderer/utils/hooks/use-table-scrolling"
import { isEqual } from "lodash"
import React, { createRef, useEffect, useState } from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  emptyListTitle: {
    id: "module.contacts.emptyListTitle",
  },
  emptySearchDescription: {
    id: "module.contacts.emptySearchDescription",
  },
  emptyPhonebook: {
    id: "module.contacts.emptyPhonebook",
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

  return (
    <SelectableContacts
      hideableColumnsIndexes={[2, 3, 4]}
      hideColumns={Boolean(activeRow || editMode)}
      scrollable={scrollable}
      mouseLock={editMode}
      ref={tableRef}
    >
      {resultsState === ResultState.Loaded &&
        componentContactList.length !== 0 && (
          <VirtualizedContactList
            testId={ContactListTestIdsEnum.ContactListWithResults}
            selectedContact={selectedContact}
            componentContactList={componentContactList}
            activeRow={activeRow}
            editMode={editMode}
            toggleRow={toggleRow}
            onExport={onExport}
            onEdit={onEdit}
            onForward={onForward}
            onBlock={onBlock}
            onUnblock={onUnblock}
            onDelete={onDelete}
            onSelect={onSelect}
            selectedItems={selectedItems}
            disableScroll={disableScroll}
            enableScroll={enableScroll}
          />
        )}
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
        <LoadingState data-testid={ContactListTestIdsEnum.ContactListLoading} />
      )}
    </SelectableContacts>
  )
}

export default ContactList
