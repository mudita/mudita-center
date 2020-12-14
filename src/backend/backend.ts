import Adapters from "Backend/adapters/adapters.interface"
import { ipcMain } from "electron-better-ipc"
import { backendAdaptersChannel, EndpointRemover } from "Backend/backend.types"

class Backend {
  private usingFakeAdapters = false
  private endpointsRemovers: EndpointRemover[] = []

  constructor(
    private adapters: Adapters,
    private fakeAdapters: Adapters,
    private requests: Array<(adapters: Adapters) => EndpointRemover>,
  ) {
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

  public init() {
    ipcMain.answerRenderer<boolean>(backendAdaptersChannel, () => {
      this.toggleAdapters()
    })
    this.registerEndpoints()
  }
}

export default Backend
