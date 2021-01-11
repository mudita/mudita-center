import React, { useEffect, useState } from "react"
import ContactList from "Renderer/components/rest/phone/contact-list.component"
import ContactPanel, {
  ContactPanelProps,
} from "Renderer/components/rest/phone/contact-panel.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"
import ContactDetails, {
  ContactActions,
  ContactDetailsActions,
} from "Renderer/components/rest/phone/contact-details.component"
import useTableSidebar from "Renderer/utils/hooks/use-table-sidebar"
import {
  Contact,
  ContactCategory,
  ContactID,
  NewContact,
  Store,
} from "Renderer/models/phone/phone.typings"
import ContactEdit, {
  defaultContact,
} from "Renderer/components/rest/phone/contact-edit.component"
import { noop } from "Renderer/utils/noop"
import modalService from "Renderer/components/core/modal/modal.service"
import SpeedDialModal from "Renderer/components/rest/phone/speed-dial-modal.container"
import BlockContactModal from "Renderer/components/rest/phone/block-contact-modal.component"
import { createFullName } from "Renderer/models/phone/phone.helpers"
import { intl, textFormatters } from "Renderer/utils/intl"
import DeleteModal from "App/renderer/components/core/modal/delete-modal.component"
import { ContactSection } from "Renderer/modules/phone/phone.styled"
import { AuthProviders } from "Renderer/models/auth/auth.typings"
import SyncContactsModal from "Renderer/components/rest/sync-modals/sync-contacts-modal.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { SynchronizingContactsModal } from "Renderer/components/rest/sync-modals/synchronizing-contacts-modal.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import { defineMessages } from "react-intl"
import { History, LocationState } from "history"
import { useHistory } from "react-router-dom"
import useURLSearchParams from "Renderer/utils/hooks/use-url-search-params"
import findContactByPhoneNumber from "Renderer/modules/phone/find-contact-by-phone-number"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import delayResponse from "@appnroll/delay-response"
import {
  ErrorDataModal,
  ErrorWithRetryDataModal,
  LoadingStateDataModal,
} from "Renderer/components/rest/data-modal/data.modals"
import parseVcf from "Renderer/modules/phone/helpers/parseVcf/parse-vcf"
import ImportContactsModal from "Renderer/components/rest/sync-modals/import-contacts-modal.component"
import ImportingContactsModal from "Renderer/components/rest/sync-modals/importing-contacts-modal.component"
import logger from "App/main/utils/logger"
import ContactImportModal from "App/renderer/components/rest/phone/contact-import-modal.component"
import AuthorizationFailedModal from "Renderer/components/rest/calendar/authorization-failed.component"

export const messages = defineMessages({
  deleteTitle: { id: "view.name.phone.contacts.modal.delete.title" },
  deleteText: { id: "view.name.phone.contacts.modal.delete.text" },
  addingText: { id: "view.name.phone.contacts.modal.adding.text" },
  deletingText: { id: "view.name.phone.contacts.modal.deleting.text" },
  editingText: { id: "view.name.phone.contacts.modal.editing.text" },
  importingFailed: {
    id: "view.name.phone.contacts.modal.importingFailed.message",
  },
})

export type PhoneProps = ContactActions &
  Omit<ContactPanelProps, "onContactSelect"> &
  ContactDetailsActions & {
    onSpeedDialSettingsSave: (contacts?: Contact[]) => void
    getContact: (id: ContactID) => Contact
    flatList: Contact[]
    speedDialChosenList: number[]
    setProviderData: (provider: AuthProviders, data: any) => void
    onManageButtonClick: (cb?: any) => Promise<void>
    isTopicThreadOpened: (phoneNumber: string) => boolean
    onMessage: (history: History<LocationState>, phoneNumber: string) => void
    authorize: (provider: Provider) => Promise<string | undefined>
    addNewContact: (contact: NewContact) => Promise<string | void>
    editContact: (contact: Contact) => Promise<string | void>
    deleteContacts: (ids: ContactID[]) => Promise<string | void>
    loadContacts: (provider: Provider) => Promise<Contact[]>
  } & Store

