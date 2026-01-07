/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  ApiDevice,
  ApiDeviceBackupInfo,
  BackupFile,
  BackupFileDecrypted,
  BackupSectionConfig,
} from "devices/api-device/models"
import {
  checkBackupPassword,
  decryptBackupFeature,
  useApiDeviceBackupRestoreMutation,
} from "devices/api-device/feature"
import { useActiveDeviceQuery } from "devices/common/feature"
import { AppFileSystem } from "app-utils/renderer"
import {
  FeatureToSelect,
  RestoreBackupCancelledModal,
  RestoreBackupCancellingModal,
  RestoreBackupCompleteModal,
  RestoreBackupFailedModal,
  RestoreBackupFeaturesSelectModal,
  RestoreBackupFilesSelectModal,
  RestoreBackupPasswordModal,
  RestoreBackupProgressModal,
} from "devices/api-device/ui"
import { theme } from "app-theme/utils"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  progressMessage: {
    id: "apiDevice.restore.progressModal.progressMessage",
  },
})

enum Step {
  Idle,
  FileSelect,
  Password,
  FeaturesSelect,
  InProgress,
  Cancelling,
  Cancelled,
  Done,
  Error,
}

interface Props {
  active?: boolean
  onFinished?: VoidFunction
  features: NonNullable<BackupSectionConfig["restoreFeatures"]>
  backups?: ApiDeviceBackupInfo[]
}

export const RestoreBackupFlow: FunctionComponent<Props> = ({
  active,
  features,
  backups = [],
  onFinished,
}) => {
  const [step, setStep] = useState(active ? Step.FileSelect : Step.Idle)
  const [previousActive, setPreviousActive] = useState(active)
  const { data: activeDevice } = useActiveDeviceQuery<ApiDevice>()
  const [backupFile, setBackupFile] = useState<BackupFile>()
  const [decryptedBackupFile, setDecryptedBackupFile] =
    useState<BackupFileDecrypted>()
  const [password, setPassword] = useState<string>()

  const onSuccess = useCallback(() => {
    setStep(Step.Done)
  }, [])

  const onError = useCallback((aborted?: boolean) => {
    setStep(aborted ? Step.Cancelled : Step.Error)
  }, [])

  const { mutate, progress, abort } = useApiDeviceBackupRestoreMutation(
    activeDevice,
    onSuccess,
    onError
  )

  const featuresToSelect = useMemo(() => {
    if (!decryptedBackupFile) {
      return []
    }
    return features
      .map(({ feature, label, keys }) => {
        const featureKey = [feature, ...keys].find(
          (key) => key in decryptedBackupFile.data
        )
        if (!featureKey) {
          return null
        }
        return {
          feature,
          label,
          key: featureKey,
          itemsCount: decryptedBackupFile.data[featureKey]?.data.length || 0,
        }
      })
      .filter(Boolean) as FeatureToSelect[]
  }, [decryptedBackupFile, features])

  const clearData = useCallback(() => {
    setTimeout(() => {
      setBackupFile(undefined)
      setDecryptedBackupFile(undefined)
      setPassword(undefined)
    }, theme.app.constants.modalTransitionDuration)
  }, [])

  const handleClose = useCallback(() => {
    setStep(Step.Idle)
    clearData()
    onFinished?.()
  }, [clearData, onFinished])

  const handlePasswordClose = useCallback(() => {
    setStep(Step.FileSelect)
    clearData()
  }, [clearData])

  const decryptBackupData = useCallback(() => {
    if (!backupFile) {
      return
    }
    const decryptedData = Object.entries(backupFile.data).reduce(
      (acc, [feature, data]) => {
        acc[feature] = decryptBackupFeature({
          password,
          header: backupFile.header,
          data,
        })
        return acc
      },
      {} as BackupFileDecrypted["data"]
    )
    setBackupFile(undefined)
    setDecryptedBackupFile({ header: backupFile.header, data: decryptedData })
  }, [backupFile, password])

  const handleFileSelectConfirm = useCallback(
    async (backupInfo: ApiDeviceBackupInfo) => {
      const backupFileResponse = await AppFileSystem.readFile({
        fileAbsolutePath: backupInfo.path,
        absolute: true,
      })
      if (!backupFileResponse.ok) {
        setStep(Step.Error)
        return
      }
      try {
        const file = JSON.parse(backupFileResponse.data) as BackupFile
        setBackupFile(file)

        if ("password" in file.header) {
          setStep(Step.Password)
          return
        }
        setStep(Step.FeaturesSelect)
      } catch {
        setStep(Step.Error)
        return
      }
    },
    []
  )

  const handlePasswordConfirm = useCallback(
    (password?: string) => {
      if (!backupFile) {
        return false
      }
      const passwordMatches = checkBackupPassword({
        header: backupFile.header,
        password,
      })
      if (passwordMatches) {
        setPassword(password)
        setStep(Step.FeaturesSelect)
      }
      return passwordMatches
    },
    [backupFile]
  )

  const handleFeaturesSelectConfirm = useCallback(
    (selectedFeatures: FeatureToSelect["feature"][]) => {
      if (!decryptedBackupFile) {
        return
      }
      const featuresToRestore = featuresToSelect
        .filter(({ feature }) => selectedFeatures.includes(feature))
        .flatMap(({ feature, key }) => {
          return {
            feature,
            key,
            data: decryptedBackupFile.data[key],
          }
        })

      setStep(Step.InProgress)
      mutate({ features: featuresToRestore })
      clearData()
    },
    [clearData, decryptedBackupFile, featuresToSelect, mutate]
  )

  const handleFeaturesSelectBack = useCallback(() => {
    setStep(Step.FileSelect)
    clearData()
  }, [clearData])

  const handleAbort = useCallback(() => {
    setStep(Step.Cancelling)
  }, [])

  const handleAbortCancel = useCallback(() => {
    setStep(Step.InProgress)
  }, [])

  if (previousActive !== active) {
    setPreviousActive(active)
    setStep(active ? Step.FileSelect : Step.Idle)
  }

  useEffect(() => {
    if (backupFile) {
      if (
        ("password" in backupFile.header && password) ||
        !("password" in backupFile.header)
      ) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        decryptBackupData()
      }
    }
  }, [backupFile, decryptBackupData, password])

  return (
    <>
      <RestoreBackupFilesSelectModal
        opened={step === Step.FileSelect}
        backups={backups}
        onClose={handleClose}
        onConfirm={handleFileSelectConfirm}
      />
      <RestoreBackupPasswordModal
        opened={step === Step.Password}
        onClose={handlePasswordClose}
        onConfirm={handlePasswordConfirm}
      />
      <RestoreBackupFeaturesSelectModal
        opened={step === Step.FeaturesSelect}
        features={featuresToSelect}
        onClose={handleClose}
        onBack={handleFeaturesSelectBack}
        onConfirm={handleFeaturesSelectConfirm}
      />
      <RestoreBackupProgressModal
        opened={step === Step.InProgress}
        progress={{
          value: progress,
          message: formatMessage(messages.progressMessage),
        }}
        onClose={handleAbort}
      />
      <RestoreBackupCancellingModal
        opened={step === Step.Cancelling}
        onBack={handleAbortCancel}
        onConfirm={abort}
      />
      <RestoreBackupCancelledModal
        opened={step === Step.Cancelled}
        onClose={handleClose}
      />
      <RestoreBackupCompleteModal
        opened={step === Step.Done}
        onClose={handleClose}
      />
      <RestoreBackupFailedModal
        opened={step === Step.Error}
        onClose={handleClose}
      />
    </>
  )
}
