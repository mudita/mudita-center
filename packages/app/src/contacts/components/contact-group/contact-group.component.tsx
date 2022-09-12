/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FixedSizeList as List } from "react-window"
import { AutoSizer } from "react-virtualized"
import { ContactGroupTestIdsEnum } from "App/contacts/components/contact-group/contact-group-test-ids.enum"
import { CategoryLabels } from "App/contacts/components/contact-group/contact-group.styled"
import {
  Col,
  Group,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ContactGroupProps } from "App/contacts/components/contact-group/contact-group.interface"
import { ContactItem } from "App/contacts/components/contact-item"

export const ContactGroup: FunctionComponent<ContactGroupProps> = ({
  category,
  contacts,
  activeRow,
  editMode,
  selectedItems,
  toggleRow,
  onExport,
  onEdit,
  onForward,
  onBlock,
  onUnblock,
  onDelete,
  onSelect,
  categoryIndex,
  componentContactList,
  disableScroll,
  enableScroll,
}) => {
  return (
    <Group data-testid={ContactGroupTestIdsEnum.ContactListGroup}>
      <CategoryLabels>
        <Col>
          <Text displayStyle={TextDisplayStyle.Headline4}>{category}</Text>
        </Col>
        <Col />
      </CategoryLabels>

      <div
        style={{
          height:
            contacts.length > 50
              ? `${window.innerHeight}px`
              : `${contacts.length * 64}px`,
        }}
      >
        <AutoSizer disableWidth>
          {({ height }) => (
            <List
              className="contacts-list"
              height={height}
              itemCount={contacts.length}
              itemSize={64}
              width={"100%"}
              style={{
                overflow: contacts.length > 50 ? "auto" : "hidden",
              }}
            >
              {({ index, style }) => {
                const contact = contacts[index]
                const nextContact = contacts[index + 1]
                  ? contacts[index + 1]
                  : componentContactList[categoryIndex + 1]?.contacts[0]
                const scrollActive =
                  (nextContact || contacts[index]).id === activeRow?.id

                return (
                  <ContactItem
                    key={`contact-${contact.id}`}
                    contact={contact}
                    style={style}
                    selected={selectedItems.includes(contact.id)}
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
                    disableScroll={disableScroll}
                    enableScroll={enableScroll}
                    scrollActive={scrollActive}
                    showCheckbox={selectedItems.length > 0}
                  />
                )
              }}
            </List>
          )}
        </AutoSizer>
      </div>
    </Group>
  )
}
