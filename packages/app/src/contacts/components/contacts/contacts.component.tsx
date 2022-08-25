/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import ContactList from "App/contacts/components/contact-list/contact-list.component"
import ContactPanel from "App/contacts/components/contact-panel/contact-panel.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { TableWithSidebarWrapper } from "App/__deprecated__/renderer/components/core/table/table.component"
import ContactDetails from "App/contacts/components/contact-details/contact-details.component"
import useTableSidebar from "App/__deprecated__/renderer/utils/hooks/use-table-sidebar"
import ContactEdit, {
  defaultContact,
} from "App/contacts/components/contact-edit/contact-edit.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import modalService from "App/__deprecated__/renderer/components/core/modal/modal.service"
import SpeedDialModal from "App/contacts/components/speed-dial-modal/speed-dial-modal.container"
import BlockContactModal from "App/contacts/components/block-contact-modal/block-contact-modal.component"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import DeleteModal from "App/__deprecated__/renderer/components/core/modal/delete-modal.component"
import { ContactSection } from "App/contacts/components/contacts/contacts.styled"
import { defineMessages } from "react-intl"
import { useHistory } from "react-router-dom"
import useURLSearchParams from "App/__deprecated__/renderer/utils/hooks/use-url-search-params"
import findContactByPhoneNumber from "App/contacts/helpers/find-contact-by-phone-number/find-contact-by-phone-number"
import {
  ExternalProvider,
  Provider,
} from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import delayResponse from "@appnroll/delay-response"
import {
  ErrorDataModal,
  ErrorWithRetryDataModal,
  LoadingStateDataModal,
} from "App/__deprecated__/renderer/components/rest/data-modal/data.modals"
import mapVCFsToContacts from "App/contacts/helpers/map-vcfs-to-contacts/map-vcfs-to-contacts"
import logger from "App/__deprecated__/main/utils/logger"
import {
  ContactsProps,
  FormError,
  ExternalService,
  FileService,
  NewContactResponse,
} from "App/contacts/components/contacts/contacts.interface"
import appContextMenu from "App/__deprecated__/renderer/wrappers/app-context-menu"
import ContactSearchResults from "App/contacts/components/contact-search-results/contact-search-results.component"
import ImportContactsFlow, {
  ImportContactsFlowState,
} from "App/contacts/components/import-contacts-flow/import-contacts-flow.component"
import { Contact, NewContact } from "App/contacts/reducers/contacts.interface"
import { isError } from "App/__deprecated__/common/helpers/is-error.helpers"
import { contactsFilter } from "App/contacts/helpers/contacts-filter/contacts-filter.helper"

export const messages = defineMessages({
  deleteTitle: { id: "module.contacts.deleteTitle" },
  deleteText: { id: "module.contacts.deleteText" },
  addingText: { id: "module.contacts.addingText" },
  deletingText: { id: "module.contacts.deletingText" },
  editingText: { id: "module.contacts.editingText" },
  downloadingText: { id: "module.contacts.downloadingText" },
})

