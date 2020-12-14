import store from "Renderer/store"
import { ipcRenderer } from "electron-better-ipc"

export const isDevModeEnabled = () => {
  return Boolean(store.getState().devMode.enabled)
}

export const toggleDevMode = () => {
  if (
    store.getState().devMode.phoneSimulation &&
    store.getState().devMode.enabled
  ) {
    togglePhoneSimulation()
  }
  store.getState().devMode.enabled
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
