import React, { createRef, useEffect } from "react"
import {
  Contact,
  Contacts,
  NewContact,
  ResultsState,
} from "Renderer/models/phone/phone.typings"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, {
  Col,
  EmptyState,
  Group,
  Labels,
  LoadingState,
  Row,
} from "Renderer/components/core/table/table.component"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { VisibleCheckbox } from "Renderer/components/rest/visible-checkbox/visible-checkbox"
import { animatedOpacityActiveStyles } from "Renderer/components/rest/animated-opacity/animated-opacity"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Avatar, {
  AvatarSize,
  basicAvatarStyles,
} from "Renderer/components/core/avatar/avatar.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { ContactActions } from "Renderer/components/rest/phone/contact-details.component"
import useTableScrolling from "Renderer/utils/hooks/use-table-scrolling"
import { FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { ContactListTestIdsEnum } from "Renderer/components/rest/phone/contact-list-test-ids.enum"
import ScrollAnchorContainer from "Renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import { HighlightContactList } from "Renderer/components/rest/phone/highlight-contact-list.component"
import Badge from "Renderer/components/core/badge/badge.component"
import { List, ListRowProps } from "react-virtualized"

export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  margin: 0 auto;
`

export const lightAvatarStyles = css`
  background-color: ${backgroundColor("row")};
`

const InitialsAvatar = styled(Avatar)`
  margin-right: 1.2rem;
`

const ClickableCol = styled(Col)`
  height: 100%;
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

const SelectableContacts = styled(Table)<{ mouseLock?: boolean }>`
  flex: 1;
  overflow: auto;
  --columnsTemplate: 4rem 1fr auto 4.8rem 13.5rem;
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

export interface ContactListProps extends Contacts, ContactActions, SelectHook {
  activeRow?: Contact
  selectedContact: Contact | null
  onSelect: (contact: Contact) => void
  newContact?: NewContact
  editedContact?: Contact
  resultsState: ResultsState
}

const ContactList: FunctionComponent<ContactListProps> = ({
  contactList,
  activeRow,
  selectedContact,
  onSelect,
  onExport,
  onForward,
  onBlock,
  onUnblock,
  onDelete,
  newContact,
  resultsState,
  editedContact,
  getRowStatus,
  toggleRow,
  noneRowsSelected,
}) => {
  const { enableScroll, disableScroll, scrollable } = useTableScrolling()
  const tableRef = createRef<HTMLDivElement>()

  useEffect(() => {
    const table = tableRef.current
    if (table) {
      if (newContact) {
        table.scrollTop = 0
        disableScroll()
      } else if (editedContact) {
        disableScroll()
      } else {
        enableScroll()
      }
    }
  }, [newContact, editedContact])

  return (
    <SelectableContacts
      hideableColumnsIndexes={[2, 3, 4]}
      hideColumns={
        Boolean(activeRow) || Boolean(newContact) || Boolean(editedContact)
      }
      scrollable={scrollable && !newContact}
      mouseLock={Boolean(newContact || editedContact)}
      ref={tableRef}
    >
      {newContact && (
        <Group>
          <Labels>
            <Col />
            <Col>
              <FormattedMessage id={"view.name.phone.contacts.new.title"} />
            </Col>
          </Labels>
          <Row active>
            <Col />
            <Col>
              <InitialsAvatar user={newContact} light size={AvatarSize.Small} />
              {newContact.firstName} {newContact.lastName}
            </Col>
          </Row>
        </Group>
      )}
      <HighlightContactList
        contactList={contactList}
        selectedContact={selectedContact}
      >
        {resultsState === ResultsState.Loaded &&
          (contactList.length ? (
            contactList.map(({ category, contacts }, categoryIndex) => {
              const renderRow = ({ key, index, style }: ListRowProps) => {
                const contact = contacts[index]
                const { selected } = getRowStatus(contact)
                const onChange = () => toggleRow(contact)
                const handleExport = () => onExport(contact)
                const handleForward = () => onForward(contact)
                const handleBlock = () => onBlock(contact)
                const handleUnblock = () => onUnblock(contact)
                const handleDelete = () => onDelete(contact)
                const handleSelect = () => onSelect(contact)
                const createStyledFullName = () => {
                  const { firstName, lastName } = contact
                  if (!firstName && !lastName) {
                    return null
                  }
                  if (firstName && lastName) {
                    return (
                      <span>
                        {firstName} <strong>{lastName}</strong>
                      </span>
                    )
                  }
                  return (
                    <span>
                      <strong>{firstName || lastName}</strong>
                    </span>
                  )
                }
                const phoneNumber =
                  contact.primaryPhoneNumber || contact.secondaryPhoneNumber
                const nextContact = contacts[index + 1]
                  ? contacts[index + 1]
                  : contactList[categoryIndex + 1]?.contacts[0]
                const scrollActive =
                  (nextContact || contacts[index]).id === activeRow?.id
                return (
                  <Row
                    selected={selected}
                    active={(activeRow || editedContact)?.id === contact.id}
                    style={style}
                    key={key}
                  >
                    <Col>
                      <Checkbox
                        checked={selected}
                        onChange={onChange}
                        size={Size.Small}
                        visible={!noneRowsSelected}
                      />
                    </Col>
                    <ClickableCol
                      onClick={handleSelect}
                      data-testid={ContactListTestIdsEnum.ContactRow}
                    >
                      <InitialsAvatar
                        user={contact}
                        light={selected || activeRow === contact}
                        size={AvatarSize.Small}
                      />
                      {createStyledFullName() ||
                        intl.formatMessage({
                          id: "view.name.phone.contacts.list.unnamedContact",
                        })}
                      {contact.blocked && (
                        <BlockedIcon width={1.4} height={1.4} />
                      )}
                    </ClickableCol>
                    <Col>{phoneNumber}</Col>
                    <Col>
                      {contact.primaryPhoneNumber &&
                        contact.secondaryPhoneNumber && <Badge>+1</Badge>}
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
                          <ButtonComponent
                            labelMessage={{
                              id:
                                "view.name.phone.contacts.action.exportAsVcard",
                            }}
                            Icon={Type.Upload}
                            onClick={handleExport}
                            displayStyle={DisplayStyle.Dropdown}
                          />
                          <ButtonComponent
                            labelMessage={{
                              id:
                                "view.name.phone.contacts.action.forwardNamecard",
                            }}
                            Icon={Type.Forward}
                            onClick={handleForward}
                            displayStyle={DisplayStyle.Dropdown}
                          />
                          {contact.blocked ? (
                            <ButtonComponent
                              labelMessage={{
                                id: "view.name.phone.contacts.action.unblock",
                              }}
                              Icon={Type.Blocked}
                              onClick={handleUnblock}
                              displayStyle={DisplayStyle.Dropdown}
                            />
                          ) : (
                            <ButtonComponent
                              labelMessage={{
                                id: "view.name.phone.contacts.action.block",
                              }}
                              Icon={Type.Blocked}
                              onClick={handleBlock}
                              displayStyle={DisplayStyle.Dropdown}
                            />
                          )}
                          <ButtonComponent
                            labelMessage={{
                              id: "view.name.phone.contacts.action.delete",
                            }}
                            Icon={Type.Delete}
                            onClick={handleDelete}
                            displayStyle={DisplayStyle.Dropdown}
                          />
                        </Dropdown>
                      </Actions>
                    </Col>
                    <ScrollAnchorContainer
                      key={contact.id + category}
                      active={scrollActive}
                    />
                  </Row>
                )
              }
              return (
                <Group key={category}>
                  <Labels>
                    <Col />
                    <Col>{category}</Col>
                  </Labels>
                  <List
                    height={contacts.length * 64}
                    width={973}
                    overscanRowCount={10}
                    rowRenderer={renderRow}
                    rowCount={contacts.length}
                    rowHeight={64}
                  />
                </Group>
              )
            })
          ) : (
            <EmptyState
              title={{ id: "view.name.phone.contacts.emptyList.title" }}
              description={{
                id:
                  "view.name.phone.contacts.emptyList.emptySearch.description",
              }}
            />
          ))}
        {resultsState === ResultsState.Empty ||
          (resultsState === ResultsState.Error && (
            <EmptyState
              title={{ id: "view.name.phone.contacts.emptyList.title" }}
              description={{
                id:
                  "view.name.phone.contacts.emptyList.emptyPhonebook.description",
              }}
            />
          ))}
        {resultsState === ResultsState.Loading && <LoadingState />}
      </HighlightContactList>
    </SelectableContacts>
  )
}

export default ContactList
