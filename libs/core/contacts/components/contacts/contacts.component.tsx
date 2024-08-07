/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ContactList from "Core/contacts/components/contact-list/contact-list.component"
import ContactPanel from "Core/contacts/components/contact-panel/contact-panel.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { TableWithSidebarWrapper } from "Core/__deprecated__/renderer/components/core/table/table.component"
import ContactDetails from "Core/contacts/components/contact-details/contact-details.component"
import useTableSidebar from "Core/__deprecated__/renderer/utils/hooks/use-table-sidebar"
import ContactEdit, {
  defaultContact,
} from "Core/contacts/components/contact-edit/contact-edit.component"
import modalService from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import SpeedDialModal from "Core/contacts/components/speed-dial-modal/speed-dial-modal.container"
import { createFullName } from "Core/contacts/helpers/contacts.helpers"
import { intl, textFormatters } from "Core/__deprecated__/renderer/utils/intl"
import DeleteModal from "Core/__deprecated__/renderer/components/core/modal/delete-modal.component"
import { ContactSection } from "Core/contacts/components/contacts/contacts.styled"
import { defineMessages } from "react-intl"
import useURLSearchParams from "Core/__deprecated__/renderer/utils/hooks/use-url-search-params"
import findContactByPhoneNumber from "Core/contacts/helpers/find-contact-by-phone-number/find-contact-by-phone-number"
import { ExternalProvider, Provider } from "generic-view/store"
import delayResponse from "@appnroll/delay-response"
import {
  ErrorDataModal,
  ErrorWithRetryDataModal,
  LoadingStateDataModal,
} from "Core/__deprecated__/renderer/components/rest/data-modal/data.modals"
import mapVCFsToContacts from "Core/contacts/helpers/map-vcfs-to-contacts/map-vcfs-to-contacts"
import logger from "Core/__deprecated__/main/utils/logger"
import {
  ContactsProps,
  FormError,
  ExternalService,
  FileService,
  NewContactResponse,
} from "Core/contacts/components/contacts/contacts.interface"
import ContactSearchResults from "Core/contacts/components/contact-search-results/contact-search-results.component"
import ImportContactsFlow, {
  ImportContactsFlowState,
} from "Core/contacts/components/import-contacts-flow/import-contacts-flow.component"
import { Contact, NewContact } from "Core/contacts/reducers/contacts.interface"
import { isError } from "Core/__deprecated__/common/helpers/is-error.helpers"
import { ExportContactFailedModal } from "../export-contact-failed-modal/export-contact-failed-modal.component"
import { applyValidationRulesToImportedContacts } from "Core/contacts/helpers/apply-validation-rules-to-imported-contacts/apply-validation-rules-to-imported-contacts"
import { ExportContactsResult } from "Core/contacts/constants"
import DeleteContactsPopup from "./delete-contacts-popup/delete-contacts-popup.component"
import { differenceWith, isEqual } from "lodash"
import { filterContacts } from "Core/contacts/helpers/filter-contacts/filter-contacts"
import { AppError } from "Core/core/errors"
import { RequestResponseStatus } from "Core/core/types"
import createFile from "Core/__deprecated__/renderer/utils/create-file/create-file"
import { activeDeviceIdSelector } from "active-device-registry/feature"

