import React, { useEffect } from "react"
import { Contact, Contacts } from "Renderer/models/phone/phone.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, {
  Col,
  Group,
  Labels,
  Row,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Avatar, {
  AvatarSize,
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
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import ContactDetails, {
  ContactActions,
  ContactDetailsActions,
} from "Renderer/modules/phone/components/contact-details.component"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import useTableScrolling from "Renderer/utils/hooks/use-table-scrolling"

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

const InitialsAvatar = styled(Avatar).attrs(() => ({
  size: AvatarSize.Small,
}))<{ light?: boolean }>`
  margin-right: 1.2rem;
  transition: background-color ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};
  ${({ light }) => light && lightAvatarStyles}
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

const SelectableContacts = styled(Table)`
  flex: 1;
  overflow: auto;
  --columnsTemplate: 4rem 1fr auto 4.8rem 13.5rem;
  --columnsTemplateWithOpenedSidebar: 4rem 1fr;
  --columnsGap: 0;

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

export interface ContactListProps
  extends Contacts,
    ContactActions,
    ContactDetailsActions {
  onSelect: (contacts: Contact[]) => void
}

const ContactList: FunctionComponent<ContactListProps> = ({
  contactList,
  onSelect,
  onEdit,
  onExport,
  onForward,
  onBlock,
  onDelete,
  onCall,
  onMessage,
}) => {
  const { enableScroll, disableScroll, scrollable } = useTableScrolling()

  const {
    toggleRow,
    getRowStatus,
    noneRowsSelected,
    selectedRows,
  } = useTableSelect(contactList)

  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<Contact>()

  useEffect(() => {
    if (selectedRows.length) {
      onSelect(selectedRows as Contact[])
    }
  }, [selectedRows])

  return (
    <TableWithSidebarWrapper>
      <SelectableContacts
        hideableColumnsIndexes={[2, 3, 4]}
        hideColumns={Boolean(activeRow)}
        scrollable={scrollable}
      >
        {contactList.map(({ category, contacts }) => (
          <Group key={category}>
            <Labels>
              <Col />
              <Col>{category}</Col>
            </Labels>
            {contacts.map((contact, index) => {
              const { selected } = getRowStatus(contact)
              const onChange = () => toggleRow(contact)
              const [firstNumber, ...{ length: restNumbersCount }] = [
                ...contact.phoneNumbers,
              ]

              const handleExport = () => onExport(contact)
              const handleForward = () => onForward(contact)
              const handleBlock = () => onBlock(contact)
              const handleDelete = () => onDelete(contact)

              const onClick = () => {
                openSidebar(contact)
              }

              return (
                <Row
                  key={index}
                  selected={selected}
                  active={activeRow === contact}
                >
                  <Col>
                    <Checkbox
                      checked={selected}
                      onChange={onChange}
                      size={Size.Small}
                      visible={!noneRowsSelected}
                    />
                  </Col>
                  <Col onClick={onClick}>
                    <InitialsAvatar
                      text={contact.firstName[0] + contact.lastName[0]}
                      light={selected}
                    />
                    {contact.firstName} {contact.lastName}
                    {contact.blocked && (
                      <BlockedIcon width={1.4} height={1.4} />
                    )}
                  </Col>
                  <Col>{firstNumber}</Col>
                  <Col>
                    {restNumbersCount > 0 && (
                      <MoreNumbers>+{restNumbersCount}</MoreNumbers>
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
                            id:
                              "view.name.phone.contacts.action.forwardNamecard",
                          }}
                          Icon={Type.Forward}
                          onClick={handleForward}
                          displayStyle={DisplayStyle.Dropdown}
                        />
                        <ButtonComponent
                          labelMessage={{
                            id: "view.name.phone.contacts.action.block",
                          }}
                          Icon={Type.Blocked}
                          onClick={handleBlock}
                          displayStyle={DisplayStyle.Dropdown}
                        />
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
            })}
          </Group>
        ))}
      </SelectableContacts>
      {activeRow && (
        <ContactDetails
          contact={activeRow}
          onClose={closeSidebar}
          onExport={onExport}
          onForward={onForward}
          onBlock={onBlock}
          onDelete={onDelete}
          onEdit={onEdit}
          onCall={onCall}
          onMessage={onMessage}
        />
      )}
    </TableWithSidebarWrapper>
  )
}

export default ContactList
