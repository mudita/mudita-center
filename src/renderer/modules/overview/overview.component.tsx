import React, { useEffect } from "react"
import { InitialState as BasicInfoInitialState } from "Renderer/models/basicInfo/interfaces"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Phone from "Renderer/components/rest/overview/phone/phone.component"
import Network from "Renderer/components/rest/overview/network/network.component"
import getFakeAdapters from "App/tests/get-fake-adapters"
import System from "Renderer/components/rest/overview/system/system.component"
import FilesManager from "Renderer/components/rest/overview/files-manager/files-manager.component"
import Backup from "Renderer/components/rest/overview/backup/backup.component"
import { noop } from "Renderer/utils/noop"
import availableOsUpdateRequest from "Renderer/requests/available-os-update.request"
import downloadOsUpdateRequest, {
  DownloadStatus,
  OSDownloadProgressing,
  UpdateRequestFile,
} from "Renderer/requests/download-os-update.request"
import modalService from "Renderer/components/core/modal/modal.service"
import { ipcRenderer } from "electron-better-ipc"
import {
  DownloadingUpdateModal,
  UpdateAvailable,
  DownloadingUpdateCancelledModal,
  DownloadingUpdateFinishedModal,
  DownloadingUpdateInterruptedModal,
  UpdateNotAvailable,
  CheckingUpdatesModal,
} from "Renderer/modules/overview/overview.modals"
import delayResponse from "Renderer/utils/delay-response"

const PhoneInfo = styled(Phone)`
  grid-area: Phone;
`

const NetworkInfo = styled(Network)`
  grid-area: Network;
`

const FileManagerInfo = styled(FilesManager)`
  grid-area: FilesManager;
`

const BackupInfo = styled(Backup)`
  grid-area: Backup;
`

const OverviewWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(27rem, 1fr) minmax(59rem, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 4rem;
  grid-row-gap: 3.2rem;
  padding: 3.2rem 3rem 3.7rem 4rem;
  grid-template-areas:
    "Phone Network"
    "Phone System"
    "Phone FilesManager"
    "Phone Backup";
`

// Mocked data, only for testing purposes.
// TODO: Remove after merge with https://appnroll.atlassian.net/browse/PDA-70
const lastUpdate = "2020-02-18T13:54:32.943Z"

// Rerender modal while downloading file
const useOnDownloadProgress = (
  downloadCallback: (props: OSDownloadProgressing["data"]) => void
) => {
  useEffect(() => {
    const downloadListener = (event: Event, { data }: OSDownloadProgressing) =>
      downloadCallback(data)
    ipcRenderer.on("download-progress", downloadListener)
    return () => {
      ipcRenderer.removeListener("download-progress", downloadListener)
    }
  }, [])
}

const Overview: FunctionComponent<BasicInfoInitialState> = ({
  batteryLevel,
  lastBackup,
  osVersion,
}) => {
  useOnDownloadProgress(({ percent, timeLeft }) => {
    modalService.rerenderModal(
      <DownloadingUpdateModal progress={percent} estimatedTime={timeLeft} />
    )
  })

  const updatePure = () => {
    // TODO: Continue update process when Pure updates through USB become available
    console.log("Updating Pure OS...")
  }

  const checkForUpdates = async () => {
    await modalService.openModal(<CheckingUpdatesModal />)
    return await delayResponse(availableOsUpdateRequest(lastUpdate))
  }

  const downloadUpdateFile = async (file: UpdateRequestFile) => {
    await modalService.openModal(<DownloadingUpdateModal />, true)
    modalService.preventClosingModal()
    return await delayResponse(downloadOsUpdateRequest(file))
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

  const availableUpdate = async (
    downloadActionHandler: () => void,
    version: string
  ) => {
    return await modalService.openModal(
      <UpdateAvailable
        downloadActionHandler={downloadActionHandler}
        version={version}
      />,
      true
    )
  }

  const notAvailableUpdate = async () => {
    return await modalService.openModal(<UpdateNotAvailable />, true)
  }

  const onUpdateCheck = async () => {
    const { available, version, file } = await checkForUpdates()

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
  }

  return (
    <OverviewWrapper>
      <PhoneInfo
        onDisconnect={noop}
        batteryLevel={batteryLevel}
        network={"Play"}
      />
      <NetworkInfo simCards={getFakeAdapters().pureNetwork.getSimCards()} />
      <System
        osVersion={osVersion}
        lastUpdate={"just now"}
        onUpdateCheck={onUpdateCheck}
      />
      <FileManagerInfo usedSpace={16} onFilesOpen={noop} />
      <BackupInfo
        lastBackup={lastBackup}
        onBackupCreate={noop}
        onBackupRestore={noop}
      />
    </OverviewWrapper>
  )
}

export default Overview
