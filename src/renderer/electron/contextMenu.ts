import contextMenu from "electron-context-menu"

const isDev = require("../../../webpack/isDev")()

export default () => {
  /* On dev init config menu */
  if (isDev) {
    contextMenu()
  }
}
