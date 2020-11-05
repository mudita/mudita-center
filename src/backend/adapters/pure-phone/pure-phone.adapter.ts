import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

import { MainProcessIpc } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

class PurePhone extends PurePhoneAdapter {
  constructor(private pureNode: any, private ipcMain: MainProcessIpc) {
    super()
    pureNode.on("close", this.emitDisconnectedDeviceSignal)
    pureNode.on("data", this.emitConnectedDeviceSignal)
  }

  private emitDisconnectedDeviceSignal = (): void => {
    this.ipcMain.sendToRenderers(IpcEmitter.DisconnectedDevice)
  }

  private emitConnectedDeviceSignal = (event: any): void => {
    console.log({ event })

    this.ipcMain.sendToRenderers(IpcEmitter.ConnectedDevice)
  }

  public getModelName(): string {
    return "Ziemniaczek Puree"
  }

  public getModelNumber(): string {
    return "Y0105W4GG1N5"
  }

  public getName(): string {
    return "Mudita Pure"
  }

  public getOsUpdateDate(): string {
    return "2020-01-14T11:31:08.244Z"
  }

  public getOsVersion(): string {
    return "3.1.0"
  }

  public getSerialNumber(): string {
    return "1UB13213MN14K1"
  }

  public disconnectDevice(): DeviceResponse {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public connectDevice(): Promise<DeviceResponse> {
    console.log("connect")
    return new Promise((resolve) => {
      this.pureNode.portInit((phones: any[]) => {
        const phone = phones[0]

        if (Boolean(phone) && Boolean(phone.path)) {
          this.pureNode.init(phones[0].path)
          resolve({ status: DeviceResponseStatus.Ok })
        }

        resolve({ status: DeviceResponseStatus.Error })
      })
    })
  }

  public updateOs(updateFilePath: string): any {
    console.log("update click")
    this.pureNode.uploadUpdateFile("/Users/kamilstaszewski/Desktop/update1.tar")
    this.pureNode.on("data", (event: any) => {
      if (event.endpoint === 3) {
        if (Number(event.body.status) === 0) {
          this.pureNode.fileUploadConfirmed()
        }
        if (Number(event.status) === 202) {
          this.pureNode.startUpdate("update1.tar")
        }
      }
      if (Number(event.endpoint) === 2) {
        console.log("Update action")

        if (Number(event.status) === 202) {
          console.log("Update running")
        } else if (event.body && event.body.updateReady === true) {
          this.pureNode.updateConfirmed()
        }
      }
    })
  }
}

const createPurePhoneAdapter = (
  pureNode: any,
  ipcMain: MainProcessIpc
): PurePhoneAdapter => new PurePhone(pureNode, ipcMain)

export default createPurePhoneAdapter
