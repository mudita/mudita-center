import {
  DownloadProgress,
  DownloadStatus,
  Filename,
} from "App/main/functions/create-download-listener-registrar"
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
import downloadOsUpdateRequest from "Renderer/requests/download-os-update.request"
import { PureOsDownloadChannel } from "App/main/functions/register-pure-os-download-listener"

const useSystemUpdateFlow = (lastUpdate: string) => {
  useEffect(() => {
    const downloadListener = (
      event: Event,
      { percent, speed, timeLeft }: DownloadProgress
    ) => {
      modalService.rerenderModal(
        <DownloadingUpdateModal
          percent={percent}
          speed={speed}
          timeLeft={timeLeft}
        />
      )
    }
    ipcRenderer.on(PureOsDownloadChannel.Progress, downloadListener)
    return () => {
      ipcRenderer.removeListener(
        PureOsDownloadChannel.Progress,
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

  const checkForUpdatesFailed = (retryHandler: () => void) => {
    return modalService.openModal(
      <UpdateServerError retryHandler={retryHandler} />,
      true
    )
  }

  const downloadUpdateFile = async (file: Filename) => {
    await modalService.openModal(<DownloadingUpdateModal />, true)
    modalService.preventClosingModal()
    return delayResponse(downloadOsUpdateRequest(file))
  }

  const downloadSucceeded = () => {
    return modalService.openModal(
      <DownloadingUpdateFinishedModal osUpdateHandler={updatePure} />,
      true
    )
  }

  const downloadCanceled = () => {
    return modalService.openModal(<DownloadingUpdateCancelledModal />, true)
  }

  const downloadInterrupted = (retryHandler: () => void) => {
    return modalService.openModal(
      <DownloadingUpdateInterruptedModal retryHandler={retryHandler} />,
      true
    )
  }

  const availableUpdate = (
    downloadActionHandler: () => void,
    version: string
  ) => {
    return modalService.openModal(
      <UpdateAvailable
        downloadActionHandler={downloadActionHandler}
        version={version}
      />,
      true
    )
  }

  const notAvailableUpdate = () => {
    return modalService.openModal(<UpdateNotAvailable />, true)
  }

  const onUpdateCheck = async (retry?: boolean) => {
    try {
      const { available, version, file } = await checkForUpdates(retry)

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
        await availableUpdate(downloadUpdate, version)
      } else {
        await notAvailableUpdate()
      }
    } catch (error) {
      await checkForUpdatesFailed(() => onUpdateCheck(true))
    }
  }

  return onUpdateCheck
}

export default useSystemUpdateFlow
