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
  savingContact,
}) => {
  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<Contact>()
  const [loading, setLoadingState] = useState(true)
  const [searching, setSearchingState] = useState(false)
  const [newContact, setNewContact] = useState<NewContact>()
  const [editedContact, setEditedContact] = useState<Contact>()
  const detailsEnabled = activeRow && !newContact && !editedContact

  useEffect(() => {
    ;(async () => {
      await loadData()
      setLoadingState(false)
    })()
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
    await addContact(contact)
    cancelAddingContact()
  }

  const handleEditingContact = (contact: Contact) => {
    closeSidebar()
    setEditedContact(contact)
  }

  const cancelEditingContact = (contact?: Contact) => {
    closeSidebar()
    setEditedContact(undefined)
    openSidebar(contact as Contact)
  }

  const saveEditedContact = async (contact: Contact) => {
    await editContact(contact)
    cancelEditingContact(contact)
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

  const handleUnblock = async (contact: Contact) => {
    const unblockedContact: Contact = {
      ...contact,
      blocked: false,
    }
    await editContact(unblockedContact)
    if (detailsEnabled) {
      openSidebar(unblockedContact)
    }
  }

  const handleSearching = (value: string) => {
    onSearchTermChange(value)
    setSearchingState(Boolean(value))
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
      if (detailsEnabled) {
        openSidebar(blockedContact)
      }
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
        onSearchTermChange={handleSearching}
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
          onUnblock={handleUnblock}
          onBlock={openBlockModal}
          onDelete={openDeleteModal}
          onCheck={noop}
          newContact={newContact}
          editedContact={editedContact}
          loadingList={loading}
          searching={searching}
        />
        {newContact && (
          <ContactEdit
            onCancel={cancelAddingContact}
            onSpeedDialSettingsOpen={openSpeedDialModal}
            onSave={saveNewContact}
            onNameUpdate={handleNameUpdate}
            saving={savingContact}
            availableSpeedDials={availableSpeedDials}
          />
        )}
        {editedContact && (
          <ContactEdit
            contact={editedContact}
            onCancel={cancelEditingContact}
            onSpeedDialSettingsOpen={openSpeedDialModal}
            onSave={saveEditedContact}
            saving={savingContact}
            availableSpeedDials={availableSpeedDials}
          />
        )}
        {detailsEnabled && (
          <ContactDetails
            contact={activeRow as Contact}
            onClose={closeSidebar}
            onExport={noop}
            onForward={noop}
            onUnblock={handleUnblock}
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
