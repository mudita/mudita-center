/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useRef, useState } from "react"
import { APIFC, ButtonAction } from "generic-view/utils"
import { withConfig } from "../../utils/with-config"
import { BackupFeatures, Feature } from "./backup-features"
import { BackupPassword } from "./backup-password"
import { useFormContext } from "react-hook-form"
import { BackupProgress } from "./backup-progress"
import { ModalCenteredContent, ModalCloseButton } from "../../interactive/modal"
import { BackupSuccess } from "./backup-success"
import { BackupFailure } from "./backup-failure"
import { Form } from "../../interactive/form/form"
import { useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  cleanBackupProcess,
  createBackup as createBackupAction,
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
  features,
  modalKey,
}) => {
  const backupProcess = useRef<{ abort: VoidFunction }>()
  const dispatch = useDispatch<Dispatch>()
  const { handleSubmit } = useFormContext()
  const [step, setStep] = useState<Step>(Step.Features)

  const modalCloseAction: ButtonAction = {
    type: "close-modal",
    modalKey: modalKey!,
  }

  const backupCancelAction: ButtonAction = {
    type: "custom",
    callback: () => {
      backupProcess.current?.abort()
      setStep(Step.Error)
    },
  }

  const featuresKeys = features?.map((item) => item.key) ?? []

  const createBackup: ButtonAction = {
    type: "custom",
    callback: () => {
      dispatch(cleanBackupProcess())
      setStep(Step.Password)
    },
  }

  const skipPassword: ButtonAction = {
    type: "custom",
    callback: () => {
      handleSubmit(async () => {
        const promise = dispatch(
          createBackupAction({
            features: featuresKeys,
          })
        )
        backupProcess.current = promise as unknown as {
          abort: (reason?: string) => void
        }
      })()
      setStep(Step.Progress)
    },
  }

  const confirmPassword: ButtonAction = {
    type: "custom",
    callback: () => {
      handleSubmit((data) => {
        const promise = dispatch(
          createBackupAction({
            features: featuresKeys,
            password: data.password,
          })
        )
        backupProcess.current = promise as unknown as {
          abort: (reason?: string) => void
        }
      })()
      setStep(Step.Progress)
    },
  }

  const onSuccess = () => {
    setStep(Step.Success)
  }

  const onFail = () => {
    setStep(Step.Error)
  }

  const showCloseButton = [Step.Features, Step.Password, Step.Success].includes(
    step
  )

  const showCancelButton = step === Step.Progress

  return (
    <>
      {showCloseButton && <ModalCloseButton action={modalCloseAction} />}
      {showCancelButton && <ModalCloseButton action={backupCancelAction} />}
      <ModalCenteredContent>
        {step === Step.Features && (
          <BackupFeatures
            features={features || []}
            closeAction={modalCloseAction}
            nextAction={createBackup}
          />
        )}
        {step === Step.Password && (
          <BackupPassword
            skipAction={skipPassword}
            nextAction={confirmPassword}
          />
        )}
        {step === Step.Progress && (
          <BackupProgress
            features={features || []}
            onSuccess={onSuccess}
            onFail={onFail}
          />
        )}
        {step === Step.Success && <BackupSuccess modalKey={modalKey!} />}
        {step === Step.Error && <BackupFailure modalKey={modalKey!} />}
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
