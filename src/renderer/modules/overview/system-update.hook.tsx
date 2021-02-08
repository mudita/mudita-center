/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { useEffect } from "react"
import { ipcRenderer } from "electron-better-ipc"
import modalService from "Renderer/components/core/modal/modal.service"
import {
  CheckingUpdatesModal,
  DownloadingUpdateCancelledModal,
  DownloadingUpdateFinishedModal,
  DownloadingUpdateInterruptedModal,
  DownloadingUpdateModal,
  UpdateAvailable,
  UpdateNotAvailable,
  UpdateServerError,
  UpdatingFailureModal,
  UpdatingProgressModal,
  UpdatingSuccessModal,
} from "Renderer/modules/overview/overview.modals"
import availableOsUpdateRequest, {
  UpdateStatusResponse,
} from "Renderer/requests/available-os-update.request"
import downloadOsUpdateRequest, {
  cancelOsDownload,
} from "Renderer/requests/download-os-update.request"
import { PureOsDownloadChannels } from "App/main/functions/register-pure-os-download-listener"
import {
  DownloadProgress,
  DownloadStatus,
  Filename,
  Filesize,
} from "Renderer/interfaces/file-download.interface"
import osUpdateAlreadyDownloadedCheck from "Renderer/requests/os-update-already-downloaded.request"
import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"
import delayResponse from "@appnroll/delay-response"
import updateOs from "Renderer/requests/update-os.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { isEqual } from "lodash"
import { StoreValues as BasicInfoValues } from "Renderer/models/basic-info/basic-info.typings"
import logger from "App/main/utils/logger"
import registerOsUpdateProgressListener, {
  OsUpdateProgressListener,
  removeOsUpdateProgressListener,
} from "Renderer/listeners/register-os-update-progress.listener"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const onOsDownloadCancel = () => {
  cancelOsDownload()
}

const useSystemUpdateFlow = (
  lastUpdate: string,
  onUpdate: (updateInfo: PhoneUpdate) => void,
  updateBasicInfo: (updateInfo: Partial<BasicInfoValues>) => void,
  toggleUpdatingDevice: (option: boolean) => void
) => {
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

  const updatePure = async (updateInfo: UpdateStatusResponse) => {
    const { file, version } = updateInfo

    modalService.openModal(<UpdatingProgressModal progressValue={0} />, true)

    toggleUpdatingDevice(true)

    const listener: OsUpdateProgressListener = async (_, { progress }) => {
      modalService.rerenderModal(
        <UpdatingProgressModal progressValue={progress} />
      )
    }

    registerOsUpdateProgressListener(listener)

    const response = await updateOs(file, IpcEmitter.OsUpdateProgress)

    removeOsUpdateProgressListener(listener)

    if (response.status === DeviceResponseStatus.Ok) {
      modalService.rerenderModal(<UpdatingProgressModal progressValue={100} />)
    }

    toggleUpdatingDevice(false)

    await onUpdate({
      pureOsFileName: "",
      pureOsDownloaded: false,
      pureOsAvailable: false,
    })

    await updateBasicInfo({
      osVersion: version,
      osUpdateDate: new Date().toISOString(),
    })

    return response
  }

  const checkForUpdates = (retry?: boolean, silent?: boolean) => {
    if (!silent) {
      modalService.openModal(<CheckingUpdatesModal />, retry)
    }
    return delayResponse(availableOsUpdateRequest(lastUpdate), silent ? 0 : 500)
  }

  const checkForUpdatesFailed = (onRetry: () => void) => {
    return modalService.openModal(<UpdateServerError onRetry={onRetry} />, true)
  }

  const alreadyDownloadedCheck = (file: Filename, size: Filesize) => {
    return osUpdateAlreadyDownloadedCheck(file, size)
  }

  const downloadUpdateFile = async (file: Filename) => {
    await modalService.openModal(
      <DownloadingUpdateModal onCancel={onOsDownloadCancel} />,
      true
    )
    modalService.preventClosingModal()
    return delayResponse(
      downloadOsUpdateRequest(file.split("/").pop() as Filename)
    )
  }

  const downloadSucceeded = (onOsUpdate: () => void) => {
    return modalService.openModal(
      <DownloadingUpdateFinishedModal onOsUpdate={onOsUpdate} />,
      true
    )
  }

  const downloadCanceled = () => {
    return modalService.openModal(<DownloadingUpdateCancelledModal />, true)
  }

  const downloadInterrupted = (onRetry: () => void) => {
    return modalService.openModal(
      <DownloadingUpdateInterruptedModal onRetry={onRetry} />,
      true
    )
  }

  const availableUpdate = (
    onDownload: () => void,
    version: string,
    date: string
  ) => {
    return modalService.openModal(
      <UpdateAvailable onDownload={onDownload} version={version} date={date} />,
      true
    )
  }

  const notAvailableUpdate = (version: string, date: string) => {
    return modalService.openModal(
      <UpdateNotAvailable version={version} date={date} />,
      true
    )
  }

  const install = async () => {
    const updatesInfo = await checkForUpdates(false, true)
    const update = async () => {
      const updateResponse = await updatePure(updatesInfo)
      if (isEqual(updateResponse, { status: DeviceResponseStatus.Ok })) {
        modalService.openModal(<UpdatingSuccessModal />, true)
      } else {
        logger.error(updateResponse)
        modalService.openModal(<UpdatingFailureModal onRetry={update} />, true)
      }
    }
    await update()
  }

  const download = async (file: Filename) => {
    try {
      await downloadUpdateFile(file)
      onUpdate({ pureOsDownloaded: true })
      await downloadSucceeded(install)
    } catch (error) {
      if (error.status === DownloadStatus.Cancelled) {
        await downloadCanceled()
      } else {
        await downloadInterrupted(async () => await download(file))
      }
    }
  }

  const initialCheck = async () => {
    try {
      const { available, file, size } = await checkForUpdates(false, true)
      if (available) {
        if (await alreadyDownloadedCheck(file, size)) {
          onUpdate({ pureOsAvailable: true, pureOsDownloaded: true })
        } else {
          onUpdate({ pureOsAvailable: true, pureOsFileName: file })
        }
      }
    } catch (error) {
      // do nothing
    }
  }

  const check = async (retry?: boolean) => {
    try {
      const { available, version, file, date, size } = await checkForUpdates(
        retry
      )
      if (available) {
        onUpdate({ pureOsFileName: file, pureOsAvailable: true })
        if (await alreadyDownloadedCheck(file, size)) {
          onUpdate({ pureOsDownloaded: true })
          await downloadSucceeded(install)
        } else {
          await availableUpdate(async () => await download(file), version, date)
        }
      } else {
        await notAvailableUpdate(version, date)
      }
    } catch (error) {
      await checkForUpdatesFailed(async () => await check(true))
    }
  }

  return {
    initialCheck,
    check,
    download,
    install,
  }
}

export default useSystemUpdateFlow
