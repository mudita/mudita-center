import React from "react"
import { ipcRenderer } from "electron-better-ipc"
import { AppUpdateActions, AppUpdateStatus } from "App/main/autoupdate"
import modalService from "Renderer/components/core/modal/modal.service"
import {
  AppUpdateAvailable,
  AppUpdateDownloaded,
} from "Renderer/components/rest/app-update/app-update.modals"

const download = () => {
  ipcRenderer.callMain(AppUpdateActions.Download)
  modalService.closeModal()
}

const install = () => {
  ipcRenderer.callMain(AppUpdateActions.Install)
  modalService.closeModal()
}

export default () => {
  ipcRenderer.answerMain(AppUpdateStatus.Available, () => {
    modalService.openModal(<AppUpdateAvailable onDownload={download} />)
  })

  ipcRenderer.answerMain(AppUpdateStatus.Downloaded, () => {
    modalService.openModal(<AppUpdateDownloaded onInstall={install} />)
  })
}
