import store from "Renderer/store"
import { ipcRenderer } from "electron-better-ipc"
import { backendAdaptersChannel } from "Backend/backend.types"

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
  ipcRenderer.callMain(backendAdaptersChannel)

  if (store.getState().devMode.phoneSimulation) {
    store.dispatch.devMode.disablePhoneSimulation()
    store.dispatch.basicInfo.disconnect()
  } else {
    store.dispatch.devMode.enablePhoneSimulation()
    store.dispatch.basicInfo.connect()
  }
}
