/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState, useRef } from "react"
import { DeviceType, DiagnosticsFilePath } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import { useDispatch, useSelector } from "react-redux"
import delayResponse from "@appnroll/delay-response"
import { isEqual } from "lodash"
import modalService from "Renderer/components/core/modal/modal.service"
import {
  CheckingUpdatesModal,
  DevUpdate,
  DownloadingUpdateCancelledModal,
  DownloadingUpdateFinishedModal,
  DownloadingUpdateInterruptedModal,
  DownloadingUpdateModal,
  TooLowBatteryModal,
  UpdateAvailable,
  UpdateNotAvailable,
  UpdateServerError,
  UpdatingFailureWithHelpModal,
  UpdatingSpinnerModal,
  UpdatingSuccessModal,
} from "App/overview/components/overview-modals.component"
import getAllReleases from "Renderer/requests/get-all-releases.request"
import downloadOsUpdateRequest, {
  cancelOsDownload,
} from "Renderer/requests/download-os-update.request"
import { PureOsDownloadChannels } from "App/main/functions/register-pure-os-download-listener"
import {
  DownloadProgress,
  DownloadStatus,
} from "Renderer/interfaces/file-download.interface"
import osUpdateAlreadyDownloadedCheck from "Renderer/requests/os-update-already-downloaded.request"
import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"
import updateOs from "Renderer/requests/update-os.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import logger from "App/main/utils/logger"
import { Release } from "App/main/functions/register-get-all-releases-listener"
import appContextMenu from "Renderer/wrappers/app-context-menu"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import { setOsVersionData } from "App/device"
import { ReduxRootState } from "App/renderer/store"
import { removeFileRequest } from "App/device-file-system/requests"

const onOsDownloadCancel = () => {
  cancelOsDownload()
}

