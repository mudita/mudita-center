/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { ModalDialog } from "Core/ui/components/modal-dialog"
import { ImportContactsFlowTestIds } from "Core/contacts/components/import-contacts-flow/import-contacts-flow-test-ids.component"
import SyncContactsModal from "Core/contacts/components/sync-contacts-modal/sync-contacts-modal.component"
import { DownloadContactsModal } from "Core/contacts/components/contacts/download-contacts-modal/download-contacts-modal"
import InfoModal from "Core/contacts/components/info-modal/info-modal.component"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { ContactImportModal } from "Core/contacts/components/contact-import/contact-import-modal.component"
import ErrorModal from "Core/ui/components/error-modal/error-modal.component"
import ImportingContactsModal from "Core/contacts/components/importing-contacts-modal/importing-contacts-modal.component"
import { NewContact } from "Core/contacts/reducers/contacts.interface"
import { ModalType } from "Core/contacts/components/contact-import/contact-import-modal.enum"

export const messages = defineMessages({
  downloadingErrorTitle: {
    id: "module.contacts.downloadingErrorTitle",
  },
  downloadingErrorBody: {
    id: "module.contacts.downloadingErrorBody",
  },
  authorizationFailedTitle: {
    id: "module.contacts.authorizationFailedTitle",
  },
  authorizationFailedBody: {
    id: "module.calendar.authorizationFailedBody",
  },
  authorizationFailedButton: {
    id: "module.contacts.authorizationFailedButton",
  },
  parsingFileErrorTitle: {
    id: "module.contacts.parsingFileErrorTitle",
  },
  parsingFileErrorBody: {
    id: "module.contacts.parsingFileErrorBody",
  },
  importingTitle: {
    id: "module.contacts.importingTitle",
  },
  importingNoDataDescription: {
    id: "module.contacts.importingNoDataDescription",
  },
  importingOkButton: {
    id: "component.okButton",
  },
})

export enum ImportContactsFlowState {
  Start = "start",
  MethodSelected = "method-selected",
  Downloading = "downloading",
  Selecting = "selecting",
  Importing = "importing",
  ParsingError = "parsing-error",
  DownloadingError = "downloading-error",
  AuthorizationError = "authorization-error",
  Success = "success",
  Failed = "failed",
}

interface Props extends Omit<ComponentProps<typeof ModalDialog>, "open"> {
  state?: ImportContactsFlowState
  contacts: NewContact[]
  authorizeAtGoogle: () => Promise<void>
  authorizeAtOutLook: () => Promise<void>
  importFromFile: () => void
  sendContactsToPhone: (contacts: NewContact[]) => Promise<void>
  closeModal: () => void
  retryImport: () => void
  addedContactsCount: number
  onCancelManualImportClick: () => void
}

const ImportContactsFlow: FunctionComponent<Props> = ({
  state = ImportContactsFlowState.Start,
  contacts,
  addedContactsCount,
  authorizeAtGoogle,
  authorizeAtOutLook,
  importFromFile,
  sendContactsToPhone,
  closeModal,
  retryImport,
  onCancelManualImportClick,
}) => {
  return (
    <>
      <SyncContactsModal
        onGoogleButtonClick={authorizeAtGoogle}
        onOutlookButtonClick={authorizeAtOutLook}
        onManualImportClick={importFromFile}
        open={
          ImportContactsFlowState.Start === state ||
          ImportContactsFlowState.MethodSelected === state
        }
        testId={ImportContactsFlowTestIds.Start}
        closeModal={closeModal}
        disabledOtherMethod={ImportContactsFlowState.Start !== state}
        onCancelManualImportClick={onCancelManualImportClick}
      />
      <DownloadContactsModal
        open={ImportContactsFlowState.Downloading === state}
        closeModal={closeModal}
        testId={ImportContactsFlowTestIds.Downloading}
      />
      <InfoModal
        open={
          ImportContactsFlowState.Selecting === state && contacts.length === 0
        }
        title={intl.formatMessage(messages.importingTitle)}
        body={intl.formatMessage(messages.importingNoDataDescription)}
        actionButtonLabel={intl.formatMessage(messages.importingOkButton)}
        closeButton={false}
        onActionButtonClick={closeModal}
        closeModal={closeModal}
        testId={ImportContactsFlowTestIds.SelectingEmpty}
      />
      {ImportContactsFlowState.Selecting === state && contacts.length > 0 && (
        <ContactImportModal
          open={
            ImportContactsFlowState.Selecting === state && contacts.length > 0
          }
          contacts={contacts}
          onActionButtonClick={sendContactsToPhone}
          modalType={ModalType.Select}
          closeModal={closeModal}
          testId={ImportContactsFlowTestIds.Selecting}
        />
      )}
      <ErrorModal
        open={ImportContactsFlowState.ParsingError === state}
        title={intl.formatMessage(messages.parsingFileErrorTitle)}
        body={intl.formatMessage(messages.parsingFileErrorBody)}
        closeModal={closeModal}
        testId={ImportContactsFlowTestIds.ParsingError}
      />
      <ErrorModal
        open={ImportContactsFlowState.DownloadingError === state}
        title={intl.formatMessage(messages.downloadingErrorTitle)}
        body={intl.formatMessage(messages.downloadingErrorBody)}
        closeModal={closeModal}
        testId={ImportContactsFlowTestIds.DownloadingError}
      />
      <ErrorModal
        open={ImportContactsFlowState.AuthorizationError === state}
        title={intl.formatMessage(messages.authorizationFailedTitle)}
        body={intl.formatMessage(messages.authorizationFailedBody)}
        onActionButtonClick={retryImport}
        actionButtonLabel={intl.formatMessage(
          messages.authorizationFailedButton
        )}
        closeModal={closeModal}
        testId={ImportContactsFlowTestIds.AuthorizationError}
      />
      <ImportingContactsModal
        open={ImportContactsFlowState.Importing === state}
        count={addedContactsCount}
        total={contacts.length}
        testId={ImportContactsFlowTestIds.Importing}
      />
      {ImportContactsFlowState.Success === state && (
        <ContactImportModal
          open={ImportContactsFlowState.Success === state}
          contacts={contacts}
          onActionButtonClick={closeModal}
          modalType={ModalType.Success}
          closeModal={closeModal}
          testId={ImportContactsFlowTestIds.Success}
        />
      )}
      {ImportContactsFlowState.Failed === state && (
        <ContactImportModal
          open={ImportContactsFlowState.Failed === state}
          contacts={contacts}
          onActionButtonClick={sendContactsToPhone}
          modalType={ModalType.Fail}
          successfulItemsCount={addedContactsCount}
          closeModal={closeModal}
          testId={ImportContactsFlowTestIds.Failed}
        />
      )}
    </>
  )
}

export default ImportContactsFlow
