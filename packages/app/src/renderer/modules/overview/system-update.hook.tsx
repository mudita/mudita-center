/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { ipcRenderer } from "electron-better-ipc"
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
  UpdatingFailureModal,
  UpdatingFailureWithHelpModal,
  UpdatingSpinnerModal,
  UpdatingSuccessModal,
} from "Renderer/modules/overview/overview.modals"
import availableOsUpdateRequest from "Renderer/requests/available-os-update.request"
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
import { StoreValues as BasicInfoValues } from "Renderer/models/basic-info/basic-info.typings"
import logger from "App/main/utils/logger"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"
import { Release } from "App/main/functions/register-pure-os-update-listener"
import appContextMenu from "Renderer/wrappers/app-context-menu"
import {
  DeviceUpdateError as PureDeviceUpdateError,
  deviceUpdateErrorCodeMap as pureDeviceUpdateErrorCodeMap,
} from "@mudita/pure"
import {
  DeviceUpdateError,
  deviceUpdateErrorCodeMap,
} from "Backend/adapters/pure-phone/pure-phone.adapter"
import { useContactSupport } from "Renderer/utils/contact-support/use-contact-support"
import { HelpActions } from "Common/enums/help-actions.enum"

const onOsDownloadCancel = () => {
  cancelOsDownload()
}

const errorCodeMap = {
  ...pureDeviceUpdateErrorCodeMap,
  ...deviceUpdateErrorCodeMap,
}

const noCriticalErrorCodes: number[] = [
  errorCodeMap[PureDeviceUpdateError.VerifyChecksumsFailure],
  errorCodeMap[PureDeviceUpdateError.VerifyVersionFailure],
  errorCodeMap[PureDeviceUpdateError.CantOpenUpdateFile],
  errorCodeMap[PureDeviceUpdateError.NoBootloaderFile],
  errorCodeMap[PureDeviceUpdateError.CantOpenBootloaderFile],
  errorCodeMap[DeviceUpdateError.RestartTimedOut],
  errorCodeMap[DeviceUpdateError.DeviceDisconnectionBeforeDone],
]

const useSystemUpdateFlow = (
  osUpdateDate: string,
  osVersion: string,
  onUpdate: (updateInfo: PhoneUpdate) => void,
  updateBasicInfo: (updateInfo: Partial<BasicInfoValues>) => void,
  toggleDeviceUpdating: (option: boolean) => void
) => {
  const [releaseToInstall, setReleaseToInstall] = useState<Release>()

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
      install ? updatePure() : downloadUpdate()
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
      const code = errorCodeMap[activeResponseError]
      displayErrorModal(code)
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

  const openAvailableUpdateModal = () => {
    const { version, date } = releaseToInstall as Release
    const onDownload = () => {
      downloadUpdate()
      openDownloadingUpdateModal()
    }

    return modalService.openModal(
      <UpdateAvailable onDownload={onDownload} version={version} date={date} />,
      true
    )
  }

  const openNotAvailableUpdateModal = () => {
    return modalService.openModal(
      <UpdateNotAvailable version={osVersion} date={osUpdateDate} />,
      true
    )
  }

  const checkForUpdates = async (silent = false) => {
    if (!silent) {
      await delayResponse(openCheckingForUpdatesModal(), 1000)
    }

    if (osVersion) {
      try {
        const { latestRelease, allReleases } = await availableOsUpdateRequest(
          osVersion
        )

        setDevReleases(allReleases)

        if (latestRelease) {
          setReleaseToInstall(latestRelease)

          onUpdate({
            pureOsAvailable: true,
            pureOsFileUrl: latestRelease.file.url,
          })

          if (await osUpdateAlreadyDownloadedCheck(latestRelease.file)) {
            onUpdate({ pureOsDownloaded: true })
          }

          if (!silent) {
            openAvailableUpdateModal()
          }
        } else {
          onUpdate({ pureOsAvailable: false })

          if (!silent) {
            openNotAvailableUpdateModal()
          }
        }
      } catch (error) {
        if (!silent) {
          await openCheckingForUpdatesFailedModal(() => checkForUpdates())
        }
        logger.error(error)
      }
    }
  }

  // Download update
  const openDownloadSucceededModal = () => {
    return modalService.openModal(
      <DownloadingUpdateFinishedModal onOsUpdate={updatePure} />,
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

  const downloadUpdate = async () => {
    try {
      await openDownloadingUpdateModal()
      await delayResponse(
        downloadOsUpdateRequest(releaseToInstall?.file.url as string)
      )
      if (releaseToInstall?.devMode) {
        openDevModal(true)
      } else {
        onUpdate({ pureOsDownloaded: true })
        await openDownloadSucceededModal()
      }
    } catch (error) {
      if (error.status === DownloadStatus.Cancelled) {
        await openDownloadCanceledModal()
      } else {
        await openDownloadInterruptedModal(() => downloadUpdate())
      }
    }
  }

  // Install update
  const updatePure = async () => {
    const { file, version } = releaseToInstall as Release

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
        pureOsAvailable: false,
      })

      await updateBasicInfo({
        osVersion: version,
        osUpdateDate: new Date().toISOString(),
      })
    }

    if (isEqual(response, { status: DeviceResponseStatus.Ok })) {
      modalService.openModal(<UpdatingSuccessModal />, true)
    } else {
      const responseCode = response.error?.code
      displayErrorModal(responseCode)
      logger.error(response)
    }
  }

  const goToHelp = (code: number) => () => {
    ipcRenderer.callMain(HelpActions.OpenWindow, { code })
  }
  const { openContactSupportModal, ...rest } = useContactSupport()
  const callActionAfterCloseModal = (action: () => void): (() => void) => {
    return () => {
      modalService.closeModal()
      action()
    }
  }
  const displayErrorModal = (code?: number) => {
    if (code && noCriticalErrorCodes.includes(code)) {
      modalService.openModal(
        <UpdatingFailureWithHelpModal
          code={code}
          onHelp={callActionAfterCloseModal(goToHelp(code))}
          onContact={callActionAfterCloseModal(openContactSupportModal)}
        />,
        true
      )
    } else {
      modalService.openModal(
        <UpdatingFailureModal
          code={code}
          onContact={callActionAfterCloseModal(openContactSupportModal)}
        />,
        true
      )
    }
  }

  return {
    initialCheck: () => checkForUpdates(true),
    check: () => checkForUpdates(),
    download: downloadUpdate,
    install: updatePure,
    contactSupport: { ...rest },
  }
}

export default useSystemUpdateFlow
