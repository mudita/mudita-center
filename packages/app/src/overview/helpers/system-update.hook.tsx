/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useRef, useState } from "react"
import { DeviceType, DiagnosticsFilePath } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import { useDispatch, useSelector } from "react-redux"
import delayResponse from "@appnroll/delay-response"
import { isEqual } from "lodash"
import modalService from "App/__deprecated__/renderer/components/core/modal/modal.service"
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
import { PureOsDownloadChannels } from "App/__deprecated__/main/functions/register-pure-os-download-listener"
import {
  DownloadProgress,
  DownloadStatus,
} from "App/__deprecated__/renderer/interfaces/file-download.interface"
import { PhoneUpdate } from "App/__deprecated__/renderer/models/phone-update/phone-update.interface"
import updateOs from "App/__deprecated__/renderer/requests/update-os.request"
import logger from "App/__deprecated__/main/utils/logger"
import {
  cancelOsDownload,
  downloadOsUpdateRequest,
  getLatestReleaseRequest,
  osUpdateAlreadyDownloadedCheck,
  Release,
} from "App/__deprecated__/update"
import appContextMenu from "App/__deprecated__/renderer/wrappers/app-context-menu"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import { setOsVersionData } from "App/device"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { removeFileRequest } from "App/device-file-system/requests"
import {
  trackOsVersion,
  TrackOsVersionOptions,
  trackOsUpdate,
  TrackOsUpdateState,
} from "App/analytic-data-tracker/helpers"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { getAllReleasesRequest } from "App/__deprecated__/update/requests/get-all-releases.request"

const onOsDownloadCancel = () => {
  cancelOsDownload()
}

type useSystemUpdateFlowOption = TrackOsVersionOptions

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSystemUpdateFlow = (
  options: useSystemUpdateFlowOption,
  onUpdate: (updateInfo: PhoneUpdate) => void,
  toggleDeviceUpdating: (option: boolean) => void,
  onContact: () => void,
  onHelp: () => void
) => {
  const { osVersion } = options
  const currentDeviceType = useSelector(
    (state: ReduxRootState) => state.device.deviceType
  ) as DeviceType
  const batteryLevel = useSelector(
    (state: ReduxRootState) => state.device.data?.batteryLevel
  ) as number
  const [releaseToInstall, setReleaseToInstall] = useState<Release>()
  const dispatch = useDispatch()
  const mounted = useRef<boolean>(false)
  const minBattery = 40
  const notEnoughBattery = Math.round(batteryLevel * 100) <= minBattery

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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return () => unregisterItem()
  }, [devReleases])

  useEffect(() => {
    if (releaseToInstall?.devMode) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      ;(async () => {
        if (await osUpdateAlreadyDownloadedCheck(releaseToInstall.file)) {
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          openDevModal(true)
        } else {
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          openDevModal()
        }
      })()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releaseToInstall])

  const openDevModal = async (install = false) => {
    const { date, version, prerelease } = releaseToInstall as Release
    const action = async () => {
      await modalService.closeModal()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
      if (notEnoughBattery) {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        openTooLowBatteryModal()
        return
      }
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      downloadUpdate(release)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
        const latestRelease = await getLatestReleaseRequest(currentDeviceType)

        if (!silent && latestRelease === undefined) {
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          await openCheckingForUpdatesFailedModal(() => checkForUpdates())
          return
        }

        const allReleases = await getAllReleasesRequest()
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
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            openAvailableUpdateModal(latestRelease)
          }
        } else {
          onUpdate({ lastAvailableOsVersion: latestRelease?.version })

          if (!silent) {
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            openNotAvailableUpdateModal()
          }
        }
      } catch (error) {
        if (!silent) {
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
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

    return modalService.openModal(
      <TooLowBatteryModal deviceType={currentDeviceType} open />,
      true
    )
  }
  const downloadUpdate = async (releaseInstance?: Release) => {
    const release =
      releaseInstance === undefined || releaseInstance.version === undefined
        ? releaseToInstall
        : releaseInstance
    if (notEnoughBattery) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        openDevModal(true)
      } else {
        onUpdate({ pureOsDownloaded: true })
        await openDownloadSucceededModal(release)
      }
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.status === DownloadStatus.Cancelled) {
        await openDownloadCanceledModal()
      } else {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
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

    if (notEnoughBattery) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      openTooLowBatteryModal()
      return
    }

    const { file, version } = release

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    trackOsUpdate({
      ...options,
      fromOsVersion: osVersion,
      toOsVersion: version,
      state: TrackOsUpdateState.Start,
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    modalService.openModal(<UpdatingSpinnerModal />, true)

    toggleDeviceUpdating(true)

    await removeFileRequest(DiagnosticsFilePath.UPDATER_LOG)
    const response = await updateOs(file.name)

    if (response.status !== RequestResponseStatus.Ok) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      logger.info(`updateOs: ${response.error?.message}`)
    }
    if (response.status === RequestResponseStatus.Ok) {
      modalService.rerenderModal(<UpdatingSpinnerModal />)
    }

    toggleDeviceUpdating(false)

    if (!releaseToInstall?.devMode) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await onUpdate({
        pureOsFileUrl: "",
        pureOsDownloaded: false,
        lastAvailableOsVersion: undefined,
      })
    }

    if (
      !releaseToInstall?.devMode &&
      isEqual(response, { status: RequestResponseStatus.Ok })
    ) {
      dispatch(
        setOsVersionData({
          osVersion: version,
        })
      )
    }

    if (isEqual(response, { status: RequestResponseStatus.Ok })) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      trackOsVersion({ ...options, osVersion: version })
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      trackOsUpdate({
        ...options,
        fromOsVersion: osVersion,
        toOsVersion: version,
        state: TrackOsUpdateState.Success,
      })
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      modalService.openModal(<UpdatingSuccessModal />, true)
    } else {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      trackOsUpdate({
        ...options,
        fromOsVersion: osVersion,
        toOsVersion: version,
        state: TrackOsUpdateState.Fail,
      })
      logger.error(
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Overview: updating pure fails. Message: ${response.error?.message}`
      )
      displayErrorModal()
    }
  }

  const callActionAfterCloseModal = <T extends unknown>(
    action: () => void
  ): (() => void) => {
    return () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      modalService.closeModal()
      action()
    }
  }

  const displayErrorModal = () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
