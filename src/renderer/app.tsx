import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"

import modalService from "Renderer/components/core/modal/modal.service"
import { LANGUAGE } from "Renderer/constants/languages"
import history from "Renderer/routes/history"

import store from "Renderer/store"
import RootWrapper from "Renderer/wrappers/root-wrapper"
import "./fonts/fonts.css"

import contextMenu from "Renderer/electron/contextMenu"
import { ipcRenderer } from "electron-better-ipc"
import { AppUpdateStatus } from "App/main/autoupdate"
import Modal from "Renderer/components/core/modal/modal.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"

// Create main element
const mainElement = document.createElement("div")
document.body.appendChild(mainElement)

ReactDOM.render(
  <AppContainer>
    <RootWrapper store={store} history={history} />
  </AppContainer>,
  mainElement
)

modalService.bindStore(store)
modalService.setDefaultLocale(LANGUAGE.default)
contextMenu()

const update = () => {
  ipcRenderer.send("download-app-update")
  modalService.closeModal()
}

const install = () => {
  ipcRenderer.send("install-app-update")
}

ipcRenderer.on(AppUpdateStatus.Available, (event, args) => {
  modalService.openModal(
    <Modal
      title={"App update"}
      size={ModalSize.VerySmall}
      actionButtonLabel={"Update now"}
      onActionButtonClick={update}
    >
      <Text displayStyle={TextDisplayStyle.LargeBoldText}>
        App update is available
        <pre>{JSON.stringify(args, null, 2)}</pre>
      </Text>
    </Modal>
  )
})

ipcRenderer.on(AppUpdateStatus.Downloading, (event, args) => {
  console.log(args)
})

ipcRenderer.on(AppUpdateStatus.Error, (event, args) => {
  console.log(args)
})

ipcRenderer.on(AppUpdateStatus.Downloaded, (event, args) => {
  console.log(args)
  modalService.openModal(
    <Modal
      title={"App update"}
      size={ModalSize.VerySmall}
      actionButtonLabel={"update & restart"}
      onActionButtonClick={install}
    >
      <Text displayStyle={TextDisplayStyle.LargeBoldText}>
        App update is downloaded
      </Text>
    </Modal>
  )
})
