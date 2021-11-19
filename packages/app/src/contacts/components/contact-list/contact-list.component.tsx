/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { createRef, Ref, useEffect } from "react"
import { Contact } from "App/contacts/store/contacts.type"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, {
  Col,
  EmptyState,
  Group,
  Labels,
  LoadingState,
  Row,
  TextPlaceholder,
} from "Renderer/components/core/table/table.component"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { VisibleCheckbox } from "Renderer/components/rest/visible-checkbox/visible-checkbox"
import { animatedOpacityActiveStyles } from "Renderer/components/rest/animated-opacity/animated-opacity"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Avatar, {
  AvatarSize,
  basicAvatarStyles,
} from "Renderer/components/core/avatar/avatar.component"
import {
  backgroundColor,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { ContactActions } from "App/contacts/components/contact-details/contact-details.component"
import useTableScrolling from "Renderer/utils/hooks/use-table-scrolling"
import { createFullName } from "App/contacts/store/contacts.helpers"
import { intl } from "Renderer/utils/intl"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { InView } from "react-intersection-observer"
import { ContactListTestIdsEnum } from "App/contacts/components/contact-list/contact-list-test-ids.enum"
import ScrollAnchorContainer from "Renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import { HighlightContactList } from "App/contacts/components/highlight-contact-list/highlight-contact-list.component"
import { Contacts } from "App/contacts/store/contacts.interface"
import { ResultsState } from "App/contacts/store/contacts.enum"
import { HiddenButton } from "App/contacts/components/contact-list/contact-list.styled"
import { flags, Feature } from "App/feature-flags"

export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  margin: 0 auto;
`

export const lightAvatarStyles = css`
  background-color: ${backgroundColor("row")};
`

const InitialsAvatar = styled(Avatar)<{ disabled?: boolean }>`
  margin-right: 1.2rem;
`

export const AvatarPlaceholder = styled.div`
  ${basicAvatarStyles};
  margin-right: 1.2rem;
`

const ActionsButton = styled.span`
  cursor: pointer;
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
  type: Type.Blocked,
}))`
  margin-left: 1.6rem;
`

const NameSpan = styled.span``

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
  --columnsTemplate: 4rem 63rem 11.5rem 11.5rem auto;
  --columnsTemplateWithOpenedSidebar: 4rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};

  ${Row} {
    :hover {
      ${Checkbox} {
        ${animatedOpacityActiveStyles};
      }
      ${InitialsAvatar} {
        ${lightAvatarStyles};
      }
    }
  }
