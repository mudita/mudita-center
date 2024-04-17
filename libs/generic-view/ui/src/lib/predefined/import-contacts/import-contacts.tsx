/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC, ButtonAction, CustomModalError } from "generic-view/utils"
import React, { useEffect, useRef, useState } from "react"
import { withConfig } from "../../utils/with-config"
import { Form } from "../../interactive/form/form"
import { Modal } from "../../interactive/modal"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  cleanImportProcess,
  closeModal as closeModalAction,
  importContactsFromExternalSource,
  importStatusSelector,
  startDataTransferToDevice,
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

const messages = defineMessages({
  cancellationErrorTitle: {
    id: "module.genericViews.importContacts.cancellation.title",
  },
  cancellationErrorMessage: {
    id: "module.genericViews.importContacts.cancellation.message",
  },
})

enum Step {
  Providers,
  Loading,
  Loaded,
  Progress,
  Success,
  Error,
}

interface Config {
  modalKey?: string
}

const ImportContactsForm: React.FC<Config> = ({ modalKey }) => {
  const dispatch = useDispatch<Dispatch>()
  const importStatus = useSelector(importStatusSelector)
  const [error, setError] = useState<CustomModalError>()
  const dataTransferAbortReference = useRef<VoidFunction>()
  const { watch } = useFormContext<{ [SELECTED_CONTACTS_FIELD]?: string[] }>()
  const selectedContacts = watch(SELECTED_CONTACTS_FIELD) || []

  const abortButtonVisible =
    importStatus === "IMPORT-INTO-DEVICE-IN-PROGRESS" ||
    importStatus === "IMPORT-INTO-DEVICE-FILES-TRANSFER" ||
    importStatus === "IMPORT-DEVICE-DATA-TRANSFER"
  const closeButtonVisible =
    importStatus !== "PENDING-AUTH" && !abortButtonVisible

  const closeModal = () => {
    dispatch(closeModalAction({ key: modalKey! }))
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
        startDataTransferToDevice({
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

  const backupAbortButtonAction: ButtonAction = {
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
    if (importStatus === "AUTH") {
      dispatch(importContactsFromExternalSource())
    }
  }, [dispatch, importStatus])

  useEffect(() => {
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
        <Modal.CloseButton config={{ action: backupAbortButtonAction }} />
      )}

      {importStatus === undefined && <ImportContactsProvider />}
      {(importStatus === "AUTH" ||
        importStatus === "PENDING-AUTH" ||
        importStatus === "IMPORT-INTO-MC-IN-PROGRESS") && (
        <ImportContactsLoader />
      )}
      {importStatus === "IMPORT-INTO-MC-DONE" && (
        <ImportContactsList nextAction={importConfirmButtonAction} />
      )}
      {(importStatus === "IMPORT-INTO-DEVICE-IN-PROGRESS" ||
        importStatus === "IMPORT-INTO-DEVICE-FILES-TRANSFER" ||
        importStatus === "IMPORT-DEVICE-DATA-TRANSFER") && (
        <ImportContactsProgress />
      )}
      {importStatus === "FAILED" && (
        <ImportContactsError
          closeAction={importCloseButtonAction}
          customError={error}
        />
      )}
      {importStatus === "DONE" && (
        <ImportContactsSuccess closeAction={importCloseButtonAction} />
      )}
    </>
  )
}

export const ImportContacts: APIFC<undefined, Config> = ({
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

export default withConfig(ImportContacts)
