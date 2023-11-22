/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VirtualizedContactListGroupItem } from "App/contacts/components/virtualized-contact-list-group-item"
import { VirtualizedContactListItem } from "App/contacts/components/virtualized-contact-list-item"
import { VirtualizedContactListProps } from "App/contacts/components/virtualized-contact-list/virtualized-contact-list.interface"
import { VirtualListWrapper } from "App/contacts/components/virtualized-contact-list/virtualized-contact-list.styled"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React, { useEffect, useRef } from "react"
import { GroupedVirtuoso, GroupedVirtuosoHandle } from "react-virtuoso"

export const VirtualizedContactList: FunctionComponent<
  VirtualizedContactListProps
> = ({
  componentContactList,
  activeRow,
  editMode,
  toggleRow,
  onExport,
  onEdit,
  onForward,
  onBlock,
  onUnblock,
  onDelete,
  onSelect,
  selectedContact,
  selectedItems,
  testId,
  disableScroll,
  enableScroll,
}) => {
  const virtuoso = useRef<GroupedVirtuosoHandle>(null)
  const groupCounts = componentContactList.map((item) => item.contacts.length)
  const groups = componentContactList.map((item) => item.category)
  const contacts = componentContactList.flatMap((item) => item.contacts)

  useEffect(() => {
    if (selectedContact) {
      const index = contacts.findIndex((item) => item.id === selectedContact.id)

      if (index >= 0) {
        virtuoso.current?.scrollToIndex({
          index,
          align: "center",
        })
      }
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedContact])

  return (
    <VirtualListWrapper data-testid={testId}>
      <GroupedVirtuoso
        ref={virtuoso}
        groupCounts={groupCounts}
        groupContent={(index) => {
          return <VirtualizedContactListGroupItem category={groups[index]} />
        }}
        itemContent={(index) => {
          const contact = contacts[index]

          return (
            <VirtualizedContactListItem
              contact={contact}
              selectedItems={selectedItems}
              isActive={activeRow?.id === contact.id}
              editMode={editMode}
              toggleRow={toggleRow}
              onExport={onExport}
              onEdit={onEdit}
              onForward={onForward}
              onBlock={onBlock}
              onUnblock={onUnblock}
              onDelete={onDelete}
              onSelect={onSelect}
              disableScroll={disableScroll}
              enableScroll={enableScroll}
            />
          )
        }}
      />
    </VirtualListWrapper>
  )
}
