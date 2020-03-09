import React from "react"
import { ipcRenderer } from "electron-better-ipc"
import { AppUpdateActions, AppUpdateStatus } from "App/main/autoupdate"
import { ModalService } from "Renderer/components/core/modal/modal.service"
import {
  AppUpdateAvailable,
  AppUpdateDownloaded,
  AppUpdateError,
} from "Renderer/components/rest/app-update/app-update.modals"

export default (appModalService: ModalService) => {
  const download = () => {
    ipcRenderer.callMain(AppUpdateActions.Download)
    appModalService.closeModal()
  }

  const install = () => {
    ipcRenderer.callMain(AppUpdateActions.Install)
    appModalService.closeModal()
  }

  ipcRenderer.answerMain(AppUpdateStatus.Available, () => {
    appModalService.openModal(<AppUpdateAvailable onDownload={download} />)
  })

  ipcRenderer.answerMain(AppUpdateStatus.Downloaded, () => {
    appModalService.openModal(<AppUpdateDownloaded onInstall={install} />)
  })

  ipcRenderer.answerMain(AppUpdateStatus.Error, () => {
    appModalService.openModal(<AppUpdateError />, true)
  })
}
