import store from "Renderer/store"

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
  if (store.getState().devMode.devModeEnabled) {
    if (store.getState().devMode.phoneSimulation) {
      store.dispatch.devMode.disablePhoneSimulation()
      store.dispatch.basicInfo.disconnect()
    } else {
      store.dispatch.devMode.enablePhoneSimulation()
      store.dispatch.basicInfo.fakeConnect()
    }
  }
}
