import store from "Renderer/store"

export const isDevModeEnabled = () => store.getState().devMode.devModeEnabled
