/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { APIFC, CustomModalError } from "generic-view/utils"
import { BackupFeatures } from "./backup-features"
import { BackupPassword } from "./backup-password"
import { useFormContext } from "react-hook-form"
import { BackupProgress } from "./backup-progress"
import { Modal } from "../../interactive/modal"
import { BackupSuccess } from "./backup-success"
import { BackupError } from "./backup-error"
import { Form } from "../../interactive/form/form"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  BackupProcessStatus,
  cleanBackupProcess,
  closeModal as closeModalAction,
  createBackup,
  selectBackupProcessStatus,
} from "generic-view/store"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { BackupCreateConfig, ButtonAction } from "generic-view/models"

const messages = defineMessages({
  cancellationErrorTitle: {
    id: "module.genericViews.backup.cancellation.title",
  },
  cancellationErrorMessage: {
    id: "module.genericViews.backup.cancellation.message",
  },
})

enum Step {
  Features,
  Password,
  Progress,
  Success,
  Error,
}

const BackupCreateForm: FunctionComponent<BackupCreateConfig> = ({
  features,
  modalKey,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const { handleSubmit } = useFormContext()
  const backupProcessStatus = useSelector(selectBackupProcessStatus)
  const backupAbortReference = useRef<VoidFunction>()
  const [step, setStep] = useState<Step>(Step.Features)
  const [error, setError] = useState<CustomModalError>()

  const featuresKeys = features.map((item) => item.key) ?? []
  const closeButtonVisible = [
    Step.Features,
    Step.Password,
    Step.Success,
  ].includes(step)
  const abortButtonVisible = step === Step.Progress

  const closeModal = () => {
    dispatch(closeModalAction({ key: modalKey }))
    dispatch(cleanBackupProcess())
  }

  const startBackup = (password?: string) => {
    const promise = dispatch(
      createBackup({
        features: featuresKeys,
        password,
      })
    )
    backupAbortReference.current = (
      promise as unknown as {
        abort: VoidFunction
      }
    ).abort
  }

  const backupCloseButtonAction: ButtonAction = {
    type: "custom",
    callback: closeModal,
  }

  const backupAbortButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setError({
        title: intl.formatMessage(messages.cancellationErrorTitle),
        message: intl.formatMessage(messages.cancellationErrorMessage),
      })
      backupAbortReference.current?.()
    },
  }

  const backupCreateButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      dispatch(cleanBackupProcess())
      setStep(Step.Password)
    },
  }

  const passwordSkipButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      handleSubmit(() => {
        startBackup()
      })()
    },
  }

  const passwordConfirmButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      handleSubmit((data) => {
        startBackup(data.password)
      })()
    },
  }

  useEffect(() => {
    switch (backupProcessStatus) {
      case BackupProcessStatus.DONE:
        setStep(Step.Success)
        break
      case BackupProcessStatus.FAILED:
        setStep(Step.Error)
        break
      case BackupProcessStatus.PRE_BACKUP:
      case BackupProcessStatus.FILES_TRANSFER:
      case BackupProcessStatus.SAVE_FILE:
        setStep(Step.Progress)
        break
    }
  }, [backupProcessStatus])

  useEffect(() => {
    return () => {
      backupAbortReference.current?.()
    }
  }, [])

  return (
    <>
      {closeButtonVisible && (
        <Modal.CloseButton config={{ actions: [backupCloseButtonAction] }} />
      )}
      {abortButtonVisible && (
        <Modal.CloseButton config={{ actions: [backupAbortButtonAction] }} />
      )}
      {step === Step.Features && (
        <>
          <BackupFeatures
            features={features}
            closeAction={backupCloseButtonAction}
            nextAction={backupCreateButtonAction}
          />
          <Modal.SizeController config={{ size: "medium" }} />
        </>
      )}
      {step === Step.Password && (
        <BackupPassword
          skipAction={passwordSkipButtonAction}
          nextAction={passwordConfirmButtonAction}
        />
      )}
      {step === Step.Progress && <BackupProgress features={features} />}
      {step === Step.Success && (
        <BackupSuccess onClose={backupCloseButtonAction.callback} />
      )}
      {step === Step.Error && (
        <BackupError
          closeAction={backupCloseButtonAction}
          customError={error}
        />
      )}
    </>
  )
}

export const BackupCreate: APIFC<undefined, BackupCreateConfig> = ({
  data,
  config,
  children,
  ...props
}) => {
  return (
    <Form {...props}>
      <BackupCreateForm {...config} />
    </Form>
  )
}
