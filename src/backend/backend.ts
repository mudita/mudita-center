import Adapters from "Backend/adapters/adapters.interface"
import { ipcMain } from "electron-better-ipc"

type EndpointRemover = () => void

class Backend {
  private usingFakeAdapters = false
  private endpointsRemovers: EndpointRemover[] = []

  constructor(
    private adapters: Adapters,
    private fakeAdapters: Adapters,
    private requests: Array<(adapters: Adapters) => EndpointRemover>,
  ) {
    ipcMain.answerRenderer<boolean>("switch-adapters", () => {
      this.toggleAdapters()
    })
    this.registerEndpoints()
  }

  private registerEndpoints() {
    this.requests.forEach((register) => {
      const unregister = register(
        this.usingFakeAdapters ? this.fakeAdapters : this.adapters,
      )
      this.endpointsRemovers.push(unregister)
    })
  }

  private unregisterEndpoints() {
    this.endpointsRemovers.forEach((remove) => remove())
    this.endpointsRemovers = []
  }

  private toggleAdapters() {
    this.usingFakeAdapters = !this.usingFakeAdapters
    this.unregisterEndpoints()
    this.registerEndpoints()
  }
}

export default Backend
