import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

import { MainProcessIpc } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"
import { Filename } from "Renderer/interfaces/file-download.interface"
import { Constants } from "pure"

class PurePhone extends PurePhoneAdapter {
  constructor(private pureNode: any, private ipcMain: MainProcessIpc) {
    super()
    pureNode.on("close", this.emitDisconnectedDeviceSignal)
    pureNode.on("data", this.emitConnectedDeviceSignal)
  }

  private emitDisconnectedDeviceSignal = (): void => {
    this.ipcMain.sendToRenderers(IpcEmitter.DisconnectedDevice)
  }

  private emitConnectedDeviceSignal = (): void => {
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
    try {
      this.pureNode.uploadUpdateFile(updateFilePath)
    } catch (e) {
      return { status: DeviceResponseStatus.Error }
    }
    return new Promise((resolve) => {
      this.pureNode.on("data", (event: any) => {
        if (event.endpoint === Constants.enpoint.filesystemUpload) {
          if (Number(event.body.status) === 500) {
            resolve({ status: DeviceResponseStatus.Error })
          }
          if (Number(event.body.status) === 0) {
            this.pureNode.fileUploadConfirmed()
          }
          if (Number(event.status) === 202) {
            this.pureNode.startUpdate(
              updateFilePath.split("/").pop() as Filename
            )
          }
        }
        if (Number(event.endpoint) === Constants.enpoint.update) {
          if (event.body.status === "Ready for reset") {
            resolve({ status: DeviceResponseStatus.Ok })
          }
          if (
            Number(event.body.status) ===
            Constants.errorCode.internalServerError
          ) {
            resolve({ status: DeviceResponseStatus.Error })
          }
        }
      })
    })
  }
}

const createPurePhoneAdapter = (
  pureNode: any,
  ipcMain: MainProcessIpc
): PurePhoneAdapter => new PurePhone(pureNode, ipcMain)

export default createPurePhoneAdapter
