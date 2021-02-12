import ElectronAppAdapter from "Backend/adapters/electron-app/electron-app-adapter.interface"
import { app } from "electron"

const createElectronAppAdapter = (): ElectronAppAdapter => app

export default createElectronAppAdapter
