import React, { useState } from "react"
import ContactList from "Renderer/components/rest/phone/contact-list.component"
import ContactPanel, {
  ContactPanelProps,
} from "Renderer/components/rest/phone/contact-panel.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"
import ContactDetails, {
  ContactActions,
  ContactDetailsActions,
} from "Renderer/components/rest/phone/contact-details.component"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import { Contact, Contacts } from "Renderer/models/phone/phone.interface"
import ContactEdit, {
  defaultContact,
} from "Renderer/components/rest/phone/contact-edit.component"
import { noop } from "Renderer/utils/noop"
import modalService from "Renderer/components/core/modal/modal.service"
import SpeedDialModal from "Renderer/components/rest/phone/speed-dial-modal.component"

const ContactSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundColor("primaryDark")};
`

type PhoneProps = Contacts &
  ContactActions &
  ContactPanelProps &
  ContactDetailsActions & {
    onSpeedDialSettingsSave: (contacts?: Contact[]) => void
  }

const Phone: FunctionComponent<PhoneProps> = ({
  onSearchTermChange,
  onManageButtonClick,
  contactList,
  onExport,
  onForward,
  onBlock,
  onDelete,
  onCall,
  onMessage,
  onSpeedDialSettingsSave,
}) => {
  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<Contact>()
  const [newContact, setNewContact] = useState<Contact>()
  const [editedContact, setEditedContact] = useState<Contact>()

  const handleAddingCancel = () => {
    closeSidebar()
    setNewContact(undefined)
  }

  const handleAddingContact = () => setNewContact(defaultContact)

  const handleNameUpdate = ({
    firstName,
    lastName,
  }: Pick<Contact, "firstName" | "lastName">) => {
    if (!editedContact) {
      setNewContact({
        ...(newContact as Contact),
        firstName,
        lastName,
      })
    }
  }

  const handleEditCancel = () => {
    closeSidebar()
    setEditedContact(undefined)
  }

  const handleSpeedDialEdit = () => {
    modalService.openModal(
      <SpeedDialModal onSave={onSpeedDialSettingsSave} contacts={contactList} />
    )
  }

  return (
    <ContactSection>
      <ContactPanel
        onSearchTermChange={onSearchTermChange}
        onManageButtonClick={onManageButtonClick}
        onNewButtonClick={handleAddingContact}
      />
      <TableWithSidebarWrapper>
        <ContactList
          activeRow={activeRow}
          contactList={contactList}
          onSelect={openSidebar}
          onExport={onExport}
          onForward={onForward}
          onBlock={onBlock}
          onDelete={onDelete}
          onCheck={noop}
          newContact={newContact}
          editedContact={editedContact}
        />
        {newContact && (
          <ContactEdit
            onCancel={handleAddingCancel}
            onSpeedDialSettingsOpen={handleSpeedDialEdit}
            onSave={noop}
            onNameUpdate={handleNameUpdate}
          />
        )}
        {editedContact && (
          <ContactEdit
            contact={editedContact}
            onCancel={handleEditCancel}
            onSpeedDialSettingsOpen={handleSpeedDialEdit}
            onSave={noop}
          />
        )}
        {activeRow && !newContact && !editedContact && (
          <ContactDetails
            contact={activeRow}
            onClose={closeSidebar}
            onExport={onExport}
            onForward={onForward}
            onBlock={onBlock}
            onDelete={onDelete}
            onEdit={setEditedContact}
            onCall={onCall}
            onMessage={onMessage}
          />
        )}
      </TableWithSidebarWrapper>
    </ContactSection>
  )
}

export default Phone
