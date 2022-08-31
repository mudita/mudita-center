/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { createRef, Ref, useEffect, useState } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, {
  Col,
  EmptyState,
  Group,
  Labels,
  LoadingState,
  Row,
  TextPlaceholder,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { VisibleCheckbox } from "App/__deprecated__/renderer/components/rest/visible-checkbox/visible-checkbox"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
} from "App/__deprecated__/renderer/components/rest/animated-opacity/animated-opacity"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import Avatar, {
  AvatarSize,
  basicAvatarStyles,
} from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import {
  backgroundColor,
  textColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Icon, {
  IconSize,
} from "App/__deprecated__/renderer/components/core/icon/icon.component"
import useTableScrolling from "App/__deprecated__/renderer/utils/hooks/use-table-scrolling"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import Dropdown from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { InView } from "react-intersection-observer"
import { ContactListTestIdsEnum } from "App/contacts/components/contact-list/contact-list-test-ids.enum"
import ScrollAnchorContainer from "App/__deprecated__/renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import { HighlightContactList } from "App/contacts/components/highlight-contact-list/highlight-contact-list.component"
import { HiddenButton } from "App/contacts/components/contact-list/contact-list.styled"
import { flags, Feature } from "App/feature-flags"
import {
  Contact,
  ContactCategory,
  ResultState,
} from "App/contacts/reducers/contacts.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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

const checkboxShowedStyles = css`
  margin-left: 4.4rem;
  margin-right: 2.8rem;
  display: block;
`

export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  ${({ visible }) => (visible ? checkboxShowedStyles : "display: none;")};
`

export const lightAvatarStyles = css`
  background-color: ${backgroundColor("row")};
`

const InitialsAvatar = styled(Avatar)<{ disabled?: boolean }>`
  margin-right: 1.6rem;
  margin-left: 3.2rem;
`

export const AvatarPlaceholder = styled.div`
  ${basicAvatarStyles};
  margin-right: 1.6rem;
  margin-left: 3.2rem;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  padding-right: 3rem;
  box-sizing: border-box;
`

const BlockedIcon = styled(Icon).attrs(() => ({
  type: IconType.Blocked,
}))`
  margin-left: 1.6rem;
`

const NameSpan = styled(Text)``

const ClickableCol = styled(Col)<{ disabled?: boolean }>`
  height: 100%;

  ${NameSpan} {
    color: ${({ disabled }) => (disabled ? textColor("disabled") : "inherit")};
  }

  ${InitialsAvatar} {
    color: ${({ disabled }) => (disabled ? textColor("accent") : "inherit")};
  }
`

const SelectableContacts = styled(Table)<{ mouseLock?: boolean }>`
  min-width: 32rem;
  flex: 1;
  overflow: auto;
  --columnsTemplate: 8.8rem 1fr 11.5rem 11.5rem auto;
  --columnsTemplateWithOpenedSidebar: 8.8rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};
`

const activeRowStyles = css`
  ${InitialsAvatar} {
    ${lightAvatarStyles};
  }
`

const ContactListRow = styled(Row)`
  ${({ active }) => active && activeRowStyles};
  :hover {
    ${Checkbox} {
      ${animatedOpacityActiveStyles};
      ${checkboxShowedStyles};
    }
    ${InitialsAvatar} {
      ${animatedOpacityStyles};
      display: none;
    }
  }
