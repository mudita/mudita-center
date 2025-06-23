/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC, CustomModalError } from "generic-view/utils"
import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { Form } from "../../interactive/form/form"
import { Modal } from "../../interactive/modal"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  cleanImportProcess,
  clearDataTransfer,
  closeModal as closeModalAction,
  importContactsErrorSelector,
  importContactsFromExternalSource,
  importContactsSelector,
  ImportStatus,
  importStatusSelector,
  selectActiveApiDeviceId,
  selectDataTransferErrorType,
  selectDataTransferStatus,
  selectEntities,
  setImportProcessStatus,
  transferDataToDevice,
} from "generic-view/store"
import { ImportContactsProvider } from "./import-contacts-provider"
import { ImportContactsLoader } from "./import-contats-loader"
import {
  ImportContactsList,
  SELECTED_CONTACTS_FIELD,
} from "./import-contacts-list"
import { ImportContactsProgress } from "./import-contacts-progress"
import { ImportContactsSuccess } from "./import-contacts-success"
import { ImportContactsError } from "./import-contacts-error"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { useFormContext } from "react-hook-form"
import { ButtonAction, ImportContactsConfig } from "generic-view/models"
import { ApiFileTransferError } from "device/models"
import { modalTransitionDuration } from "generic-view/theme"
import { ImportContactsRefreshing } from "./import-contats-refreshing"

const messages = defineMessages({
  cancellationErrorTitle: {
    id: "module.genericViews.importContacts.cancellation.title",
  },
  cancellationErrorMessage: {
    id: "module.genericViews.importContacts.cancellation.message",
  },
  notEnoughSpace: {
    id: "module.genericViews.importContacts.failure.notEnoughSpace",
  },
})

const ImportContactsForm: FunctionComponent<ImportContactsConfig> = ({
  modalKey,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const importStatus = useSelector(importStatusSelector)
  const [frozenStatus, setFrozenStatus] = useState<ImportStatus | undefined>()
  const dataTransferError = useSelector(selectDataTransferErrorType)
  const importProcessError = useSelector(importContactsErrorSelector)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<CustomModalError>()
  const dataTransferAbortReference = useRef<VoidFunction>()
  const { watch } = useFormContext<{ [SELECTED_CONTACTS_FIELD]?: string[] }>()
  const selectedContacts = watch(SELECTED_CONTACTS_FIELD) || []
  const loadedContacts = useSelector(importContactsSelector)
  const dataTransferStatus = useSelector(selectDataTransferStatus)
  const deviceId = useSelector(selectActiveApiDeviceId)
  const contactsEntitiesInfo = useSelector((state: ReduxRootState) => {
    if (!deviceId) {
      return
    }
    return selectEntities(state, { deviceId, entitiesType: "contacts" })
  })

  const importError = importProcessError || dataTransferError
  const currentStatus = frozenStatus || importStatus
  const importInProgress =
    dataTransferStatus === "IN-PROGRESS" || dataTransferStatus === "FINALIZING"
  const closeButtonVisible =
    currentStatus !== "PENDING-AUTH" && !importInProgress && !refreshing

  const closeModal = () => {
    setFrozenStatus(importStatus)
    dispatch(closeModalAction({ key: modalKey }))
    dispatch(clearDataTransfer())
    dataTransferAbortReference.current?.()
    setTimeout(() => {
      setError(undefined)
      dispatch(cleanImportProcess())
    }, modalTransitionDuration)
  }

  const importCloseButtonAction: ButtonAction = {
    type: "custom",
    callback: closeModal,
  }

  const importConfirmButtonAction: ButtonAction = {
    type: "custom",
    callback: async () => {
      dispatch(setImportProcessStatus(ImportStatus.ImportIntoDeviceInProgress))

      const promise = dispatch(
        transferDataToDevice([
          {
            domain: "contacts-v1",
            data: loadedContacts?.filter((contact) => {
              return selectedContacts.includes(contact.id)
            }),
            entitiesType: "contacts",
          },
        ])
      ) as unknown as ReturnType<ReturnType<typeof transferDataToDevice>>

      dataTransferAbortReference.current = promise.abort

      const result = await promise
      setRefreshing(true)
      if (result.meta.requestStatus === "rejected") {
        dispatch(setImportProcessStatus(ImportStatus.Failed))
      } else {
        dispatch(setImportProcessStatus(ImportStatus.Done))
      }
    },
  }

  const importAbortButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setError({
        title: intl.formatMessage(messages.cancellationErrorTitle),
        message: intl.formatMessage(messages.cancellationErrorMessage),
      })
      dataTransferAbortReference.current?.()
    },
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
    if (refreshing && !contactsEntitiesInfo?.loading) {
      timeout = setTimeout(() => {
        setRefreshing(false)
      }, 500)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [contactsEntitiesInfo?.loading, refreshing])

  useEffect(() => {
    if (importError) {
      let message = ""

      if (importError === ApiFileTransferError.NotEnoughSpace) {
        message = intl.formatMessage(messages.notEnoughSpace)
      } else if (typeof importError === "string") {
        message = importError
      }

      if (message) {
        setError({
          message,
        })
      }
    }
  }, [importError])

  useEffect(() => {
    if (currentStatus === "AUTH") {
      dispatch(importContactsFromExternalSource())
    }
  }, [dispatch, currentStatus])

  useEffect(() => {
    dispatch(cleanImportProcess())
    return () => {
      dataTransferAbortReference.current?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {closeButtonVisible && (
        <Modal.CloseButton config={{ actions: [importCloseButtonAction] }} />
      )}
      {(currentStatus === undefined || currentStatus === "INIT") && (
        <ImportContactsProvider />
      )}
      {(currentStatus === "AUTH" ||
        currentStatus === "PENDING-AUTH" ||
        currentStatus === "FILE-SELECT") && (
        <>
          <ImportContactsProvider />
          <Modal.VisibilityController config={{ visible: false }} />
        </>
      )}
      {currentStatus === "IMPORT-INTO-MC-IN-PROGRESS" && (
        <ImportContactsLoader />
      )}
      {currentStatus === "IMPORT-INTO-MC-DONE" && (
        <ImportContactsList nextAction={importConfirmButtonAction} />
      )}
      {importInProgress && (
        <ImportContactsProgress cancelAction={importAbortButtonAction} />
      )}
      {refreshing && <ImportContactsRefreshing />}
      {!refreshing && currentStatus === "FAILED" && (
        <ImportContactsError
          closeAction={importCloseButtonAction}
          customError={error}
        />
      )}
      {!refreshing && currentStatus === "DONE" && (
        <ImportContactsSuccess closeAction={importCloseButtonAction} />
      )}
    </>
  )
}

export const ImportContacts: APIFC<undefined, ImportContactsConfig> = ({
  data,
  config,
  children,
  ...props
}) => {
  return (
    <Form
      {...props}
      config={{
        formOptions: {
          defaultValues: {
            [SELECTED_CONTACTS_FIELD]: [],
          },
        },
      }}
    >
      <ImportContactsForm {...config} />
    </Form>
  )
}