const Contacts: FunctionComponent<ContactsProps> = ({
  resultState,
  getContact,
  contactList = [],
  flatList,
  speedDialChosenList,
  isThreadOpened,
  loadContacts,
  addNewContact,
  importContact,
  editContact,
  deleteContacts,
  authorize,
  onCall,
  onMessage,
  exportContacts,
  addNewContactsToState,

  resetAllItems,
  selectAllItems,
  toggleItem,
  selectedItems,
  allItemsSelected,
}) => {
  const history = useHistory()
  const searchParams = useURLSearchParams()
  const phoneNumber = searchParams.get("phoneNumber") || ""
  const activeContact = findContactByPhoneNumber(flatList, phoneNumber)
  const initNewContact =
    phoneNumber !== "" && activeContact === undefined
      ? { ...defaultContact, primaryPhoneNumber: phoneNumber }
      : undefined

  const { openSidebar, closeSidebar, activeRow } =
    useTableSidebar<Contact>(activeContact)
  const [newContact, setNewContact] = useState<NewContact | undefined>(
    initNewContact
  )
  const [editedContact, setEditedContact] = useState<Contact>()
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [formErrors, setFormErrors] = useState<FormError[]>([])

  const detailsEnabled = activeRow && !newContact && !editedContact

  useEffect(() => {
    if (editedContact) {
      const newData = flatList.find(
        (contact) => contact.id === editedContact.id
      )

      if (newData) {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setEditedContact((curr: any) => {
          if ("speedDial" in newData) {
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return {
              ...curr,
              speedDial: newData.speedDial,
            }
          }

          if (curr && "speedDial" in curr) {
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            delete curr.speedDial
          }

          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return curr
        })
      }
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flatList])

  const closeModal = () => modalService.closeModal()

  const contactFreshData = ({ id }: Contact) => {
    return getContact(id)
  }

  const handleAddingContact = () => {
    closeSidebar()
    setNewContact(defaultContact)
    setShowSearchResults(false)
    setSearchValue("")
  }

  const cancelOrCloseContactHandler = () => {
    setFormErrors([])
    setNewContact(undefined)
  }

  const saveNewContact = async (contact: NewContact) => {
    const add = async (retried?: boolean) => {
      void modalService.openModal(
        <LoadingStateDataModal textMessage={messages.addingText} />,
        true
      )

      const { payload } = await delayResponse(addNewContact(contact))

      if (payload) {
        setFormErrors([
          ...formErrors,
          {
            field: "primaryPhoneNumber",
            error: "component.formErrorNumberUnique",
          },
        ])
        await closeModal()
        return
      }

      if (payload && !retried) {
        void modalService.openModal(
          <ErrorWithRetryDataModal onRetry={() => add(true)} />,
          true
        )
      } else if (payload) {
        void modalService.openModal(<ErrorDataModal />, true)
      } else {
        cancelOrCloseContactHandler()
        await closeModal()
      }
    }

    await add()
  }

  const handleEditingContact = (contact: Contact) => {
    setEditedContact(contact)
    resetAllItems()
  }

  const cancelEditingContact = (contact?: Contact) => {
    setEditedContact(undefined)
    openSidebar(contact as Contact)
  }

  const editContactWithRetry = async (contact: Contact) => {
    return new Promise((resolve, reject) => {
      const edit = async (retried?: boolean) => {
        void modalService.openModal(
          <LoadingStateDataModal textMessage={messages.editingText} />,
          true
        )

        const { payload } = await delayResponse(editContact(contact))

        if (payload && !retried) {
          void modalService.openModal(
            <ErrorWithRetryDataModal onRetry={() => edit(true)} />,
            true
          )
        } else if (payload) {
          void modalService.openModal(<ErrorDataModal />, true)
          reject()
        } else {
          await modalService.closeModal()
          resolve(undefined)
        }
      }

      void edit()
    })
  }

  const saveEditedContact = async (contact: Contact) => {
    try {
      await editContactWithRetry(contact)
      setEditedContact(contact)
      cancelEditingContact(contact)
      openSidebar(contact)
    } catch (error) {
      logger.error(
        `Contacts: editing process throw error. Data: ${JSON.stringify(error)}`
      )
    }
  }

  const handleMessage = (phoneNumber: string) => onMessage(history, phoneNumber)

  const openDeleteModal = (id: string) => {
    const contact = flatList.find((contact) => contact.id === id)
    const handleDelete = async () => {
      resetAllItems()
      void modalService.openModal(
        <LoadingStateDataModal textMessage={messages.deletingText} />,
        true
      )

      // await can be restored if we will process the result directly in here, not globally
      const { payload } = await delayResponse(deleteContacts([id]))

      if (payload) {
        void modalService.openModal(<ErrorDataModal />, true)
      } else {
        cancelOrCloseContactHandler()
        await modalService.closeModal()
      }
    }

    void modalService.openModal(
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
      logger.error(
        `Contacts: editing (unblock) process throw error. Data: ${JSON.stringify(
          error
        )}`
      )
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
        logger.error(
          `Contacts: editing process (block) throw error. Data: ${JSON.stringify(
            error
          )}`
        )
      }

      if (detailsEnabled) {
        openSidebar(blockedContact)
      }
    }

    void modalService.openModal(
      <BlockContactModal contact={contact} onBlock={handleBlock} />
    )
  }

  const openSpeedDialModal = () => {
    void modalService.openModal(<SpeedDialModal onSave={closeModal} />)
  }

  // Synchronization, dev mode: toggle contacts saving failure
  const [syncShouldFail, setSyncFailure] = useState(false)

  useEffect(() => {
    const unregisterItem = appContextMenu.registerItem("Contacts", {
      labelCreator: () =>
        `${syncShouldFail ? "Disable" : "Enable"} saving failure`,
      click: () => setSyncFailure((prevState) => !prevState),
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return () => unregisterItem()
  }, [syncShouldFail])

  // Synchronization, dev mode: toggle contacts importing failure
  const [parseShouldFail, setParseFailure] = useState(false)

  useEffect(() => {
    const unregisterItem = appContextMenu.registerItem("Contacts", {
      labelCreator: () =>
        `${parseShouldFail ? "Disable" : "Enable"} parsing failure`,
      click: () => setParseFailure((prevState) => !prevState),
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return () => unregisterItem()
  }, [parseShouldFail])

  const [importContactsFlowState, setImportContactsFlowState] =
    useState<ImportContactsFlowState>()
  const [importedContacts, setImportedContacts] = useState<NewContact[]>([])
  const [addedContactsCount, setAddedContactsCount] = useState<number>(0)
  // Synchronization, step 1: Show modal with action buttons
  const handleImportContacts = () => {
    setImportContactsFlowState(ImportContactsFlowState.Start)
  }

  const closeImportContactsModalFlow = () => {
    setImportContactsFlowState(undefined)
  }
  const showAuthorizaionFailedModal = () => {
    setImportContactsFlowState(ImportContactsFlowState.AuthorizationError)
  }
  // Synchronization, step 3: data loading
  const showDownloadingLoader = () => {
    setImportContactsFlowState(ImportContactsFlowState.Downloading)
  }
  // Synchronization, step 4: selecting contacts
  const showContactsSelectingModal = () => {
    setImportContactsFlowState(ImportContactsFlowState.Selecting)
  }

  const showContactsImportingModal = () => {
    setImportContactsFlowState(ImportContactsFlowState.Importing)
  }
  // Synchronization, step 6: import summary handling
  const showSuccessfulFinishedModalFlow = () => {
    setImportContactsFlowState(ImportContactsFlowState.Success)
  }
  // Synchronization, step 6: import failure handling
  const showFailedFinishedModalFlow = () => {
    setImportContactsFlowState(ImportContactsFlowState.Failed)
  }

  // Synchronization, step 2a: file select
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  const importFromFile = async (inputElement: HTMLInputElement) => {
    const onFileSelect = () => {
      if (inputElement.files) {
        void getContacts({
          type: "files",
          data: Array.from(inputElement.files),
        })
        inputElement.removeEventListener("change", onFileSelect)
      }
    }

    inputElement.click()
    inputElement.addEventListener("change", onFileSelect)
  }

  // Synchronization, step 2b: 3-rd party services
  const authorizeAtGoogle = () => authorizeAtProvider(Provider.Google)
  const authorizeAtOutLook = () => authorizeAtProvider(Provider.Outlook)

  const authorizeAtProvider = async (provider: ExternalProvider) => {
    try {
      await authorize(provider)
      await getContacts({ type: provider })
    } catch {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await showAuthorizaionFailedModal()
    }
  }

  const getContacts = async (service: ExternalService | FileService) => {
    const handleError = () => {
      setImportContactsFlowState(
        service.type === "files"
          ? ImportContactsFlowState.ParsingError
          : ImportContactsFlowState.DownloadingError
      )
    }

    try {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await showDownloadingLoader()

      if (parseShouldFail) {
        handleError()
        return
      }
      setImportedContacts(
        service.type === "files"
          ? await mapVCFsToContacts(service.data)
          : await loadContacts(service.type)
      )

      showContactsSelectingModal()
    } catch (error) {
      handleError()
    }
  }

  // Synchronization, step 5: sending contacts to phone
  const sendContactsToPhone = async (contacts: NewContact[]) => {
    setImportedContacts(contacts)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await showContactsImportingModal()

    const newContactResponses = await contacts.reduce(
      async (lastPromise, contact, index) => {
        const value = await lastPromise
        const { payload } = await importContact(contact)
        const currentContactIndex = index + 1
        setAddedContactsCount(currentContactIndex)

        if (isError(payload)) {
          return [...value, { ...contact, successfullyAdded: false }]
        } else {
          return [...value, { ...payload }]
        }
      },
      Promise.resolve<(NewContactResponse | Contact)[]>([])
    )

    const failedNewContacts: NewContact[] = newContactResponses.filter(
      (contact): contact is NewContactResponse => "successfullyAdded" in contact
    )

    const successNewContacts: Contact[] = newContactResponses.filter(
      (contact): contact is Contact => !("successfullyAdded" in contact)
    )

    await addNewContactsToState(successNewContacts)

    const successfulItemsCount = contacts.length - failedNewContacts.length
    if (successfulItemsCount === contacts.length) {
      showSuccessfulFinishedModalFlow()
    } else {
      setImportedContacts(failedNewContacts)
      setAddedContactsCount(successfulItemsCount)
      showFailedFinishedModalFlow()
    }
  }

  const [showSearchResults, setShowSearchResults] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    openSidebar(contact)
    setShowSearchResults(false)
  }

  useEffect(() => {
    if (searchValue === "") {
      setShowSearchResults(false)
    }
  }, [searchValue])

  useEffect(() => {
    if (detailsEnabled === true) {
      setSearchValue("")
    }
  }, [detailsEnabled])

  const openSearchResults = () => {
    setShowSearchResults(true)
    setEditedContact(undefined)
    setNewContact(undefined)
  }

  const results = flatList.filter((item) =>
    contactsFilter(item, searchValue || "")
  )

  const handleExport = async (ids: string[]): Promise<void> => {
    const contacts = flatList.filter((contact) => ids.includes(contact.id))
    const exported = await exportContacts(contacts)

    if (exported) {
      resetAllItems()
    }
  }

  return (
    <>
      {importContactsFlowState && (
        <ImportContactsFlow
          state={importContactsFlowState}
          contacts={importedContacts}
          closeModal={closeImportContactsModalFlow}
          authorizeAtGoogle={authorizeAtGoogle}
          authorizeAtOutLook={authorizeAtOutLook}
          importFromFile={importFromFile}
          sendContactsToPhone={sendContactsToPhone}
          retryImport={handleImportContacts}
          addedContactsCount={addedContactsCount}
        />
      )}
      <ContactSection>
        <ContactPanel
          contactsList={flatList}
          onContactSelect={handleContactSelect}
          onManageButtonClick={handleImportContacts}
          onNewButtonClick={handleAddingContact}
          selectedContacts={selectedItems}
          allItemsSelected={allItemsSelected}
          toggleAll={selectAllItems}
          deleteContacts={deleteContacts}
          resetRows={resetAllItems}
          editMode={Boolean(editedContact || newContact)}
          onSearchEnterClick={openSearchResults}
          searchValue={searchValue}
          onSearchValueChange={setSearchValue}
          results={results}
          showSearchResults={showSearchResults}
          onExport={handleExport}
        />
        {showSearchResults ? (
          <ContactSearchResults
            results={results}
            onSelect={handleContactSelect}
            onExport={handleExport}
            onForward={noop}
            onUnblock={handleUnblock}
            onBlock={openBlockModal}
            onDelete={openDeleteModal}
            resultsState={resultState}
            selectedContact={selectedContact}
            selectedItems={selectedItems}
          />
        ) : (
          <TableWithSidebarWrapper>
            <ContactList
              activeRow={activeRow}
              contactList={contactList}
              onSelect={openSidebar}
              onExport={handleExport}
              onForward={noop}
              onUnblock={handleUnblock}
              onBlock={openBlockModal}
              onDelete={openDeleteModal}
              onEdit={handleEditingContact}
              editMode={Boolean(editedContact || newContact)}
              resultsState={resultState}
              selectedContact={selectedContact}
              toggleRow={toggleItem}
              selectedItems={selectedItems}
            />
            {newContact && (
              <ContactEdit
                contact={newContact as Contact}
                speedDialChosenList={speedDialChosenList}
                onCancel={cancelOrCloseContactHandler}
                onSpeedDialSettingsOpen={openSpeedDialModal}
                onSave={saveNewContact}
                validationError={formErrors}
              />
            )}
            {editedContact && (
              <ContactEdit
                contact={editedContact}
                speedDialChosenList={speedDialChosenList}
                onCancel={cancelEditingContact}
                onSpeedDialSettingsOpen={openSpeedDialModal}
                onSave={saveEditedContact}
                validationError={formErrors}
              />
            )}
            {detailsEnabled && (
              <ContactDetails
                contact={contactFreshData(activeRow)}
                onClose={closeSidebar}
                onExport={handleExport}
                onForward={noop}
                onUnblock={handleUnblock}
                onBlock={openBlockModal}
                onDelete={openDeleteModal}
                onEdit={handleEditingContact}
                onCall={onCall}
                onMessage={handleMessage}
                isThreadOpened={isThreadOpened}
              />
            )}
          </TableWithSidebarWrapper>
        )}
      </ContactSection>
    </>
  )
}

export default Contacts
