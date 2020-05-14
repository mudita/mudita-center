import React, { createRef, Ref, useEffect } from "react"
import {
  Contact,
  Contacts,
  NewContact,
} from "Renderer/models/phone/phone.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, {
  Col,
  EmptyState,
  Group,
  Labels,
  Row,
} from "Renderer/components/core/table/table.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Avatar, {
  AvatarSize,
  basicAvatarStyles,
} from "Renderer/components/core/avatar/avatar.component"
import {
  backgroundColor,
  borderRadius,
  textColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { ContactActions } from "Renderer/components/rest/phone/contact-details.component"
import useTableScrolling from "Renderer/utils/hooks/use-table-scrolling"
import { FormattedMessage } from "react-intl"
import { createFullName } from "Renderer/models/phone/phone.utils"
import { intl } from "Renderer/utils/intl"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { InView } from "react-intersection-observer"

const visibleCheckboxStyles = css`
  opacity: 1;
  visibility: visible;
`

const Checkbox = styled(InputCheckbox)<{ visible?: boolean }>`
  opacity: 0;
  visibility: hidden;
  transition: opacity ${transitionTime("faster")}
      ${transitionTimingFunction("smooth")},
    visibility ${transitionTime("faster")} ${transitionTimingFunction("smooth")};
  margin: 0 auto;

  ${({ visible }) => visible && visibleCheckboxStyles};
`

const lightAvatarStyles = css`
  background-color: ${backgroundColor("avatarLight")};
`

const InitialsAvatar = styled(Avatar)`
  margin-right: 1.2rem;
`

const ClickableCol = styled(Col)`
  height: 100%;
`

const AvatarPlaceholder = styled.div`
  ${basicAvatarStyles};
  margin-right: 1.2rem;
`

const TextPlaceholder = styled.span<{ charsCount: number }>`
  display: block;
  background-color: ${backgroundColor("accent")};
  height: 1em;
  border-radius: ${borderRadius("medium")};
  width: ${({ charsCount }) => charsCount * 0.6}rem;
  min-width: 5rem;
`

const MoreNumbers = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SmallText,
}))`
  width: 3.2rem;
  padding: 0 1rem;
  box-sizing: border-box;
  margin-left: 1.6rem;
  text-align: center;
  color: ${textColor("darkGrey")};
  background-color: ${backgroundColor("grey")};
  border-radius: ${borderRadius("medium")};
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
        ${visibleCheckboxStyles};
      }
      ${InitialsAvatar} {
        ${lightAvatarStyles};
      }
    }
  }
`

export interface ContactListProps extends Contacts, ContactActions {
  activeRow?: Contact
  onCheck: (contacts: Contact[]) => void
  onSelect: (contact: Contact) => void
  newContact?: NewContact
  editedContact?: Contact
  loadingList?: boolean
  searching?: boolean
}

const ContactList: FunctionComponent<ContactListProps> = ({
  contactList,
  activeRow,
  onCheck,
  onSelect,
  onExport,
  onForward,
  onBlock,
  onUnblock,
  onDelete,
  newContact,
  loadingList,
  searching,
  editedContact,
}) => {
  const { enableScroll, disableScroll, scrollable } = useTableScrolling()
  const tableRef = createRef<HTMLDivElement>()

  const {
    toggleRow,
    getRowStatus,
    noneRowsSelected,
    selectedRows,
  } = useTableSelect(contactList)

  useEffect(() => {
    onCheck(selectedRows as Contact[])
  }, [selectedRows])

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
      {contactList.map(({ category, contacts }) => (
        <Group key={category}>
          <Labels>
            <Col />
            <Col>{category}</Col>
          </Labels>
          {contacts.map(contact => {
            const { selected } = getRowStatus(contact)
            const onChange = () => toggleRow(contact)
            const handleExport = () => onExport(contact)
            const handleForward = () => onForward(contact)
            const handleBlock = () => onBlock(contact)
            const handleUnblock = () => onUnblock(contact)
            const handleDelete = () => onDelete(contact)
            const handleSelect = () => onSelect(contact)

            const fullName = createFullName(contact)
            const phoneNumber =
              contact.primaryPhoneNumber || contact.secondaryPhoneNumber

            const interactiveRow = (ref: Ref<HTMLDivElement>) => (
              <Row
                selected={selected}
                active={(activeRow || editedContact)?.id === contact.id}
                ref={ref}
              >
                <Col>
                  <Checkbox
                    checked={selected}
                    onChange={onChange}
                    size={Size.Small}
                    visible={!noneRowsSelected}
                  />
                </Col>
                <ClickableCol onClick={handleSelect}>
                  <InitialsAvatar
                    user={contact}
                    light={selected || activeRow === contact}
                    size={AvatarSize.Small}
                  />
                  {fullName ||
                    intl.formatMessage({
                      id: "view.name.phone.contacts.list.unnamedContact",
                    })}
                  {contact.blocked && <BlockedIcon width={1.4} height={1.4} />}
                </ClickableCol>
                <Col>{phoneNumber}</Col>
                <Col>
                  {contact.primaryPhoneNumber &&
                    contact.secondaryPhoneNumber && (
                      <MoreNumbers>+1</MoreNumbers>
                    )}
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
                          id: "view.name.phone.contacts.action.exportAsVcard",
                        }}
                        Icon={Type.Upload}
                        onClick={handleExport}
                        displayStyle={DisplayStyle.Dropdown}
                      />
                      <ButtonComponent
                        labelMessage={{
                          id: "view.name.phone.contacts.action.forwardNamecard",
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
                </Row>
              )
            }

            return (
              <InView key={contact.id + category}>
                {({ inView, ref }) =>
                  inView ? interactiveRow(ref) : placeholderRow(ref)
                }
              </InView>
            )
          })}
        </Group>
      ))}
      {contactList.length === 0 &&
        (loadingList ? (
          <EmptyState loading />
        ) : searching ? (
          <EmptyState
            title={{ id: "view.name.phone.contacts.emptyList.title" }}
            description={{
              id: "view.name.phone.contacts.emptyList.emptySearch.description",
            }}
          />
        ) : (
          <EmptyState
            title={{ id: "view.name.phone.contacts.emptyList.title" }}
            description={{
              id:
                "view.name.phone.contacts.emptyList.emptyPhonebook.description",
            }}
          />
        ))}
    </SelectableContacts>
  )
}

export default ContactList
