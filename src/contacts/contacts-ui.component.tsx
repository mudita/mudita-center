import React, { useEffect, useState } from "react"
import ContactList from "App/contacts/components/contact-list/contact-list.component"
import ContactPanel from "App/contacts/components/contact-panel/contact-panel.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"
import ContactDetails from "App/contacts/components/contact-details/contact-details.component"
import useTableSidebar from "Renderer/utils/hooks/use-table-sidebar"
import { Contact, NewContact } from "App/contacts/store/contacts.type"
import { ContactCategory } from "App/contacts/store/contacts.interface"
import ContactEdit, {
  defaultContact,
} from "App/contacts/components/contact-edit/contact-edit.component"
import { noop } from "Renderer/utils/noop"
import modalService from "Renderer/components/core/modal/modal.service"
import SpeedDialModal from "App/contacts/components/speed-dial-modal/speed-dial-modal.container"
import BlockContactModal from "App/contacts/components/block-contact-modal/block-contact-modal.component"
import { createFullName } from "App/contacts/store/contacts.helpers"
import { intl, textFormatters } from "Renderer/utils/intl"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { ContactSection } from "App/contacts/contacts.styled"
import SyncContactsModal from "App/contacts/components/sync-contacts-modal/sync-contacts-modal.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import { defineMessages } from "react-intl"
import { useHistory } from "react-router-dom"
import useURLSearchParams from "Renderer/utils/hooks/use-url-search-params"
import findContactByPhoneNumber from "App/contacts/helpers/find-contact-by-phone-number/find-contact-by-phone-number"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import delayResponse from "@appnroll/delay-response"
import {
  ErrorDataModal,
  ErrorWithRetryDataModal,
  LoadingStateDataModal,
} from "Renderer/components/rest/data-modal/data.modals"
import parseVcf from "App/contacts/helpers/parse-vcf/parse-vcf"
import logger from "App/main/utils/logger"
import ContactImportModal, {
  ModalType,
} from "App/contacts/components/contact-import/contact-import-modal.component"
import { ExternalService, FileService } from "App/contacts/contacts.interface"
import { PhoneProps } from "App/contacts/contacts.type"
import ImportingContactsModal from "App/contacts/components/importing-contacts-modal/importing-contacts-modal.component"
import appContextMenu from "Renderer/wrappers/app-context-menu"
import ErrorModal from "App/contacts/components/error-modal/error-modal.component"

export const messages = defineMessages({
  deleteTitle: { id: "view.name.phone.contacts.modal.delete.title" },
  deleteText: { id: "view.name.phone.contacts.modal.delete.text" },
  addingText: { id: "view.name.phone.contacts.modal.adding.text" },
  deletingText: { id: "view.name.phone.contacts.modal.deleting.text" },
  editingText: { id: "view.name.phone.contacts.modal.editing.text" },
  downloadingText: { id: "view.name.phone.contacts.modal.downloading.text" },
  downloadingErrorTitle: {
    id: "view.name.contacts.modal.downloadingError.title",
  },
  downloadingErrorBody: {
    id: "view.name.contacts.modal.downloadingError.body",
  },
  authorizationFailedTitle: {
    id: "view.name.contacts.modal.authorizationFailed.title",
  },
  authorizationFailedBody: {
    id: "view.name.calendar.modal.authorizationFailed.body",
  },
  authorizationFailedButton: {
    id: "view.name.contacts.modal.authorizationFailed.button",
  },
  parsingFileErrorTitle: {
    id: "view.name.contacts.modal.parsingFileError.title",
  },
  parsingFileErrorBody: {
    id: "view.name.contacts.modal.parsingFileError.body",
  },
})

