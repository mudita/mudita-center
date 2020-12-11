import store from "Renderer/store"
import { ipcRenderer } from "electron-better-ipc"

export const isDevModeEnabled = () => store.getState().devMode.devModeEnabled

export const toggleDevMode = () => {
  if (
    store.getState().devMode.phoneSimulation &&
    store.getState().devMode.devModeEnabled
  ) {
    togglePhoneSimulation()
  }
  store.getState().devMode.devModeEnabled
    ? store.dispatch.devMode.disableDevMode()
    : store.dispatch.devMode.enableDevMode()
}

export const togglePhoneSimulation = () => {
  if (store.getState().devMode.phoneSimulation) {
    ipcRenderer.callMain("switch-adapters")
    store.dispatch.devMode.disablePhoneSimulation()
    store.dispatch.basicInfo.disconnect()
  } else {
    ipcRenderer.callMain("switch-adapters")
    store.dispatch.devMode.enablePhoneSimulation()
    store.dispatch.basicInfo.connect()
  }
}
