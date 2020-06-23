import contextMenu from "electron-context-menu"

const isDev = process.env.NODE_ENV === "development"

export default () => {
  /* On dev init config menu */
  if (isDev) {
    contextMenu()
  }
}