const Contacts: FunctionComponent<PhoneProps> = (props) => {
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
    return new Promise((resolve, reject) => {
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
          resolve(undefined)
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

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    openSidebar(contact)
  }

  // Synchronization, dev mode: toggle contacts saving failure
  const [syncShouldFail, setSyncFailure] = useState(false)

  useEffect(() => {
    const unregisterItem = appContextMenu.registerItem("Contacts", {
      labelCreator: () =>
        `${syncShouldFail ? "Disable" : "Enable"} saving failure`,
      click: () => setSyncFailure((prevState) => !prevState),
    })
    return () => unregisterItem()
  }, [syncShouldFail])

  // Synchronization, dev mode: toggle contacts importing failure
  const [parseShouldFail, setParseFailure] = useState(false)

  useEffect(() => {
    const unregisterItem = appContextMenu.registerItem("Contacts", {
      labelCreator: () =>
        `${syncShouldFail ? "Disable" : "Enable"} parsing failure`,
      click: () => setParseFailure((prevState) => !prevState),
    })
    return () => unregisterItem()
  }, [parseShouldFail])

  // Synchronization, step 1: Show modal with action buttons
  const showSynchronizationSourceSelectModal = () => {
    modalService.openModal(
      <SyncContactsModal
        onGoogleButtonClick={authorizeAtGoogle}
        onManualImportClick={importFromFile}
      />
    )
  }

  // Synchronization, step 2a: file select
  const importFromFile = async (inputElement: HTMLInputElement) => {
    const onFileSelect = () => {
      if (inputElement.files) {
        getContacts({ type: "files", data: Array.from(inputElement.files) })
        inputElement.removeEventListener("change", onFileSelect)
      }
    }

    inputElement.click()
    inputElement.addEventListener("change", onFileSelect)
  }

  // Synchronization, step 2b: 3-rd party services
  const authorizeAtGoogle = () => authorizeAtProvider(Provider.Google)

  const authorizeAtProvider = async (provider: Provider) => {
    try {
      if (provider) {
        await authorize(provider)
        await getContacts({ type: Provider.Google })
      }
    } catch {
      await openAuthorizationFailedModal(provider)
    }
  }

  const openAuthorizationFailedModal = async (provider: Provider) => {
    const retry = async () => {
      await closeModal()
      showSynchronizationSourceSelectModal()
      authorizeAtProvider(provider)
    }
    await modalService.closeModal()
    modalService.openModal(
      <ErrorModal
        title={intl.formatMessage(messages.authorizationFailedTitle)}
        body={intl.formatMessage(messages.authorizationFailedBody)}
        onActionButtonClick={retry}
        actionButtonLabel={intl.formatMessage(
          messages.authorizationFailedButton
        )}
      />
    )
  }

  // Synchronization, step 3: data loading
  const showSynchronizationInfiniteLoader = () => {
    return delayResponse(
      modalService.openModal(
        <LoadingStateDataModal textMessage={messages.downloadingText} />,
        true
      )
    )
  }

  const getContacts = async (service: ExternalService | FileService) => {
    const handleError = () => {
      modalService.openModal(
        <ErrorModal
          title={intl.formatMessage(
            service.type === "files"
              ? messages.parsingFileErrorTitle
              : messages.downloadingErrorTitle
          )}
          body={intl.formatMessage(
            service.type === "files"
              ? messages.parsingFileErrorBody
              : messages.downloadingErrorBody
          )}
        />,
        true
      )
    }

    try {
      await showSynchronizationInfiniteLoader()

      if (parseShouldFail) {
        handleError()
        return
      }

      const contacts = await (service.type === "files"
        ? parseVcf(service.data)
        : loadContacts(service.type))

      showContactsSelectingModal(contacts)
    } catch (error) {
      handleError()
    }
  }

  // Synchronization, step 4: selecting contacts
  const showContactsSelectingModal = async (contacts: NewContact[]) => {
    modalService.openModal(
      <ContactImportModal
        contacts={contacts}
        onActionButtonClick={sendContactsToPhone}
        modalType={ModalType.Select}
      />,
      true
    )
  }

  // Synchronization, step 5: sending contacts to phone
  const sendContactsToPhone = async (contacts: NewContact[]) => {
    let failed = false

    await closeModal()
    modalService.openModal(
      <ImportingContactsModal count={0} total={contacts.length} />
    )

    for (const contact of contacts) {
      const index = contacts.indexOf(contact)

      if (failed || (syncShouldFail && index > contacts.length / 2)) {
        await closeModal()
        showFinishedSynchronizationModal(contacts, index)
        break
      }
      const error = await addNewContact(contact)
      if (error) {
        failed = true
      }

      const currentContactIndex = contacts.indexOf(contact) + 1
      modalService.rerenderModal(
        <ImportingContactsModal
          count={currentContactIndex}
          total={contacts.length}
        />
      )

      if (currentContactIndex === contacts.length) {
        await closeModal()
        showFinishedSynchronizationModal(contacts)
      }
    }
  }

  // Synchronization, step 6: import summary / failure handling
  const showFinishedSynchronizationModal = async (
    contacts: NewContact[],
    failedItemIndex?: number
  ) => {
    const failed = failedItemIndex !== undefined

    await closeModal()
    modalService.openModal(
      <ContactImportModal
        contacts={contacts}
        onActionButtonClick={failed ? sendContactsToPhone : closeModal}
        modalType={failed ? ModalType.Fail : ModalType.Success}
        failedItemIndex={failedItemIndex}
      />
    )
  }

  return (
    <>
      <ContactSection>
        <ContactPanel
          onContactSelect={handleContactSelect}
          onManageButtonClick={showSynchronizationSourceSelectModal}
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

export default Contacts