`

interface ContactListProps {
  activeRow?: Contact
  selectedContact: Contact | null
  onSelect: (contact: Contact) => void
  editMode?: boolean
  resultsState: ResultState
  toggleRow: (id: string) => void
  selectedItems: string[]
  onExport: (ids: string[]) => void
  onForward: (contact: Contact) => void
  onBlock: (contact: Contact) => void
  onUnblock: (contact: Contact) => void
  onDelete: (id: string) => void
  onEdit: (contact: Contact) => void
  contactList: ContactCategory[]
}

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
  const [contactsList, setContactsList] =
    useState<ContactCategory[]>(contactList)
  const componentContactList = editMode ? contactsList : contactList

  useEffect(() => {
    if (!editMode) {
      setContactsList(contactsList)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactList, editMode])

  const { enableScroll, disableScroll, scrollable } = useTableScrolling()
  const tableRef = createRef<HTMLDivElement>()
  const CategoryLabels = styled(Labels)`
    align-items: end;
    background-color: var(--rowBackground) !important;
    grid-template-columns: 1fr;
    > div:first-child {
      margin-bottom: 1.5rem;
      margin-left: 3.2rem;
    }
  `

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
      <HighlightContactList
        contactList={componentContactList}
        selectedContact={selectedContact}
      >
        {resultsState === ResultState.Loaded &&
          componentContactList.length !== 0 &&
          componentContactList.map(({ category, contacts }, categoryIndex) => (
            <Group
              key={category}
              data-testid={ContactListTestIdsEnum.ContactListGroup}
            >
              <CategoryLabels>
                <Col>
                  <Text displayStyle={TextDisplayStyle.Headline4}>
                    {category}
                  </Text>
                </Col>
                <Col />
              </CategoryLabels>
              {contacts.map((contact, index) => {
                const rowActive = activeRow?.id === contact.id
                const rowDisabled = editMode && !rowActive
                const selected = selectedItems.includes(contact.id)
                const onChange = () => toggleRow(contact.id)
                const handleExport = () => onExport([contact.id])
                const handleEdit = () => onEdit(contact)
                const handleForward = () => onForward(contact)
                const handleBlock = () => onBlock(contact)
                const handleUnblock = () => onUnblock(contact)
                const handleDelete = () => onDelete(contact.id)
                const handleSelect = () => onSelect(contact)

                const fullName = createFullName(contact)
                const createStyledFullName = () => {
                  const { firstName, lastName } = contact
                  if (!firstName && !lastName) {
                    return null
                  }
                  if (firstName && lastName) {
                    return (
                      <NameSpan displayStyle={TextDisplayStyle.Paragraph1}>
                        {firstName} {lastName}
                      </NameSpan>
                    )
                  }
                  return (
                    <NameSpan displayStyle={TextDisplayStyle.Paragraph1}>
                      {firstName || lastName}
                    </NameSpan>
                  )
                }
                const phoneNumber =
                  contact.primaryPhoneNumber || contact.secondaryPhoneNumber
                const nextContact = contacts[index + 1]
                  ? contacts[index + 1]
                  : componentContactList[categoryIndex + 1]?.contacts[0]
                const scrollActive =
                  (nextContact || contacts[index]).id === activeRow?.id

                const interactiveRow = (ref: Ref<HTMLDivElement>) => (
                  <ContactListRow
                    useMinRowHeight
                    selected={selected}
                    active={rowActive}
                    ref={ref}
                  >
                    <Col>
                      <Checkbox
                        checked={selected}
                        onChange={onChange}
                        size={Size.Medium}
                        visible={Boolean(selectedItems.length !== 0)}
                      />
                      {selectedItems.length === 0 && (
                        <InitialsAvatar
                          user={contact}
                          light={selected || activeRow === contact}
                          size={AvatarSize.Medium}
                        />
                      )}
                    </Col>
                    <ClickableCol
                      onClick={handleSelect}
                      data-testid={ContactListTestIdsEnum.ContactRow}
                      disabled={rowDisabled}
                    >
                      {createStyledFullName() ||
                        intl.formatMessage(messages.listUnnamedContact)}
                      {contact.blocked && (
                        <BlockedIcon width={1.4} height={1.4} />
                      )}
                    </ClickableCol>
                    <Col>
                      <Text displayStyle={TextDisplayStyle.Paragraph1}>
                        {phoneNumber}
                      </Text>
                    </Col>
                    <Col>
                      <Text displayStyle={TextDisplayStyle.Paragraph1}>
                        {contact.primaryPhoneNumber &&
                          contact.secondaryPhoneNumber &&
                          contact.secondaryPhoneNumber}
                      </Text>
                    </Col>
                    <Col>
                      <Actions>
                        <Dropdown onOpen={disableScroll} onClose={enableScroll}>
                          <HiddenButton
                            labelMessage={messages.forwardNamecard}
                            Icon={IconType.Forward}
                            onClick={handleForward}
                            displayStyle={DisplayStyle.Dropdown}
                            hide={!flags.get(Feature.ContactForwardEnabled)}
                            iconSize={IconSize.Medium}
                          />
                          {contact.blocked ? (
                            <HiddenButton
                              labelMessage={messages.unblock}
                              Icon={IconType.Blocked}
                              onClick={handleUnblock}
                              displayStyle={DisplayStyle.Dropdown}
                              hide={!flags.get(Feature.ContactBlockingEnabled)}
                              iconSize={IconSize.Medium}
                            />
                          ) : (
                            <HiddenButton
                              labelMessage={messages.block}
                              Icon={IconType.Blocked}
                              onClick={handleBlock}
                              displayStyle={DisplayStyle.Dropdown}
                              hide={!flags.get(Feature.ContactBlockingEnabled)}
                              iconSize={IconSize.Medium}
                            />
                          )}
                          <ButtonComponent
                            labelMessage={messages.editBulkAction}
                            iconSize={IconSize.Medium}
                            Icon={IconType.Edit}
                            onClick={handleEdit}
                            displayStyle={DisplayStyle.Dropdown}
                          />
                          <ButtonComponent
                            labelMessage={messages.exportAsVcard}
                            Icon={IconType.UploadDark}
                            onClick={handleExport}
                            iconSize={IconSize.Medium}
                            displayStyle={DisplayStyle.Dropdown}
                          />
                          <ButtonComponent
                            labelMessage={messages.deleteBulkAction}
                            Icon={IconType.Delete}
                            onClick={handleDelete}
                            iconSize={IconSize.Medium}
                            displayStyle={DisplayStyle.Dropdown}
                          />
                        </Dropdown>
                      </Actions>
                    </Col>
                    <ScrollAnchorContainer
                      key={contact.id}
                      active={scrollActive}
                    />
                  </ContactListRow>
                )

                const placeholderRow = (ref: Ref<HTMLDivElement>) => {
                  return (
                    <ContactListRow ref={ref}>
                      <Col />
                      <Col>
                        <AvatarPlaceholder />
                        <TextPlaceholder charsCount={fullName.length} />
                      </Col>
                      <Col>
                        {phoneNumber && (
                          <TextPlaceholder charsCount={phoneNumber.length} />
                        )}
                      </Col>
                      <ScrollAnchorContainer
                        key={contact.id}
                        active={scrollActive}
                      />
                    </ContactListRow>
                  )
                }

                return (
                  <InView key={contact.id}>
                    {({ inView, ref }) =>
                      inView ? interactiveRow(ref) : placeholderRow(ref)
                    }
                  </InView>
                )
              })}
            </Group>
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