const useSystemUpdateFlow = (
  osVersion: string | undefined,
  onUpdate: (updateInfo: PhoneUpdate) => void,
  toggleDeviceUpdating: (option: boolean) => void,
  onContact: () => void,
  onHelp: () => void
) => {
  const currentDeviceType = useSelector(
    (state: ReduxRootState) => state.device.deviceType
  ) as DeviceType
  const batteryLevel = useSelector(
    (state: ReduxRootState) => state.device.data?.batteryLevel
  ) as number
  const [releaseToInstall, setReleaseToInstall] = useState<Release>()
  const dispatch = useDispatch()
  const mounted = useRef<boolean>(false)
  const enoughBattery = Math.round(batteryLevel * 100) <= 40

  useEffect(() => {
    mounted.current = true

    const downloadListener = (event: Event, progress: DownloadProgress) => {
      const { status, percent, speed, timeLeft } = progress
      if (status === DownloadStatus.Interrupted) {
        cancelOsDownload(true)
      }
      modalService.rerenderModal(
        <DownloadingUpdateModal
          percent={percent}
          speed={speed}
          timeLeft={timeLeft}
          onCancel={onOsDownloadCancel}
        />
      )
    }
    ipcRenderer.on(PureOsDownloadChannels.progress, downloadListener)
    return () => {
      mounted.current = false
      ipcRenderer.removeListener(
        PureOsDownloadChannels.progress,
        downloadListener
      )
    }
  }, [])

  // Developer mode
  const [devReleases, setDevReleases] = useState<Release[]>([])

  useEffect(() => {
    const unregisterItem = appContextMenu.registerItem("Overview", {
      label: "Select Pure OS version to update",
      submenu: devReleases.length
        ? devReleases.map((release) => {
            const { prerelease, version } = release
            return {
              label: `${prerelease ? "Beta" : "Stable"}: ${version}`,
              click: () => setReleaseToInstall({ ...release, devMode: true }),
            }
          })
        : [{ label: "No releases available" }],
    })
    return () => unregisterItem()
  }, [devReleases])

  useEffect(() => {
    if (releaseToInstall?.devMode) {
      ;(async () => {
        if (await osUpdateAlreadyDownloadedCheck(releaseToInstall.file)) {
          openDevModal(true)
        } else {
          openDevModal()
        }
      })()
    }
  }, [releaseToInstall])

  const openDevModal = async (install = false) => {
    const { date, version, prerelease } = releaseToInstall as Release
    const action = async () => {
      await modalService.closeModal()
      install ? updatePure(releaseToInstall) : downloadUpdate(releaseToInstall)
    }

    return modalService.openModal(
      <DevUpdate
        install={install}
        date={date}
        prerelease={prerelease}
        version={version}
        action={action}
      />,
      true
    )
  }

  // Checking for updates
  const openCheckingForUpdatesModal = () => {
    if (!mounted.current) {
      return
    }

    return modalService.openModal(<CheckingUpdatesModal />, true)
  }

  const openCheckingForUpdatesFailedModal = (onRetry: () => void) => {
    if (!mounted.current) {
      return
    }

    return modalService.openModal(<UpdateServerError onRetry={onRetry} />, true)
  }

  const openAvailableUpdateModal = (release: Release) => {
    if (!mounted.current) {
      return
    }

    const { version, date } = release
    const onDownload = () => {
      if (enoughBattery) {
        openTooLowBatteryModal()
        return
      }
      downloadUpdate(release)
      openDownloadingUpdateModal()
    }

    return modalService.openModal(
      <UpdateAvailable onDownload={onDownload} version={version} date={date} />,
      true
    )
  }

  const openNotAvailableUpdateModal = () => {
    if (!mounted.current) {
      return
    }

    return modalService.openModal(
      <UpdateNotAvailable version={osVersion} />,
      true
    )
  }

  const checkForUpdates = async (silent = false) => {
    if (!silent) {
      await delayResponse(openCheckingForUpdatesModal() as Promise<void>, 1000)
    }

    if (osVersion) {
      try {
        const { latestRelease, allReleases } = await getAllReleases(
          currentDeviceType
        )

        if (
          !silent &&
          latestRelease === undefined &&
          allReleases.length === 0
        ) {
          await openCheckingForUpdatesFailedModal(() => checkForUpdates())
          return
        }

        setDevReleases(allReleases)

        if (latestRelease) {
          setReleaseToInstall(latestRelease)
        }

        if (
          latestRelease &&
          !isVersionGreater(osVersion, latestRelease.version)
        ) {
          onUpdate({
            lastAvailableOsVersion: latestRelease.version,
            pureOsFileUrl: latestRelease.file.url,
          })

          if (await osUpdateAlreadyDownloadedCheck(latestRelease.file)) {
            onUpdate({ pureOsDownloaded: true })
          }

          if (!silent) {
            openAvailableUpdateModal(latestRelease)
          }
        } else {
          onUpdate({ lastAvailableOsVersion: latestRelease?.version })

          if (!silent) {
            openNotAvailableUpdateModal()
          }
        }
      } catch (error) {
        if (!silent) {
          await openCheckingForUpdatesFailedModal(() => checkForUpdates())
        }
        logger.error(
          `Overview: check for updates fail. Data: ${(error as Error).message}`
        )
      }
    }
  }

  // Download update
  const openDownloadSucceededModal = (release?: Release) => {
    if (!mounted.current) {
      return
    }

    return modalService.openModal(
      <DownloadingUpdateFinishedModal onOsUpdate={() => updatePure(release)} />,
      true
    )
  }

  const openDownloadCanceledModal = () => {
    if (!mounted.current) {
      return
    }

    return modalService.openModal(<DownloadingUpdateCancelledModal />, true)
  }

  const openDownloadInterruptedModal = (onRetry: () => void) => {
    if (!mounted.current) {
      return
    }

    return modalService.openModal(
      <DownloadingUpdateInterruptedModal onRetry={onRetry} />,
      true
    )
  }

  const openDownloadingUpdateModal = async () => {
    if (!mounted.current) {
      return
    }

    await modalService.openModal(
      <DownloadingUpdateModal onCancel={onOsDownloadCancel} />,
      true
    )
    modalService.preventClosingModal()
  }
  const openTooLowBatteryModal = () => {
    if (!mounted.current) {
      return
    }

    return modalService.openModal(<TooLowBatteryModal open />, true)
  }
  const downloadUpdate = async (releaseInstance?: Release) => {
    const release =
      releaseInstance === undefined || releaseInstance.version === undefined
        ? releaseToInstall
        : releaseInstance
    if (enoughBattery) {
      openTooLowBatteryModal()
      return
    }
    try {
      await openDownloadingUpdateModal()
      await delayResponse(
        downloadOsUpdateRequest({
          url: release?.file.url as string,
          fileName: release?.file.name as string,
        })
      )
      if (release?.devMode) {
        openDevModal(true)
      } else {
        onUpdate({ pureOsDownloaded: true })
        await openDownloadSucceededModal(release)
      }
    } catch (error) {
      if (error.status === DownloadStatus.Cancelled) {
        await openDownloadCanceledModal()
      } else {
        await openDownloadInterruptedModal(() => downloadUpdate(release))
      }
    }
  }

  // Install update
  const updatePure = async (releaseInstance?: Release) => {
    const release =
      releaseInstance === undefined || releaseInstance.version === undefined
        ? releaseToInstall
        : releaseInstance

    if (release === undefined) {
      displayErrorModal()
      return
    }

    if (enoughBattery) {
      openTooLowBatteryModal()
      return
    }

    const { file, version } = release

    modalService.openModal(<UpdatingSpinnerModal />, true)

    toggleDeviceUpdating(true)

    await removeFileRequest(DiagnosticsFilePath.UPDATER_LOG)
    const response = await updateOs(file.name)

    if (response.status === DeviceResponseStatus.Ok) {
      modalService.rerenderModal(<UpdatingSpinnerModal />)
    }

    toggleDeviceUpdating(false)

    if (!releaseToInstall?.devMode) {
      await onUpdate({
        pureOsFileUrl: "",
        pureOsDownloaded: false,
        lastAvailableOsVersion: undefined,
      })
    }

    if (
      !releaseToInstall?.devMode &&
      isEqual(response, { status: DeviceResponseStatus.Ok })
    ) {
      dispatch(
        setOsVersionData({
          osVersion: version,
          osUpdateDate: new Date().toISOString(),
        })
      )
    }

    if (isEqual(response, { status: DeviceResponseStatus.Ok })) {
      modalService.openModal(<UpdatingSuccessModal />, true)
    } else {
      logger.error(
        `Overview: updating pure fails. Message: ${response.error?.message}`
      )
      displayErrorModal()
    }
  }

  const callActionAfterCloseModal = <T extends unknown>(
    action: () => void
  ): (() => void) => {
    return () => {
      modalService.closeModal()
      action()
    }
  }

  const displayErrorModal = () => {
    modalService.openModal(
      <UpdatingFailureWithHelpModal
        onHelp={callActionAfterCloseModal(onHelp)}
        onContact={callActionAfterCloseModal(onContact)}
      />,
      true
    )
  }

  return {
    release: releaseToInstall,
    initialCheck: () => checkForUpdates(true),
    check: () => checkForUpdates(),
    download: downloadUpdate,
    install: updatePure,
  }
}

export default useSystemUpdateFlow
