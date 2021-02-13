import Store from "electron-store"
import { app } from "electron"
import { name } from "../../../package.json"

const helpStore = new Store({
  name: "help",
  cwd: `${app.getPath("appData")}/${name}`,
})

export default helpStore
