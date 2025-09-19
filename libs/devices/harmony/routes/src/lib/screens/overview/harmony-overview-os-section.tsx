/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useState } from "react"
import { Badge, Button, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType } from "app-theme/models"
import { theme } from "app-theme/utils"
import styled from "styled-components"
import { defineMessages } from "app-localize/utils"
import { Harmony, HarmonyOSUpdateError } from "devices/harmony/models"
import {
  useHarmonyOsDownloadMutation,
  useHarmonyOsUpdateInfoQuery,
  useHarmonyOsUpdateMutation,
} from "devices/harmony/feature"
import { useQueryClient } from "@tanstack/react-query"
import { AnimatePresence, motion } from "motion/react"
import {
  HarmonyCheckingForUpdateModal,
  HarmonyUpdateAvailableModal,
  HarmonyUpdateCompleteModal,
  HarmonyUpdateDownloadedModal,
  HarmonyUpdateDownloadingModal,
  HarmonyUpdateErrorModal,
  HarmonyUpdateInstallingModal,
  HarmonyUpdateNotAvailableModal,
} from "devices/harmony/ui"
import { useAppDispatch } from "app-store/utils"
import { setContactSupportModalVisible } from "contact-support/feature"

const messages = defineMessages({
  versionLabel: {
    id: "harmony.overview.os.versionLabel",
  },
  versionText: {
    id: "harmony.overview.os.versionText",
  },
  updateCheckButton: {
    id: "harmony.overview.os.update.checkButton",
  },
  downloadNowButton: {
    id: "harmony.overview.os.update.downloadButton",
  },
  updateNowButton: {
    id: "harmony.overview.os.update.updateButton",
  },
  badgeUpdateAvailable: {
    id: "harmony.overview.os.badge.available",
  },
  badgeUpToDate: {
    id: "harmony.overview.os.badge.notAvailable",
  },
})

enum UpdateStatus {
  Idle,
  Checking,
  Available,
  NotAvailable,
  Downloading,
  Downloaded,
  Installing,
  Complete,
}

interface Props {
  device: Harmony
  currentVersion: string
  serialNumber?: string
  batteryLevel: number
}

