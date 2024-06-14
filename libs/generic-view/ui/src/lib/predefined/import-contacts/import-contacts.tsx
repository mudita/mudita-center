/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC, ButtonAction, CustomModalError } from "generic-view/utils"
import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { Form } from "../../interactive/form/form"
import { Modal } from "../../interactive/modal"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  cleanImportProcess,
  closeModal as closeModalAction,
  importContactsErrorSelector,
  importContactsFromExternalSource,
  ImportStatus,
  importStatusSelector,
  startContactsImportToDevice,
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
import { ImportContactsConfig } from "generic-view/models"

const messages = defineMessages({
  cancellationErrorTitle: {
    id: "module.genericViews.importContacts.cancellation.title",
  },
  cancellationErrorMessage: {
    id: "module.genericViews.importContacts.cancellation.message",
  },
})

const ImportContactsForm: FunctionComponent<ImportContactsConfig> = ({
  modalKey,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const importStatus = useSelector(importStatusSelector)
  const [freezedStatus, setFreezedStatus] = useState<ImportStatus | undefined>()
  const importError = useSelector(importContactsErrorSelector)
  const [error, setError] = useState<CustomModalError>()
  const dataTransferAbortReference = useRef<VoidFunction>()
  const { watch } = useFormContext<{ [SELECTED_CONTACTS_FIELD]?: string[] }>()
  const selectedContacts = watch(SELECTED_CONTACTS_FIELD) || []

  const currentStatus = freezedStatus || importStatus
  const abortButtonVisible =
    currentStatus === "IMPORT-INTO-DEVICE-IN-PROGRESS" ||
    currentStatus === "IMPORT-INTO-DEVICE-FILES-TRANSFER" ||
    currentStatus === "IMPORT-DEVICE-DATA-TRANSFER"
  const closeButtonVisible =
    currentStatus !== "PENDING-AUTH" && !abortButtonVisible

  const closeModal = () => {
    setFreezedStatus(importStatus)
    dispatch(closeModalAction({ key: modalKey }))
    dispatch(cleanImportProcess())
  }

  const importCloseButtonAction: ButtonAction = {
    type: "custom",
    callback: closeModal,
  }

  const importConfirmButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      const promise = dispatch(
        startContactsImportToDevice(selectedContacts)
      )

      dataTransferAbortReference.current = (
        promise as unknown as {
          abort: VoidFunction
        }
      ).abort
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
    if (importError) {
      setError({
        message: importError,
      })
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
        <Modal.CloseButton config={{ action: importCloseButtonAction }} />
      )}
      {abortButtonVisible && (
        <Modal.CloseButton config={{ action: importAbortButtonAction }} />
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
      {(currentStatus === "IMPORT-INTO-DEVICE-IN-PROGRESS" ||
        currentStatus === "IMPORT-INTO-DEVICE-FILES-TRANSFER" ||
        currentStatus === "IMPORT-DEVICE-DATA-TRANSFER") && (
        <ImportContactsProgress />
      )}
      {currentStatus === "FAILED" && (
        <ImportContactsError
          closeAction={importCloseButtonAction}
          customError={error}
        />
      )}
      {currentStatus === "DONE" && (
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
    <Form {...props}>
      <ImportContactsForm {...config} />
    </Form>
  )
}
