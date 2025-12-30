/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useState } from "react"
import {
  CreateBackupCancelledModal,
  CreateBackupCancellingModal,
  CreateBackupCompleteModal,
  CreateBackupFailedModal,
  CreateBackupIntroModal,
  CreateBackupPasswordModal,
  CreateBackupProgressModal,
} from "devices/api-device/ui"
import { ApiDevice, BackupSectionConfig } from "devices/api-device/models"
import { useApiDeviceBackupCreateMutation } from "devices/api-device/feature"
import { useActiveDeviceQuery } from "devices/common/feature"
import { AppFileSystem } from "app-utils/renderer"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  progressMessage: {
    id: "apiDevice.backup.progressModal.progressMessage",
  },
})

enum Step {
  Idle,
  Intro,
  Password,
  InProgress,
  Cancelling,
  Cancelled,
  Done,
  Error,
}

interface Props {
  active?: boolean
  onFinished?: VoidFunction
  features: NonNullable<BackupSectionConfig["backupFeatures"]>
}

export const CreateBackupFlow: FunctionComponent<Props> = ({
  active,
  features,
  onFinished,
}) => {
  const [step, setStep] = useState(active ? Step.Intro : Step.Idle)
  const [previousActive, setPreviousActive] = useState(active)
  const { data: activeDevice } = useActiveDeviceQuery<ApiDevice>()

  const onSuccess = useCallback(() => {
    setStep(Step.Done)
  }, [])

  const onError = useCallback((aborted?: boolean) => {
    setStep(aborted ? Step.Cancelled : Step.Error)
  }, [])

  const {
    mutate,
    progress,
    abort,
    data: backupDirectoryPath,
  } = useApiDeviceBackupCreateMutation(activeDevice, onSuccess, onError)

  const handleClose = useCallback(() => {
    setStep(Step.Idle)
    onFinished?.()
  }, [onFinished])

  const handleIntroConfirm = useCallback(() => {
    setStep(Step.Password)
  }, [])

  const handlePasswordConfirm = useCallback(
    async (password?: string) => {
      setStep(Step.InProgress)
      mutate({
        password,
        features: features.map(({ key }) => key),
      })
    },
    [features, mutate]
  )

  const handleAbort = useCallback(() => {
    setStep(Step.Cancelling)
  }, [])

  const handleAbortCancel = useCallback(() => {
    setStep(Step.InProgress)
  }, [])

  const handleBackupDirectoryOpen = useCallback(async () => {
    if (!backupDirectoryPath) {
      return
    }
    await AppFileSystem.openDirectory({ path: backupDirectoryPath })
  }, [backupDirectoryPath])

  if (previousActive !== active) {
    setPreviousActive(active)
    setStep(active ? Step.Intro : Step.Idle)
  }

  return (
    <>
      <CreateBackupIntroModal
        features={features}
        opened={step === Step.Intro}
        onClose={handleClose}
        onConfirm={handleIntroConfirm}
      />
      <CreateBackupPasswordModal
        opened={step === Step.Password}
        onClose={handleClose}
        onConfirm={handlePasswordConfirm}
      />
      <CreateBackupProgressModal
        opened={step === Step.InProgress}
        progress={{
          value: progress,
          message: formatMessage(messages.progressMessage),
        }}
        onClose={handleAbort}
      />
      <CreateBackupCancellingModal
        opened={step === Step.Cancelling}
        onBack={handleAbortCancel}
        onConfirm={abort}
      />
      <CreateBackupCancelledModal
        opened={step === Step.Cancelled}
        onClose={handleClose}
      />
      <CreateBackupFailedModal
        opened={step === Step.Error}
        onClose={handleClose}
      />
      <CreateBackupCompleteModal
        opened={step === Step.Done}
        onClose={handleClose}
        onBackupDirectoryOpen={handleBackupDirectoryOpen}
      />
    </>
  )
}
