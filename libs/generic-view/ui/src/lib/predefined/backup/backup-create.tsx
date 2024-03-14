/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { APIFC, ButtonAction } from "generic-view/utils"
import { withConfig } from "../../utils/with-config"
import { BackupFeatures, Feature } from "./backup-features"
import { BackupPassword } from "./backup-password"
import { useFormContext } from "react-hook-form"
import { BackupProgress } from "./backup-progress"
import { ModalCenteredContent, ModalCloseButton } from "../../interactive/modal"
import { BackupSuccess } from "./backup-success"
import { BackupError } from "./backup-error"
import { Form } from "../../interactive/form/form"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  cleanBackupProcess,
  closeModal as closeModalAction,
  createBackup,
  selectBackupProcessStatus,
} from "generic-view/store"

enum Step {
  Features,
  Password,
  Progress,
  Success,
  Error,
}

interface Config {
  features?: Feature[]
  modalKey?: string
}

const BackupCreateForm: FunctionComponent<Config> = ({
  features = [],
  modalKey,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const { handleSubmit } = useFormContext()
  const backupProcessStatus = useSelector(selectBackupProcessStatus)
  const backupAbortReference = useRef<VoidFunction>()
  const [step, setStep] = useState<Step>(Step.Features)

  const featuresKeys = features?.map((item) => item.key) ?? []
  const closeButtonVisible = [
    Step.Features,
    Step.Password,
    Step.Success,
  ].includes(step)
  const abortButtonVisible = step === Step.Progress

  const closeModal = () => {
    dispatch(closeModalAction({ key: modalKey! }))
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
      case "DONE":
        setStep(Step.Success)
        break
      case "FAILED":
        setStep(Step.Error)
        break
      case "PRE_BACKUP":
      case "FILES_TRANSFER":
      case "SAVE_FILE":
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
        <ModalCloseButton action={backupCloseButtonAction} />
      )}
      {abortButtonVisible && (
        <ModalCloseButton action={backupAbortButtonAction} />
      )}
      <ModalCenteredContent>
        {step === Step.Features && (
          <BackupFeatures
            features={features}
            closeAction={backupCloseButtonAction}
            nextAction={backupCreateButtonAction}
          />
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
          <BackupError closeAction={backupCloseButtonAction} />
        )}
      </ModalCenteredContent>
    </>
  )
}

export const BackupCreate: APIFC<undefined, Config> = ({
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

export default withConfig(BackupCreate)
