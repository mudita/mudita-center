/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC, CustomModalError } from "generic-view/utils"
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
  startImportToDevice,
  useFormField,
} from "generic-view/store"
import { ImportContactsProvider } from "./import-contacts-provider"
import { ImportContactsLoader } from "./import-contats-loader"
import {
  ImportContactsList, SEARCH_FIELD,
  SELECTED_CONTACTS_FIELD,
} from "./import-contacts-list"
import { ImportContactsProgress } from "./import-contacts-progress"
import { ImportContactsSuccess } from "./import-contacts-success"
import { ImportContactsError } from "./import-contacts-error"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { ButtonAction, ImportContactsConfig } from "generic-view/models"
import { ApiFileTransferError } from "device/models"

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

const ImportContactsForm: FunctionComponent<
  ImportContactsConfig & { formName: string }
> = ({ modalKey, formName }) => {
  const dispatch = useDispatch<Dispatch>()
  const importStatus = useSelector(importStatusSelector)
  const [freezedStatus, setFreezedStatus] = useState<ImportStatus | undefined>()
  const importError = useSelector(importContactsErrorSelector)
  const [error, setError] = useState<CustomModalError>()
  const dataTransferAbortReference = useRef<VoidFunction>()
  const { getField } = useFormField({ formName })

  const selectedContacts = getField(SELECTED_CONTACTS_FIELD) as string[]

  const currentStatus = freezedStatus || importStatus
  const importInProgress =
    currentStatus === "IMPORT-INTO-DEVICE-IN-PROGRESS" ||
    currentStatus === "IMPORT-INTO-DEVICE-FILES-TRANSFER" ||
    currentStatus === "IMPORT-DEVICE-DATA-TRANSFER"
  const closeButtonVisible =
    currentStatus !== "PENDING-AUTH" && !importInProgress

  const closeModal = () => {
    setFreezedStatus(importStatus)
    dispatch(closeModalAction({ key: modalKey }))
    dispatch(cleanImportProcess())
    setError(undefined)
  }

  const importCloseButtonAction: ButtonAction = {
    type: "custom",
    callback: closeModal,
  }

  const importConfirmButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      const promise = dispatch(
        startImportToDevice({
          domains: ["contacts-v1"],
          contactsIds: selectedContacts,
        })
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
      let message = importError
      if (importError === ApiFileTransferError.NotEnoughSpace) {
        message = intl.formatMessage(messages.notEnoughSpace)
      }
      setError({
        message: message as string,
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
        <ImportContactsList
          nextAction={importConfirmButtonAction}
          formName={formName}
        />
      )}
      {importInProgress && (
        <ImportContactsProgress cancelAction={importAbortButtonAction} />
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
    <Form
      {...props}
      config={{
        defaultFields: {
          [SELECTED_CONTACTS_FIELD]: [],
          [SEARCH_FIELD]: "",
        },
      }}
    >
      <ImportContactsForm {...config} formName={props.componentKey!} />
    </Form>
  )
}