export const HarmonyOverviewOsSection: FunctionComponent<Props> = ({
  device,
  currentVersion,
  serialNumber,
  batteryLevel,
}) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>(
    UpdateStatus.Idle
  )

  const {
    data: updateAvailability,
    refetch: checkForUpdates,
    isLoading: isUpdateCheckLoading,
  } = useHarmonyOsUpdateInfoQuery({
    device,
    currentVersion,
    serialNumber,
  })
  const {
    mutateAsync: downloadUpdates,
    abort: abortUpdatesDownload,
    progress: downloadingProgress,
    reset: resetDownloadMutation,
  } = useHarmonyOsDownloadMutation()
  const {
    mutateAsync: updateDevice,
    abort: abortDeviceUpdate,
    progress: deviceUpdateProgress,
    status: deviceUpdateStatus,
    currentStep: deviceUpdateStep,
    reset: resetUpdateMutation,
    requiredSpace,
  } = useHarmonyOsUpdateMutation(device)

  const [error, setError] = useState<HarmonyOSUpdateError>()

  const isUpdateAvailable =
    updateAvailability && updateAvailability.allFiles.length > 0
  const isDownloadRequired =
    isUpdateAvailable && updateAvailability.filesToDownload.length > 0

  const handleModalClose = useCallback(async () => {
    setUpdateStatus(UpdateStatus.Idle)
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), theme.app.constants.modalTransitionDuration)
    })
  }, [])

  const handleUpdateAvailabilityCheck = useCallback(async () => {
    void queryClient.resetQueries({
      queryKey: useHarmonyOsUpdateInfoQuery.queryKey(device.id),
    })
    setUpdateStatus(UpdateStatus.Checking)
    const response = await checkForUpdates()

    if (response.data && response.data.allFiles.length > 0) {
      setUpdateStatus(UpdateStatus.Available)
    } else if (response.error) {
      setError(response.error)
    } else {
      setUpdateStatus(UpdateStatus.NotAvailable)
    }
  }, [checkForUpdates, device.id, queryClient])

  const cancelUpdateAvailabilityCheck = useCallback(async () => {
    await queryClient.cancelQueries({
      queryKey: useHarmonyOsUpdateInfoQuery.queryKey(device.id),
    })
    void handleModalClose()
  }, [device.id, handleModalClose, queryClient])

  const handleUpdatesDownload = useCallback(async () => {
    if (!updateAvailability) {
      return
    }
    setUpdateStatus(UpdateStatus.Downloading)
    try {
      const data = await downloadUpdates(updateAvailability.filesToDownload)
      if (data === null) {
        return
      }
      await queryClient.refetchQueries({
        queryKey: useHarmonyOsUpdateInfoQuery.queryKey(device.id),
      })
      setUpdateStatus(UpdateStatus.Downloaded)
    } catch (error) {
      if (
        Object.values(HarmonyOSUpdateError).includes(
          error as HarmonyOSUpdateError
        )
      ) {
        setError(error as HarmonyOSUpdateError)
        return
      }
      setError(HarmonyOSUpdateError.DownloadFailed)
    }
  }, [device.id, downloadUpdates, queryClient, updateAvailability])

  const cancelUpdatesDownload = useCallback(() => {
    abortUpdatesDownload()
    void handleModalClose()
    void queryClient.refetchQueries({
      queryKey: useHarmonyOsUpdateInfoQuery.queryKey(device.id),
    })
  }, [abortUpdatesDownload, device.id, handleModalClose, queryClient])

  const handleUpdate = useCallback(async () => {
    if (!updateAvailability) {
      return
    }
    setUpdateStatus(UpdateStatus.Installing)
    if (batteryLevel < 5) {
      setError(HarmonyOSUpdateError.BatteryFlat)
      return
    }
    try {
      await updateDevice(updateAvailability.allFiles)
      setUpdateStatus(UpdateStatus.Complete)
    } catch (error) {
      if (
        Object.values(HarmonyOSUpdateError).includes(
          error as HarmonyOSUpdateError
        )
      ) {
        setError(error as HarmonyOSUpdateError)
        return
      }
      setError(HarmonyOSUpdateError.UpdateFailed)
    }
  }, [updateAvailability, batteryLevel, updateDevice])

  const handleFinalModalClose = useCallback(async () => {
    await handleModalClose()
    setError(undefined)
    void queryClient.cancelQueries({
      queryKey: useHarmonyOsUpdateInfoQuery.queryKey(device.id),
    })
    resetDownloadMutation()
    resetUpdateMutation()
  }, [
    device.id,
    handleModalClose,
    queryClient,
    resetDownloadMutation,
    resetUpdateMutation,
  ])

  const handleTryAgain = useCallback(async () => {
    await handleModalClose()

    if (error === HarmonyOSUpdateError.AvailabilityCheckFailed) {
      void handleUpdateAvailabilityCheck()
    }

    if (error === HarmonyOSUpdateError.DownloadFailed) {
      void handleUpdatesDownload()
    }

    setError(undefined)
  }, [
    handleModalClose,
    error,
    handleUpdateAvailabilityCheck,
    handleUpdatesDownload,
  ])

  const handleContactSupport = useCallback(() => {
    dispatch(setContactSupportModalVisible(true))
  }, [dispatch])

  const handleGoToHelp = useCallback(() => {
    // TODO: Implement navigation to help page if needed
  }, [])

  return (
    <Wrapper>
      <Info>
        <Typography.P3 message={messages.versionLabel.id} />
        <TextWrapper>
          <Typography.P1
            color={"black"}
            message={messages.versionText.id}
            values={{ version: currentVersion }}
          />
          <AnimatePresence initial={true}>
            {!isUpdateCheckLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isUpdateAvailable === true && (
                  <Badge message={messages.badgeUpdateAvailable.id} />
                )}
                {isUpdateAvailable === false && (
                  <Badge message={messages.badgeUpToDate.id} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </TextWrapper>
      </Info>
      <Button
        type={ButtonType.Primary}
        size={ButtonSize.Medium}
        message={
          isUpdateAvailable
            ? isDownloadRequired
              ? messages.downloadNowButton.id
              : messages.updateNowButton.id
            : messages.updateCheckButton.id
        }
        onClick={
          isUpdateAvailable
            ? isDownloadRequired
              ? handleUpdatesDownload
              : handleUpdate
            : handleUpdateAvailabilityCheck
        }
      />
      <HarmonyCheckingForUpdateModal
        opened={!error && updateStatus === UpdateStatus.Checking}
        onClose={cancelUpdateAvailabilityCheck}
      />
      <HarmonyUpdateNotAvailableModal
        opened={!error && updateStatus === UpdateStatus.NotAvailable}
        currentVersion={currentVersion}
        onClose={handleModalClose}
      />
      <HarmonyUpdateAvailableModal
        opened={!error && updateStatus === UpdateStatus.Available}
        newVersion={updateAvailability?.latestVersion || ""}
        downloadRequired={isDownloadRequired}
        onUpdate={handleUpdate}
        onDownload={handleUpdatesDownload}
        onClose={handleModalClose}
      />
      <HarmonyUpdateDownloadingModal
        opened={!error && updateStatus === UpdateStatus.Downloading}
        onCancel={cancelUpdatesDownload}
        progress={downloadingProgress}
      />
      <HarmonyUpdateDownloadedModal
        opened={!error && updateStatus === UpdateStatus.Downloaded}
        newVersion={updateAvailability?.latestVersion || ""}
        onUpdate={handleUpdate}
        onClose={handleModalClose}
      />
      <HarmonyUpdateInstallingModal
        opened={!error && updateStatus === UpdateStatus.Installing}
        progress={deviceUpdateProgress}
        totalSteps={updateAvailability?.allFiles.length}
        currentStep={deviceUpdateStep}
        status={deviceUpdateStatus}
        onCancel={abortDeviceUpdate}
      />
      <HarmonyUpdateCompleteModal
        opened={!error && updateStatus === UpdateStatus.Complete}
        onClose={handleFinalModalClose}
      />
      <HarmonyUpdateErrorModal
        opened={!!error && updateStatus !== UpdateStatus.Idle}
        error={error}
        currentVersion={currentVersion}
        requiredSpace={requiredSpace}
        onTryAgain={handleTryAgain}
        onContactSupport={handleContactSupport}
        onGoToHelp={handleGoToHelp}
        onClose={handleFinalModalClose}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.4rem;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`
