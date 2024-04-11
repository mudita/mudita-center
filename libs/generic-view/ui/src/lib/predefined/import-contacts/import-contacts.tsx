/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC, ButtonAction } from "generic-view/utils"
import React, { useEffect, useState } from "react"
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
} from "generic-view/store"
import { ImportContactsProvider } from "./import-contacts-provider"
import { ImportContactsLoader } from "./import-contats-loader"
import { ImportContactsList } from "./import-contacts-list"
import { ImportContactsProgress } from "./import-contacts-progress"
import { ImportContactsSuccess } from "./import-contacts-success"
import { CustomError, ImportContactsError } from "./import-contacts-error"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"

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
  const [step, setStep] = useState<Step>(Step.Providers)
  const importStatus = useSelector(importStatusSelector)
  const [error, setError] = useState<CustomError>()

  const abortButtonVisible = step === Step.Progress
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
      // TODO: Implement import action
      setStep(Step.Progress)
    },
  }

  const backupAbortButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setError({
        title: intl.formatMessage(messages.cancellationErrorTitle),
        message: intl.formatMessage(messages.cancellationErrorMessage),
      })
      setStep(Step.Error)
      // TODO: Call action abort
    },
  }

  const onFinish = () => {
    setStep(Step.Success)
  }

  useEffect(() => {
    switch (importStatus) {
      case "AUTH":
        dispatch(importContactsFromExternalSource())
        setStep(Step.Loading)
        break
      case "PENDING-AUTH":
      case "IMPORT-INTO-MC-IN-PROGRESS":
        setStep(Step.Loading)
        break
      case "IMPORT-INTO-MC-DONE":
        setStep(Step.Loaded)
        break
      case "IMPORT-INTO-DEVICE-IN-PROGRESS":
        setStep(Step.Progress)
        break
      case "DONE":
        setStep(Step.Success)
        break
      case "FAILED":
        setStep(Step.Error)
        break
    }
  }, [dispatch, importStatus])

  return (
    <>
      {closeButtonVisible && (
        <Modal.CloseButton config={{ action: importCloseButtonAction }} />
      )}
      {abortButtonVisible && (
        <Modal.CloseButton config={{ action: backupAbortButtonAction }} />
      )}
      {step === Step.Providers && <ImportContactsProvider />}
      {step === Step.Loading && <ImportContactsLoader />}
      {step === Step.Loaded && (
        <ImportContactsList nextAction={importConfirmButtonAction} />
      )}
      {step === Step.Progress && <ImportContactsProgress onFinish={onFinish} />}
      {step === Step.Success && (
        <ImportContactsSuccess closeAction={importCloseButtonAction} />
      )}
      {step === Step.Error && (
        <ImportContactsError
          closeAction={importCloseButtonAction}
          customError={error}
        />
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
