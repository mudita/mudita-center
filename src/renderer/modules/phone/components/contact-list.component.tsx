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
import ContactDetails from "Renderer/modules/phone/components/contact-details.component"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"

const visibleCheckboxStyles = css`
  opacity: 1;
  visibility: visible;
`
const Checkbox = styled(InputCheckbox)<{ visible?: boolean }>`
  opacity: 0;
  visibility: hidden;
  transition: all ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};
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

export interface ContactListProps extends Contacts {
  onContactEdit: (contact: Contact) => void
  onContactExport: (contact: Contact) => void
  onContactForward: (contact: Contact) => void
  onContactBlock: (contact: Contact) => void
  onContactDelete: (contact: Contact) => void
  onContactSelect: (contacts: Contact[]) => void
}

const ContactList: FunctionComponent<ContactListProps> = ({
  contactList,
  onContactEdit,
  onContactExport,
  onContactForward,
  onContactBlock,
  onContactDelete,
  onContactSelect,
}) => {
  const {
    toggleRow,
    getRowStatus,
    noneRowsSelected,
    selectedRows,
  } = useTableSelect(contactList)

  const {
    openSidebar,
    closeSidebar,
    sidebarOpened,
    activeRow,
  } = useTableSidebar<Contact>()

  useEffect(() => {
    if (selectedRows.length) {
      onContactSelect(selectedRows as Contact[])
    }
  }, [selectedRows])

  const contactEditHandler = (contact = activeRow) => {
    if (contact) {
      onContactEdit(contact)
    }
  }
  const contactExportHandler = (contact = activeRow) => {
    if (contact) {
      onContactExport(contact)
    }
  }

  const contactForwardHandler = (contact = activeRow) => {
    if (contact) {
      onContactForward(contact)
    }
  }

  const contactBlockHandler = (contact = activeRow) => {
    if (contact) {
      onContactBlock(contact)
    }
  }

  const contactDeleteHandler = (contact = activeRow) => {
    if (contact) {
      onContactDelete(contact)
    }
  }

  return (
    <TableWithSidebarWrapper>
      <SelectableContacts
        hideableColumnsIndexes={[2, 3, 4]}
        hideColumns={sidebarOpened}
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
              const initials =
                contact.firstName.charAt(0) + contact.lastName.charAt(0)
              const phoneNumbers = [...contact.phoneNumbers]
              const firstNumber = phoneNumbers.shift()
              const restNumbers = phoneNumbers.length

              const exportAction = () => {
                contactExportHandler(contact)
              }
              const forwardAction = () => {
                contactForwardHandler(contact)
              }
              const blockAction = () => {
                contactBlockHandler(contact)
              }
              const deleteAction = () => {
                contactDeleteHandler(contact)
              }

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
                    <InitialsAvatar text={initials} light={selected} />
                    {contact.firstName} {contact.lastName}
                    {contact.blocked && (
                      <BlockedIcon width={1.4} height={1.4} />
                    )}
                  </Col>
                  <Col>{firstNumber}</Col>
                  <Col>
                    {restNumbers > 0 && (
                      <MoreNumbers>+{restNumbers}</MoreNumbers>
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
                      >
                        <ButtonComponent
                          label="Export as vcard"
                          Icon={Type.Upload}
                          onClick={exportAction}
                          displayStyle={DisplayStyle.Dropdown}
                        />
                        <ButtonComponent
                          label="Forward namecard"
                          Icon={Type.Forward}
                          onClick={forwardAction}
                          displayStyle={DisplayStyle.Dropdown}
                        />
                        <ButtonComponent
                          label="block"
                          Icon={Type.Blocked}
                          onClick={blockAction}
                          displayStyle={DisplayStyle.Dropdown}
                        />
                        <ButtonComponent
                          label="delete"
                          Icon={Type.Delete}
                          onClick={deleteAction}
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
      <ContactDetails
        show={sidebarOpened}
        data={activeRow}
        onEdit={contactEditHandler}
        onExport={contactExportHandler}
        onForward={contactForwardHandler}
        onBlock={contactBlockHandler}
        onDelete={contactDeleteHandler}
        onClose={closeSidebar}
      />
    </TableWithSidebarWrapper>
  )
}

export default ContactList
