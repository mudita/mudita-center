/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  RefObject,
  useCallback,
  useImperativeHandle,
  useState,
} from "react"
import {
  ProviderSelectionModal,
  ProvidersSelectionModalProps,
} from "./provider-selection-modal"
import { ProviderDataLoadingModal } from "./provider-data-loading-modal"
import { ContactToImportAsFile } from "devices/common/models"
import { ExternalAuthProvider } from "app-utils/models"
import { ProviderDataEmptyModal } from "./provider-data-empty-modal"
import { ProviderDataLoadingErrorModal } from "./provider-data-loading-error-modal"
import { ProviderDataSelectModal } from "./provider-data-select-modal"
import { ImportProgressModal, ImportState } from "./import-progress-modal"
import { ImportErrorModal } from "./import-error-modal"
import { ImportCancellingModal } from "./import-cancelling-modal"
import { ImportCancelledModal } from "./import-cancelled-modal"
import { ImportCompleteModal } from "./import-complete-modal"

enum Step {
  Idle,
  ProviderSelect,
  AwaitingProviderSelection,
  DataLoading,
  DataEmpty,
  DataLoadingError,
  DataSelect,
  ImportProgress,
  ImportSummary,
  ImportError,
  ImportCancelling,
  ImportCancelled,
}

export type ImportCallback = (
  contacts: ContactToImportAsFile[],
  onProgress: (progress: number, state: ImportState) => void
) => Promise<
  | {
      cancelled?: boolean
      failed?: boolean
      duplicatesCount?: number
    }
  | undefined
>

export type ProviderSelectCallback = (
  provider: ExternalAuthProvider | "file",
  onStartImporting?: VoidFunction
) => Promise<ContactToImportAsFile[] | undefined>

export type ContactToImportWithId = ContactToImportAsFile & {
  id: string
}

interface Props extends Pick<ProvidersSelectionModalProps, "onHelpClick"> {
  onProviderSelect: ProviderSelectCallback
  onImport: ImportCallback
  onImportCancel: VoidFunction
  onManageDuplicates: VoidFunction
  ref?: RefObject<{
    start: VoidFunction
  } | null>
}

export const ContactsImportFlow: FunctionComponent<Props> = ({
  onImport,
  onImportCancel,
  onProviderSelect,
  onManageDuplicates,
  onHelpClick,
  ref,
}) => {
  const [currentStep, setCurrentStep] = useState(Step.Idle)
  const [contactsToImport, setContactsToImport] = useState<
    ContactToImportWithId[]
  >([])
  const [importProgress, setImportProgress] = useState<number>(0)
  const [importingContactsCount, setImportingContactsCount] = useState(0)
  const [importState, setImportState] = useState(ImportState.Transferring)
  const [duplicatesCount, setDuplicatesCount] = useState(0)

  const handleModalClose = useCallback(() => {
    setCurrentStep(Step.Idle)
  }, [])

  const backToProviderSelect = useCallback(() => {
    setCurrentStep(Step.ProviderSelect)
  }, [])

  const handleProviderSelect: ProvidersSelectionModalProps["onProviderSelect"] =
    useCallback(
      async (provider) => {
        setCurrentStep(Step.AwaitingProviderSelection)

        const contacts = await onProviderSelect(provider, () => {
          setCurrentStep(Step.DataLoading)
        })

        if (contacts && contacts.length > 0) {
          setImportProgress(0)
          setContactsToImport(
            contacts.map((contact, index) => {
              return { ...contact, id: `${index}` }
            })
          )
          setCurrentStep(Step.DataSelect)
        } else if (contacts && contacts.length === 0) {
          setCurrentStep(Step.DataEmpty)
        } else {
          setCurrentStep(Step.DataLoadingError)
        }
      },
      [onProviderSelect]
    )

  const handleImport = useCallback(
    async (ids: ContactToImportWithId["id"][]) => {
      const contacts = contactsToImport.filter((contact) => {
        if (!contact.id) return false
        return ids.includes(contact.id)
      })
      setCurrentStep(Step.ImportProgress)
      try {
        setImportingContactsCount(contacts.length)
        const response = await onImport(contacts, (progress, state) => {
          setImportProgress(progress)
          setImportState(state)
        })
        if (response?.cancelled) {
          setCurrentStep(Step.ImportCancelled)
          return
        }
        if (response?.failed) {
          setCurrentStep(Step.ImportError)
          return
        }
        if (response?.duplicatesCount) {
          setDuplicatesCount(response.duplicatesCount)
        }
        setCurrentStep(Step.ImportSummary)
      } catch {
        setCurrentStep(Step.ImportError)
      }
    },
    [contactsToImport, onImport]
  )

  const goToCancelConfirmation = useCallback(() => {
    if (currentStep === Step.ImportProgress) {
      setCurrentStep(Step.ImportCancelling)
    }
  }, [currentStep])

  const backToProgress = useCallback(() => {
    setCurrentStep(Step.ImportProgress)
  }, [])

  useImperativeHandle(ref, () => ({
    start: () => {
      setContactsToImport([])
      setCurrentStep(Step.ProviderSelect)
      setImportProgress(0)
    },
  }))

  return (
    <>
      <ProviderSelectionModal
        opened={currentStep === Step.ProviderSelect}
        onClose={handleModalClose}
        onProviderSelect={handleProviderSelect}
        onHelpClick={onHelpClick}
      />
      <ProviderDataLoadingModal
        opened={currentStep === Step.DataLoading}
        onClose={backToProviderSelect}
      />
      <ProviderDataEmptyModal
        opened={currentStep === Step.DataEmpty}
        onClose={backToProviderSelect}
      />
      <ProviderDataLoadingErrorModal
        opened={currentStep === Step.DataLoadingError}
        onClose={backToProviderSelect}
      />
      <ProviderDataSelectModal
        opened={currentStep === Step.DataSelect}
        contacts={contactsToImport}
        onClose={backToProviderSelect}
        onImport={handleImport}
      />
      <ImportProgressModal
        opened={currentStep === Step.ImportProgress}
        progress={importProgress}
        state={importState}
        onCancel={goToCancelConfirmation}
      />
      <ImportCancellingModal
        opened={currentStep === Step.ImportCancelling}
        onClose={backToProgress}
        onConfirm={onImportCancel}
      />
      <ImportCancelledModal
        opened={currentStep === Step.ImportCancelled}
        onClose={backToProviderSelect}
      />
      <ImportErrorModal
        opened={currentStep === Step.ImportError}
        onClose={backToProviderSelect}
      />
      <ImportCompleteModal
        opened={currentStep === Step.ImportSummary}
        onClose={handleModalClose}
        contactsCount={importingContactsCount}
        duplicatesCount={duplicatesCount}
        onManageDuplicates={onManageDuplicates}
      />
    </>
  )
}
// eslint-disable-next-line no-redeclare
export type ContactsImportFlow = NonNullable<Props["ref"]>["current"]
