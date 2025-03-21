/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { APIFC, CustomModalError } from "generic-view/utils"
import { Form } from "../../interactive/form/form"
import { Modal } from "../../interactive/modal"
import {
  cleanRestoreProcess,
  closeModal as closeModalAction,
  loadBackupMetadata,
  restoreBackup,
  RestoreProcessStatus,
  selectBackupRestoreStatus,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { BackupRestoreSelect } from "./backup-restore-select"
import { useFormContext } from "react-hook-form"
import { BackupRestorePassword } from "./backup-restore-password"
import { BackupRestoreProgress } from "./backup-restore-progress"
import { BackupRestoreSuccess } from "./backup-restore-success"
import { BackupRestoreError } from "./backup-restore-error"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { BackupRestoreConfig, ButtonAction } from "generic-view/models"

const messages = defineMessages({
  cancellationErrorTitle: {
    id: "module.genericViews.restore.cancellation.title",
  },
  cancellationErrorMessage: {
    id: "module.genericViews.restore.cancellation.message",
  },
})

enum Step {
  Select,
  Password,
  Progress,
  Success,
  Error,
}

export const BackupRestoreForm: FunctionComponent<BackupRestoreConfig> = ({
  features,
  modalKey,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const { handleSubmit, getValues } = useFormContext()
  const restoreAbortReference = useRef<VoidFunction>()
  const restoreStatus = useSelector(selectBackupRestoreStatus)
  const [error, setError] = useState<CustomModalError>()

  const [step, setStep] = useState<Step>(Step.Select)
  const closeButtonVisible = [
    Step.Select,
    Step.Password,
    Step.Success,
  ].includes(step)
  const abortButtonVisible = step === Step.Progress

  const closeModal = () => {
    dispatch(closeModalAction({ key: modalKey }))
    dispatch(cleanRestoreProcess())
  }

  const startRestore = (password?: string) => {
    const promise = dispatch(restoreBackup({ features, password }))
    restoreAbortReference.current = (
      promise as unknown as {
        abort: VoidFunction
      }
    ).abort
  }

  const restoreCloseButtonAction: ButtonAction = {
    type: "custom",
    callback: closeModal,
  }

  const abortButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setError({
        title: intl.formatMessage(messages.cancellationErrorTitle),
        message: intl.formatMessage(messages.cancellationErrorMessage),
      })
      restoreAbortReference.current?.()
    },
  }

  const selectionConfirmButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      dispatch(loadBackupMetadata({ filePath: getValues("file") }))
    },
  }

  const confirmAction: ButtonAction = {
    type: "custom",
    callback: () => {
      handleSubmit((data) => {
        startRestore(data.password)
      })()
    },
  }

  useEffect(() => {
    return () => {
      restoreAbortReference.current?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    switch (restoreStatus) {
      case RestoreProcessStatus.PasswordNotRequired:
        startRestore()
        break
      case RestoreProcessStatus.PasswordRequired:
        setStep(Step.Password)
        break
      case RestoreProcessStatus.Failed:
        setStep(Step.Error)
        break
      case RestoreProcessStatus.Done:
        setStep(Step.Success)
        break
      case RestoreProcessStatus.PreRestore:
      case RestoreProcessStatus.FilesTransfer:
      case RestoreProcessStatus.Restoring:
        setStep(Step.Progress)
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restoreStatus])

  return (
    <>
      {closeButtonVisible && (
        <Modal.CloseButton config={{ actions: [restoreCloseButtonAction] }} />
      )}
      {abortButtonVisible && (
        <Modal.CloseButton config={{ actions: [abortButtonAction] }} />
      )}
      {step === Step.Select && (
        <BackupRestoreSelect
          closeAction={restoreCloseButtonAction}
          nextAction={selectionConfirmButtonAction}
        />
      )}
      {step === Step.Password && (
        <BackupRestorePassword nextAction={confirmAction} />
      )}
      {step === Step.Progress && <BackupRestoreProgress features={features!} />}
      {step === Step.Success && (
        <BackupRestoreSuccess onClose={restoreCloseButtonAction.callback} />
      )}
      {step === Step.Error && (
        <BackupRestoreError
          closeAction={restoreCloseButtonAction}
          customError={error}
        />
      )}
    </>
  )
}

export const BackupRestore: APIFC<undefined, BackupRestoreConfig> = ({
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
          mode: "onSubmit",
          reValidateMode: "onSubmit",
        },
      }}
    >
      <BackupRestoreForm {...config} />
    </Form>
  )
}