const Phone: FunctionComponent<PhoneProps> = (props) => {
  const {
    addNewContact,
    editContact,
    getContact,
    deleteContacts,
    loadContacts,
    contactList = [],
    flatList,
    speedDialChosenList,
    onCall,
    onMessage,
    savingContact,
    isTopicThreadOpened,
    resultsState,
    authorize,
  } = props
  const history = useHistory()
  const searchParams = useURLSearchParams()
  const phoneNumber = searchParams.get("phoneNumber") || ""
  const activeContact = findContactByPhoneNumber(flatList, phoneNumber)
  const initNewContact =
    phoneNumber !== "" && activeContact === undefined
      ? { ...defaultContact, primaryPhoneNumber: phoneNumber }
      : undefined

  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<Contact>(
    activeContact
  )
  const [newContact, setNewContact] = useState<NewContact | undefined>(
    initNewContact
  )
  const [editedContact, setEditedContact] = useState<Contact>()

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const authorizeAndLoadContacts = async (provider: Provider) => {
    try {
      if (provider) {
        await authorize(provider)
        await delayResponse(openProgressSyncModal(), 1000)
        const contactsToImport = await loadContacts(provider)
        await openSuccessSyncModal(contactsToImport)
      }
    } catch {
      await openAuthorizationFailedModal(provider)
    }
  }

  const loadGoogleContacts = () => authorizeAndLoadContacts(Provider.Google)

  const {
    selectedRows,
    allRowsSelected,
    toggleAll,
    resetRows,
    ...rest
  } = useTableSelect<Contact, ContactCategory>(contactList, "contacts")
  const detailsEnabled = activeRow && !newContact && !editedContact

  useEffect(() => {
    if (editedContact) {
      const newData = flatList.find(
        (contact) => contact.id === editedContact.id
      )

      if (newData) {
        setEditedContact((curr: any) => {
          if ("speedDial" in newData) {
            return {
              ...curr,
              speedDial: newData.speedDial,
            }
          }

          if (curr && "speedDial" in curr) {
            delete curr.speedDial
          }

          return curr
        })
      }
    }
  }, [flatList])

  const closeModal = () => modalService.closeModal()

  const contactFreshData = ({ id }: Contact) => {
    return getContact(id)
  }

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

  const cancelOrCloseContactHandler = () => {
    closeSidebar()
    setNewContact(undefined)
  }

  const saveNewContact = async (contact: NewContact) => {
    const add = async (retried?: boolean) => {
      modalService.openModal(
        <LoadingStateDataModal textMessage={messages.addingText} />,
        true
      )

      const error = await delayResponse(addNewContact(contact))

      if (error && !retried) {
        modalService.openModal(
          <ErrorWithRetryDataModal onRetry={() => add(true)} />,
          true
        )
      } else if (error) {
        modalService.openModal(<ErrorDataModal />, true)
      } else {
        cancelOrCloseContactHandler()
        await closeModal()
      }
    }

    await add()
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

  const editContactWithRetry = async (contact: Contact) => {
    return new Promise<void>((resolve, reject) => {
      const edit = async (retried?: boolean) => {
        modalService.openModal(
          <LoadingStateDataModal textMessage={messages.editingText} />,
          true
        )

        const error = await delayResponse(editContact(contact))

        if (error && !retried) {
          modalService.openModal(
            <ErrorWithRetryDataModal onRetry={() => edit(true)} />,
            true
          )
        } else if (error) {
          modalService.openModal(<ErrorDataModal />, true)
          reject()
        } else {
          await modalService.closeModal()
          resolve()
        }
      }

      edit()
    })
  }

  const saveEditedContact = async (contact: Contact) => {
    try {
      await editContactWithRetry(contact)
      setEditedContact(contact)
      cancelEditingContact(contact)
      openSidebar(contact)
    } catch (error) {
      logger.error(error)
    }
  }

  const handleMessage = (phoneNumber: string) => onMessage(history, phoneNumber)

  const openDeleteModal = (contact: Contact) => {
    const handleDelete = async () => {
      modalService.openModal(
        <LoadingStateDataModal textMessage={messages.deletingText} />,
        true
      )

      // await can be restored if we will process the result directly in here, not globally
      const error = await delayResponse(deleteContacts([contact.id]))
      if (error) {
        modalService.openModal(<ErrorDataModal />, true)
      } else {
        cancelOrCloseContactHandler()
        await modalService.closeModal()
      }
    }

    modalService.openModal(
      <DeleteModal
        onDelete={handleDelete}
        title={intl.formatMessage({
          ...messages.deleteTitle,
        })}
        message={{
          ...messages.deleteText,
          values: { name: createFullName(contact), ...textFormatters },
        }}
      />
    )
  }

  const handleUnblock = async (contact: Contact) => {
    const unblockedContact: Contact = {
      ...contact,
      blocked: false,
    }
    try {
      await editContactWithRetry(unblockedContact)
    } catch (error) {
      logger.error(error)
    }

    if (detailsEnabled) {
      openSidebar(unblockedContact)
    }
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

      try {
        await editContactWithRetry(blockedContact)
      } catch (error) {
        logger.error(error)
      }

      if (detailsEnabled) {
        openSidebar(blockedContact)
      }
    }

    modalService.openModal(
      <BlockContactModal contact={contact} onBlock={handleBlock} />
    )
  }

  const openSpeedDialModal = () => {
    modalService.openModal(<SpeedDialModal onSave={closeModal} />)
  }

  const openSuccessSyncModal = async (contacts: Contact[]) => {
    const onActionButtonClick = async (chosenContacts: NewContact[]) => {
      await modalService.openModal(
        <LoadingStateDataModal textMessage={messages.addingText} />,
        true
      )
      for (const chosenContact of chosenContacts) {
        const error = await addNewContact(chosenContact)
        if (error) {
          await modalService.openModal(<ErrorDataModal />, true)
          break
        }
      }
      await modalService.closeModal()
    }
    await modalService.closeModal()
    await modalService.openModal(
      <ContactImportModal
        contacts={contacts}
        onActionButtonClick={onActionButtonClick}
      />
    )
  }

  const openAuthorizationFailedModal = async (provider: Provider) => {
    await modalService.closeModal()
    modalService.openModal(
      <AuthorizationFailedModal
        provider={provider}
        onActionButtonClick={loadGoogleContacts}
      />
    )
  }

  const openProgressSyncModal = async () => {
    await closeModal()
    await modalService.openModal(
      <SynchronizingContactsModal
        body={{
          id: "view.name.phone.contacts.synchronizingModalBody",
        }}
        subtitle={{
          id: "view.name.phone.contacts.synchronizingModalTitle",
        }}
        closeButtonLabel={intl.formatMessage({
          id: "view.generic.button.cancel",
        })}
        icon={Type.SynchronizeContacts}
      />
    )
  }

  const importContactsFromFile = async (files: File[]) => {
    const parsedContacts = await parseVcf(files)
    let failed = false

    const addImportedContacts = async () => {
      await closeModal()
      modalService.openModal(
        <ImportingContactsModal count={0} total={parsedContacts.length} />
      )

      for (const contact of parsedContacts) {
        if (failed) {
          await closeModal()
          modalService.openModal(
            <ErrorDataModal textMessage={messages.importingFailed} />
          )
          return
        }
        const error = await addNewContact(contact)
        if (error) {
          failed = true
        }

        const currentContact = parsedContacts.indexOf(contact) + 1
        modalService.rerenderModal(
          <ImportingContactsModal
            count={currentContact}
            total={parsedContacts.length}
            onClose={closeModal}
          />
        )
      }
    }

    await closeModal()
    modalService.openModal(
      <ImportContactsModal
        contacts={parsedContacts}
        onActionButtonClick={addImportedContacts}
      />
    )
  }

  const manualImport = async (inputElement: HTMLInputElement) => {
    const onFileSelect = () => {
      if (inputElement.files) {
        importContactsFromFile(Array.from(inputElement.files))
        inputElement.removeEventListener("change", onFileSelect)
      }
    }

    inputElement.click()
    inputElement.addEventListener("change", onFileSelect)
  }

  const openSyncModal = async () => {
    modalService.openModal(
      <SyncContactsModal
        onGoogleButtonClick={loadGoogleContacts}
        onManualImportClick={manualImport}
      />
    )
  }

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    openSidebar(contact)
  }

  return (
    <>
      <ContactSection>
        <ContactPanel
          onContactSelect={handleContactSelect}
          onManageButtonClick={openSyncModal}
          onNewButtonClick={handleAddingContact}
          selectedContacts={selectedRows}
          allItemsSelected={allRowsSelected}
          toggleAll={toggleAll}
          deleteContacts={deleteContacts}
          resetRows={resetRows}
          contacts={flatList}
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
            newContact={newContact}
            editedContact={editedContact}
            resultsState={resultsState}
            selectedContact={selectedContact}
            {...rest}
          />
          {newContact && (
            <ContactEdit
              contact={newContact as Contact}
              speedDialChosenList={speedDialChosenList}
              onCancel={cancelOrCloseContactHandler}
              onSpeedDialSettingsOpen={openSpeedDialModal}
              onSave={saveNewContact}
              onNameUpdate={handleNameUpdate}
              saving={savingContact}
            />
          )}
          {editedContact && (
            <ContactEdit
              contact={editedContact}
              speedDialChosenList={speedDialChosenList}
              onCancel={cancelEditingContact}
              onSpeedDialSettingsOpen={openSpeedDialModal}
              onSave={saveEditedContact}
              saving={savingContact}
            />
          )}
          {detailsEnabled && (
            <ContactDetails
              contact={contactFreshData(activeRow as Contact)}
              onClose={closeSidebar}
              onExport={noop}
              onForward={noop}
              onUnblock={handleUnblock}
              onBlock={openBlockModal}
              onDelete={openDeleteModal}
              onEdit={handleEditingContact}
              onCall={onCall}
              onMessage={handleMessage}
              isTopicThreadOpened={isTopicThreadOpened}
            />
          )}
        </TableWithSidebarWrapper>
      </ContactSection>
    </>
  )
}

export default Phone