`

type SelectHook = Pick<
  UseTableSelect<Contact>,
  "getRowStatus" | "toggleRow" | "noneRowsSelected"
>
interface Props extends Contacts, ContactActions, SelectHook {
  activeRow?: Contact
  selectedContact: Contact | null
  onSelect: (contact: Contact) => void
  editMode?: boolean
  resultsState: ResultsState
}

const ContactList: FunctionComponent<Props> = ({
  contactList,
  activeRow,
  selectedContact,
  onSelect,
  onExport,
  onForward,
  onBlock,
  onUnblock,
  onDelete,
  resultsState,
  editMode,
  getRowStatus,
  toggleRow,
  noneRowsSelected,
}) => {
  const { enableScroll, disableScroll, scrollable } = useTableScrolling()
  const tableRef = createRef<HTMLDivElement>()
  const CategoryLabels = styled(Labels)`
    align-items: end;
    background-color: var(--rowBackground) !important;
    > div:last-child {
      margin-bottom: 1.5rem;
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
        contactList={contactList}
        selectedContact={selectedContact}
      >
        {resultsState === ResultsState.Loaded &&
          contactList.length !== 0 &&
          contactList.map(({ category, contacts }, categoryIndex) => (
            <Group
              key={category}
              data-testid={ContactListTestIdsEnum.ContactListGroup}
            >
              <CategoryLabels>
                <Col />
                <Col>{category}</Col>
              </CategoryLabels>
              {contacts.map((contact, index) => {
                const rowActive = activeRow?.id === contact.id
                const rowDisabled = editMode && !rowActive
                const { selected } = getRowStatus(contact)
                const onChange = () => toggleRow(contact)
                const handleExport = () => onExport([contact])
                const handleForward = () => onForward(contact)
                const handleBlock = () => onBlock(contact)
                const handleUnblock = () => onUnblock(contact)
                const handleDelete = () => onDelete(contact)
                const handleSelect = () => onSelect(contact)

                const fullName = createFullName(contact)
                const createStyledFullName = () => {
                  const { firstName, lastName } = contact
                  if (!firstName && !lastName) {
                    return null
                  }
                  if (firstName && lastName) {
                    return (
                      <NameSpan>
                        {firstName} <strong>{lastName}</strong>
                      </NameSpan>
                    )
                  }
                  return (
                    <NameSpan>
                      <strong>{firstName || lastName}</strong>
                    </NameSpan>
                  )
                }
                const phoneNumber =
                  contact.primaryPhoneNumber || contact.secondaryPhoneNumber
                const nextContact = contacts[index + 1]
                  ? contacts[index + 1]
                  : contactList[categoryIndex + 1]?.contacts[0]
                const scrollActive =
                  (nextContact || contacts[index]).id === activeRow?.id

                const interactiveRow = (ref: Ref<HTMLDivElement>) => (
                  <Row selected={selected} active={rowActive} ref={ref}>
                    <Col>
                      <Checkbox
                        checked={selected}
                        onChange={onChange}
                        size={Size.Medium}
                        visible={!noneRowsSelected}
                      />
                    </Col>
                    <ClickableCol
                      onClick={handleSelect}
                      data-testid={ContactListTestIdsEnum.ContactRow}
                      disabled={rowDisabled}
                    >
                      <InitialsAvatar
                        user={contact}
                        light={selected || activeRow === contact}
                        size={AvatarSize.Medium}
                      />
                      {createStyledFullName() ||
                        intl.formatMessage({
                          id: "module.contacts.listUnnamedContact",
                        })}
                      {contact.blocked && (
                        <BlockedIcon width={1.4} height={1.4} />
                      )}
                    </ClickableCol>
                    <Col>{phoneNumber}</Col>
                    <Col>
                      {contact.primaryPhoneNumber &&
                        contact.secondaryPhoneNumber &&
                        contact.secondaryPhoneNumber}
                    </Col>
                    <Col>
                      <Actions>
                        <Dropdown
                          toggler={
                            <ActionsButton>
                              <Icon type={Type.More} />
                            </ActionsButton>
                          }
                          onOpen={disableScroll}
                          onClose={enableScroll}
                        >
                          <HiddenButton
                            labelMessage={{
                              id: "module.contacts.exportAsVcard",
                            }}
                            Icon={Type.Upload}
                            onClick={handleExport}
                            displayStyle={DisplayStyle.Dropdown}
                            hide={flags.get(Feature.ProductionAndAlpha)}
                          />
                          <HiddenButton
                            labelMessage={{
                              id: "module.contacts.forwardNamecard",
                            }}
                            Icon={Type.Forward}
                            onClick={handleForward}
                            displayStyle={DisplayStyle.Dropdown}
                            hide={flags.get(Feature.ProductionAndAlpha)}
                          />
                          {contact.blocked ? (
                            <HiddenButton
                              labelMessage={{
                                id: "module.contacts.unblock",
                              }}
                              Icon={Type.Blocked}
                              onClick={handleUnblock}
                              displayStyle={DisplayStyle.Dropdown}
                              hide={flags.get(Feature.ProductionAndAlpha)}
                            />
                          ) : (
                            <HiddenButton
                              labelMessage={{
                                id: "module.contacts.block",
                              }}
                              Icon={Type.Blocked}
                              onClick={handleBlock}
                              displayStyle={DisplayStyle.Dropdown}
                              hide={flags.get(Feature.ProductionAndAlpha)}
                            />
                          )}
                          <ButtonComponent
                            labelMessage={{
                              id: "module.contacts.delete",
                            }}
                            Icon={Type.Delete}
                            onClick={handleDelete}
                            displayStyle={DisplayStyle.Dropdown}
                          />
                        </Dropdown>
                      </Actions>
                    </Col>
                    <ScrollAnchorContainer
                      key={contact.id}
                      active={scrollActive}
                    />
                  </Row>
                )

                const placeholderRow = (ref: Ref<HTMLDivElement>) => {
                  return (
                    <Row ref={ref}>
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
                    </Row>
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
        {resultsState === ResultsState.Loaded && contactList.length === 0 && (
          <EmptyState
            data-testid={ContactListTestIdsEnum.ContactListNoResult}
            title={{ id: "module.contacts.emptyListTitle" }}
            description={{
              id: "module.contacts.emptySearchDescription",
            }}
          />
        )}
        {(resultsState === ResultsState.Empty ||
          resultsState === ResultsState.Error) && (
          <EmptyState
            data-testid={ContactListTestIdsEnum.ContactListEmpty}
            title={{ id: "module.contacts.emptyListTitle" }}
            description={{
              id: "module.contacts.emptyPhonebook",
            }}
          />
        )}
        {resultsState === ResultsState.Loading && (
          <LoadingState
            data-testid={ContactListTestIdsEnum.ContactListLoading}
          />
        )}
      </HighlightContactList>
    </SelectableContacts>
  )
}

export default ContactList