const allPossibleFormErrorCausedByAPI: FormError[] = [
  {
    field: "primaryPhoneNumber",
    error: "component.formErrorNumberUnique",
  },
  {
    field: "secondaryPhoneNumber",
    error: "component.formErrorNumberUnique",
  },
  {
    field: "primaryPhoneNumber",
    error: "component.formErrorRequiredPrimaryPhone",
  },
  {
    field: "primaryPhoneNumber",
    error: "component.formErrorNumberUnique",
  },
]

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
  contacts,
  speedDialChosenList,
  loadContacts,
  addNewContact,
  importContact,
  editContact,
  deleteContacts,
  authorize,
  openFileRequest,
  exportContacts,
  addNewContactsToState,
  resetAllItems,
  selectAllItems,
  toggleItem,
  selectedItems,
  allItemsSelected,
  closeImportWindow,
}) => {
  const searchParams = useURLSearchParams()
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const phoneNumber = searchParams.get("phoneNumber") || ""
  const activeContact = findContactByPhoneNumber(contacts, phoneNumber)
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
  const [exportFailed, setExportFailed] = useState<boolean>(false)

  const detailsEnabled = activeRow && !newContact && !editedContact

  const contact = getContact(activeRow?.id ?? "")

  useEffect(() => {
    if (editedContact) {
      const newData = contacts.find(
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
  }, [contacts])

  const closeModal = () => modalService.closeModal()

  const handleAddingContact = () => {
    closeSidebar()
    setNewContact(defaultContact)
    setShowSearchResults(false)
    setSearchPreviewValue("")
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

      const { message, payload } =
        (await delayResponse(addNewContact(contact))).payload ?? {}

      if (payload || message) {
        const newError: FormError[] = []
        if (
          message === "phone-number-duplicated" &&
          payload?.primaryPhoneNumberIsDuplicated
        ) {
          newError.push({
            field: "primaryPhoneNumber",
            error: "component.formErrorNumberUnique",
          })
        }
        if (
          message === "phone-number-duplicated" &&
          payload?.secondaryPhoneNumberIsDuplicated
        ) {
          newError.push({
            field: "secondaryPhoneNumber",
            error: "component.formErrorNumberUnique",
          })
        }
        if (message === "Create contact: Empty primary phone number") {
          newError.push({
            field: "primaryPhoneNumber",
            error: "component.formErrorRequiredPrimaryPhone",
          })
        }
        if (newError.length === 0) {
          newError.push({
            field: "primaryPhoneNumber",
            error: "component.formErrorNumberUnique",
          })
        }

        const cleanedErrors = differenceWith(
          formErrors,
          allPossibleFormErrorCausedByAPI,
          (a, b) => isEqual(a, b)
        )

        setFormErrors([...cleanedErrors, ...newError])
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

        const { message, payload } =
          (await delayResponse(editContact(contact))).payload ?? {}

        if (payload || message) {
          const newError: FormError[] = []

          if (message === "Edit Contact request failed") {
            void modalService.openModal(<ErrorDataModal />, true)
            reject()
            return
          }

          if (
            message === "phone-number-duplicated" &&
            payload?.primaryPhoneNumberIsDuplicated
          ) {
            newError.push({
              field: "primaryPhoneNumber",
              error: "component.formErrorNumberUnique",
            })
          }
          if (
            message === "phone-number-duplicated" &&
            payload?.secondaryPhoneNumberIsDuplicated
          ) {
            newError.push({
              field: "secondaryPhoneNumber",
              error: "component.formErrorNumberUnique",
            })
          }
          if (message === "Create contact: Empty primary phone number") {
            newError.push({
              field: "primaryPhoneNumber",
              error: "component.formErrorRequiredPrimaryPhone",
            })
          }
          if (newError.length === 0) {
            newError.push({
              field: "primaryPhoneNumber",
              error: "component.formErrorNumberUnique",
            })
          }

          const cleanedErrors = differenceWith(
            formErrors,
            allPossibleFormErrorCausedByAPI,
            (a, b) => isEqual(a, b)
          )

          setFormErrors([...cleanedErrors, ...newError])
          await closeModal()
          return
        }
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

  const openDeleteModal = (id: string) => {
    const contact = contacts.find((contact) => contact.id === id)
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
        closeSidebar()
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

  const openSpeedDialModal = () => {
    void modalService.openModal(<SpeedDialModal onSave={closeModal} />)
  }

  const [importContactsFlowState, setImportContactsFlowState] =
    useState<ImportContactsFlowState>()
  const [importedContacts, setImportedContacts] = useState<NewContact[]>([])
  const [addedContactsCount, setAddedContactsCount] = useState<number>(0)
  // Synchronization, step 1: Show modal with action buttons
  const handleImportContacts = () => {
    setImportContactsFlowState(ImportContactsFlowState.Start)
  }

  const closeImportContactsModalFlow = async () => {
    await closeImportWindow(Provider.Google)
    await closeImportWindow(Provider.Outlook)
    setImportContactsFlowState(undefined)
    setAddedContactsCount(0)
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
  const importFromFile = async () => {
    const openFileResult = await openFileRequest({
      filters: [
        {
          name: "vcf",
          extensions: ["vcf"],
        },
      ],
      properties: ["openFile", "multiSelections"],
    })
    const { ok, data: paths } = openFileResult

    const files =
      ok && paths !== undefined ? paths.map((path) => createFile(path)) : []

    if (files.length === 0) {
      setImportContactsFlowState(ImportContactsFlowState.Start)
    } else {
      void getContacts({
        type: "files",
        data: Array.from(files),
      })

      setImportContactsFlowState(ImportContactsFlowState.MethodSelected)
    }
  }

  // Synchronization, step 2b: 3-rd party services
  const authorizeAtGoogle = () => {
    return authorizeAtProvider(Provider.Google)
  }
  const authorizeAtOutLook = () => {
    return authorizeAtProvider(Provider.Outlook)
  }

  const authorizeAtProvider = async (provider: ExternalProvider) => {
    try {
      setImportContactsFlowState(ImportContactsFlowState.MethodSelected)
      const authorizeResult = await authorize(provider)

      if (authorizeResult.type === "CONTACTS_AUTHORIZE/rejected") {
        setImportContactsFlowState((prev) => {
          return prev === ImportContactsFlowState.MethodSelected
            ? ImportContactsFlowState.Start
            : prev
        })
      } else {
        await getContacts({ type: provider })
      }
    } catch {
      setImportContactsFlowState(ImportContactsFlowState.Start)
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

      const importedContacts =
        service.type === "files"
          ? await mapVCFsToContacts(service.data)
          : await loadContacts(service.type)

      setImportedContacts(
        applyValidationRulesToImportedContacts(importedContacts)
      )

      showContactsSelectingModal()
    } catch (error) {
      handleError()
    }
  }

  // Synchronization, step 5: sending contacts to phone
  const sendContactsToPhone = async (contacts: NewContact[]) => {
    const importedContacts = applyValidationRulesToImportedContacts(contacts)
    setImportedContacts(importedContacts)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await showContactsImportingModal()

    const newContactResponses = []
    for (let index = 0; index < importedContacts.length; index++) {
      const newContact = importedContacts[index]
      const { payload } = await importContact({ newContact, activeDeviceId })

      if (
        (payload as AppError).type === RequestResponseStatus.InternalServerError
      ) {
        return
      }
      const currentContactIndex = index + 1
      setAddedContactsCount(currentContactIndex)

      if (isError(payload)) {
        newContactResponses.push({ ...newContact, successfullyAdded: false })
      } else {
        newContactResponses.push({ ...payload })
      }
    }

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
  const [searchPreviewValue, setSearchPreviewValue] = useState<string>("")
  const [searchValue, setSearchValue] = useState<string>("")

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    openSidebar(contact)
  }

  useEffect(() => {
    if (searchPreviewValue === "") {
      setShowSearchResults(false)
    }
  }, [searchPreviewValue])

  useEffect(() => {
    if (detailsEnabled === true) {
      setSearchPreviewValue("")
    }
  }, [detailsEnabled])

  const openSearchResults = () => {
    setShowSearchResults(true)
    setEditedContact(undefined)
    setNewContact(undefined)
    setSearchValue(searchPreviewValue)
  }

  const results = filterContacts(contacts, searchValue || "")
  const resultsPreview = filterContacts(contacts, searchPreviewValue || "")

  const handleExport = async (ids: string[]): Promise<void> => {
    const contactsToExport = contacts.filter((contact) =>
      ids.includes(contact.id)
    )
    const exportResult = await exportContacts(contactsToExport)

    switch (exportResult) {
      case ExportContactsResult.Ok:
        resetAllItems()
        break

      case ExportContactsResult.Cancelled:
        // do nothing when cancelled
        break

      default:
      case ExportContactsResult.Failed:
        setExportFailed(true)
        break
    }
  }

  const handleDeleteContacts = (
    ...params: Parameters<typeof deleteContacts>
  ): ReturnType<typeof deleteContacts> => {
    const [ids] = params
    if (activeRow !== undefined && ids.includes(activeRow.id.toString())) {
      closeSidebar()
    }
    return deleteContacts(...params)
  }

  return (
    <>
      {exportFailed && (
        <ExportContactFailedModal
          open={exportFailed}
          onClose={() => setExportFailed(false)}
        />
      )}
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
          contactsList={contacts}
          onContactSelect={handleContactSelect}
          onManageButtonClick={handleImportContacts}
          onNewButtonClick={handleAddingContact}
          selectedContacts={selectedItems}
          allItemsSelected={allItemsSelected}
          toggleAll={selectAllItems}
          deleteContacts={handleDeleteContacts}
          resetRows={resetAllItems}
          editMode={Boolean(editedContact || newContact)}
          onSearchEnterClick={openSearchResults}
          searchValue={searchValue}
          searchPreviewValue={searchPreviewValue}
          onSearchPreviewValueChange={setSearchPreviewValue}
          results={resultsPreview}
          showSearchResults={showSearchResults}
          onExport={handleExport}
        />
        {showSearchResults ? (
          <ContactSearchResults
            results={results}
            onSelect={handleContactSelect}
            onExport={handleExport}
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
                contact={contact}
                onClose={closeSidebar}
                onExport={handleExport}
                onDelete={openDeleteModal}
                onEdit={handleEditingContact}
              />
            )}
          </TableWithSidebarWrapper>
        )}
      </ContactSection>
      <DeleteContactsPopup />
    </>
  )
}

export default Contacts
