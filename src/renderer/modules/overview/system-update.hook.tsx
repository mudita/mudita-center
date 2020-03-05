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
} from "Renderer/modules/overview/overview.modals"
import delayResponse from "Renderer/utils/delay-response"
import availableOsUpdateRequest from "Renderer/requests/available-os-update.request"
import downloadOsUpdateRequest, {
  cancelOsDownload,
} from "Renderer/requests/download-os-update.request"
import { PureOsDownloadChannels } from "App/main/functions/register-pure-os-download-listener"
import {
  DownloadProgress,
  DownloadStatus,
  Filename,
} from "Renderer/interfaces/file-download.interface"

const onOsDownloadCancel = () => {
  cancelOsDownload()
}

const useSystemUpdateFlow = (lastUpdate: string) => {
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

  const updatePure = () => {
    // TODO: Continue update process when Pure updates through USB become available
    console.log("Updating Pure OS...")
  }

  const checkForUpdates = (retry?: boolean) => {
    modalService.openModal(<CheckingUpdatesModal />, retry)
    return delayResponse(availableOsUpdateRequest(lastUpdate))
  }

  const checkForUpdatesFailed = (onRetry: () => void) => {
    return modalService.openModal(<UpdateServerError onRetry={onRetry} />, true)
  }

  const downloadUpdateFile = async (file: Filename) => {
    await modalService.openModal(
      <DownloadingUpdateModal onCancel={onOsDownloadCancel} />,
      true
    )
    modalService.preventClosingModal()
    return delayResponse(downloadOsUpdateRequest(file))
  }

  const downloadSucceeded = () => {
    return modalService.openModal(
      <DownloadingUpdateFinishedModal onOsUpdate={updatePure} />,
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

  const onUpdateCheck = async (retry?: boolean) => {
    try {
      const { available, version, file, date } = await checkForUpdates(retry)

      if (available && version && file) {
        const downloadUpdate = async () => {
          try {
            await downloadUpdateFile(file)
            await downloadSucceeded()
          } catch (error) {
            if (error.status === DownloadStatus.Cancelled) {
              await downloadCanceled()
            } else {
              await downloadInterrupted(downloadUpdate)
            }
          }
        }
        await availableUpdate(downloadUpdate, version, date)
      } else {
        await notAvailableUpdate(version, date)
      }
    } catch (error) {
      await checkForUpdatesFailed(() => onUpdateCheck(true))
    }
  }

  return onUpdateCheck
}

export default useSystemUpdateFlow
