/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { DeviceType } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import { useDispatch, useSelector } from "react-redux"
import modalService from "Renderer/components/core/modal/modal.service"
import {
  CheckingUpdatesModal,
  DevUpdate,
  DownloadingUpdateCancelledModal,
  DownloadingUpdateFinishedModal,
  DownloadingUpdateInterruptedModal,
  DownloadingUpdateModal,
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
import delayResponse from "@appnroll/delay-response"
import updateOs from "Renderer/requests/update-os.request"
import {
  DeviceResponseStatus,
  ResponseError,
} from "Backend/adapters/device-response.interface"
import { isEqual } from "lodash"
import logger from "App/main/utils/logger"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"
import { Release } from "App/main/functions/register-get-all-releases-listener"
import appContextMenu from "Renderer/wrappers/app-context-menu"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import { errorCodeMap } from "App/overview/components/updating-force-modal-flow/no-critical-errors-codes.const"
import { setOsVersionData } from "App/device"
import { ReduxRootState } from "App/renderer/store"

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
  const [releaseToInstall, setReleaseToInstall] = useState<Release>()
  const dispatch = useDispatch()

  useEffect(() => {
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

  const [activeResponseError, setResponseError] = useState<
    ResponseError | undefined
  >(undefined)

  useEffect(() => {
    if (activeResponseError) {
      displayErrorModal()
      setResponseError(undefined)
    }

    const unregisterItem = appContextMenu.registerItem("Overview", {
      label: "Select Pure kind of updating failure",
      submenu: Object.keys(errorCodeMap).map((key) => {
        return {
          label: `${
            key !== activeResponseError ? `Enable` : `Disabled`
          } ${key} failure`,
          click: () => setResponseError(key as ResponseError),
        }
      }),
    })
    return () => unregisterItem()
  }, [activeResponseError])

  // Checking for updates
  const openCheckingForUpdatesModal = () => {
    return modalService.openModal(<CheckingUpdatesModal />, true)
  }

  const openCheckingForUpdatesFailedModal = (onRetry: () => void) => {
    return modalService.openModal(<UpdateServerError onRetry={onRetry} />, true)
  }

  const openAvailableUpdateModal = (release: Release) => {
    const { version, date } = release
    const onDownload = () => {
      downloadUpdate(release)
      openDownloadingUpdateModal()
    }

    return modalService.openModal(
      <UpdateAvailable onDownload={onDownload} version={version} date={date} />,
      true
    )
  }

  const openNotAvailableUpdateModal = () => {
    return modalService.openModal(
      <UpdateNotAvailable version={osVersion} />,
      true
    )
  }

  const checkForUpdates = async (silent = false) => {
    if (!silent) {
      await delayResponse(openCheckingForUpdatesModal(), 1000)
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
        logger.error(`Overview: check for updates fail. Data: ${error.message}`)
      }
    }
  }

  // Download update
  const openDownloadSucceededModal = (release?: Release) => {
    return modalService.openModal(
      <DownloadingUpdateFinishedModal onOsUpdate={() => updatePure(release)} />,
      true
    )
  }

  const openDownloadCanceledModal = () => {
    return modalService.openModal(<DownloadingUpdateCancelledModal />, true)
  }

  const openDownloadInterruptedModal = (onRetry: () => void) => {
    return modalService.openModal(
      <DownloadingUpdateInterruptedModal onRetry={onRetry} />,
      true
    )
  }

  const openDownloadingUpdateModal = async () => {
    await modalService.openModal(
      <DownloadingUpdateModal onCancel={onOsDownloadCancel} />,
      true
    )
    modalService.preventClosingModal()
  }

  const downloadUpdate = async (release?: Release) => {
    const r =
      release === undefined || release.version === undefined
        ? releaseToInstall
        : release
    try {
      await openDownloadingUpdateModal()
      await delayResponse(downloadOsUpdateRequest(r?.file.url as string))
      if (r?.devMode) {
        openDevModal(true)
      } else {
        onUpdate({ pureOsDownloaded: true })
        await openDownloadSucceededModal(r)
      }
    } catch (error) {
      if (error.status === DownloadStatus.Cancelled) {
        await openDownloadCanceledModal()
      } else {
        await openDownloadInterruptedModal(() => downloadUpdate(r))
      }
    }
  }

  // Install update
  const updatePure = async (release?: Release) => {
    const r =
      release === undefined || release.version === undefined
        ? releaseToInstall
        : release

    if (r === undefined) {
      displayErrorModal()
      return
    }

    const { file, version } = r

    modalService.openModal(<UpdatingSpinnerModal />, true)

    toggleDeviceUpdating(true)

    const response = await updateOs(file.name, IpcEmitter.OsUpdateProgress)

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
        `Overview: updating pure fails. Code: ${response.error?.code}`
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
    initialCheck: () => checkForUpdates(true),
    check: () => checkForUpdates(),
    download: downloadUpdate,
    install: updatePure,
  }
}

export default useSystemUpdateFlow
