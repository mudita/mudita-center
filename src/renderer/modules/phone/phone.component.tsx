import React, { useEffect, useState } from "react"
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
import {
  Contact,
  NewContact,
  Store,
} from "Renderer/models/phone/phone.interface"
import ContactEdit, {
  defaultContact,
} from "Renderer/components/rest/phone/contact-edit.component"
import { noop } from "Renderer/utils/noop"
import modalService from "Renderer/components/core/modal/modal.service"
import DeleteContactModal from "Renderer/components/rest/phone/delete-contact-modal.component"
import SpeedDialModal from "Renderer/components/rest/phone/speed-dial-modal.component"
import BlockContactModal from "Renderer/components/rest/phone/block-contact-modal.component"
import { speedDialNumbers } from "Renderer/models/phone/phone.utils"

const ContactSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundColor("primaryDark")};
`

type PhoneProps = ContactActions &
  ContactPanelProps &
  ContactDetailsActions & {
    onSpeedDialSettingsSave: (contacts?: Contact[]) => void
  } & Partial<Store>

const Phone: FunctionComponent<PhoneProps> = ({
  loadData = noop,
  addContact = noop,
  editContact = noop,
  deleteContacts = noop,
  speedDialContacts = [],
  contactList = [],
  onSearchTermChange,
  onManageButtonClick,
  onCall,
  onMessage,
  onSpeedDialSettingsSave,
}) => {
  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<Contact>()
  const [newContact, setNewContact] = useState<NewContact>()
  const [editedContact, setEditedContact] = useState<Contact>()
  const [operationInProgress, setOperationStatus] = useState(false)

  useEffect(() => {
    if (!contactList.length) {
      loadData()
    }
  }, [])

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

  const handleAddingContact = () => {
    closeSidebar()
    setNewContact(defaultContact)
  }

  const cancelAddingContact = () => {
    closeSidebar()
    setNewContact(undefined)
  }

  const saveNewContact = async (contact: Contact) => {
    setOperationStatus(true)
    await addContact(contact)
    cancelAddingContact()
    setOperationStatus(false)
  }

  const handleEditingContact = (contact: Contact) => {
    closeSidebar()
    setEditedContact(contact)
  }

  const cancelEditingContact = () => {
    closeSidebar()
    setEditedContact(undefined)
  }

  const saveEditedContact = async (contact: Contact) => {
    setOperationStatus(true)
    await editContact(contact)
    cancelEditingContact()
    setOperationStatus(false)
  }

  const openDeleteModal = (contact: Contact) => {
    const handleDelete = async () => {
      modalService.rerenderModal(
        <DeleteContactModal contact={contact} deleting />
      )
      await deleteContacts([contact])
      modalService.closeModal()
      closeSidebar()
    }

    modalService.openModal(
      <DeleteContactModal contact={contact} onDelete={handleDelete} />
    )
  }

  const openBlockModal = (contact: Contact) => {
    const handleBlock = async () => {
      modalService.rerenderModal(
        <BlockContactModal contact={contact} blocking />
      )
      const blockedContact: Contact = {
        ...contact,
        blocked: true,
        favourite: false,
      }
      await editContact(blockedContact)
      modalService.closeModal()
      closeSidebar()
    }

    modalService.openModal(
      <BlockContactModal contact={contact} onBlock={handleBlock} />
    )
  }

  const openSpeedDialModal = () => {
    modalService.openModal(
      <SpeedDialModal onSave={onSpeedDialSettingsSave} contacts={contactList} />
    )
  }

  const availableSpeedDials = speedDialNumbers.filter(
    dialNumber =>
      !speedDialContacts.find(({ speedDial }) => speedDial === dialNumber)
  )

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
          onExport={noop}
          onForward={noop}
          onBlock={openBlockModal}
          onDelete={openDeleteModal}
          onCheck={noop}
          newContact={newContact}
          editedContact={editedContact}
        />
        {newContact && (
          <ContactEdit
            onCancel={cancelAddingContact}
            onSpeedDialSettingsOpen={openSpeedDialModal}
            onSave={saveNewContact}
            onNameUpdate={handleNameUpdate}
            saving={operationInProgress}
            availableSpeedDials={availableSpeedDials}
          />
        )}
        {editedContact && (
          <ContactEdit
            contact={editedContact}
            onCancel={cancelEditingContact}
            onSpeedDialSettingsOpen={openSpeedDialModal}
            onSave={saveEditedContact}
            saving={operationInProgress}
            availableSpeedDials={availableSpeedDials}
          />
        )}
        {activeRow && !newContact && !editedContact && (
          <ContactDetails
            contact={activeRow}
            onClose={closeSidebar}
            onExport={noop}
            onForward={noop}
            onBlock={openBlockModal}
            onDelete={openDeleteModal}
            onEdit={handleEditingContact}
            onCall={onCall}
            onMessage={onMessage}
          />
        )}
      </TableWithSidebarWrapper>
    </ContactSection>
  )
}

export default Phone
