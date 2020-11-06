import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

import { MainProcessIpc } from "electron-better-ipc"
import PureNode from "pure"
import { EventName, ResponseStatus } from "pure/dist/types"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

class PurePhone extends PurePhoneAdapter {
  purePhoneId: string | undefined

  constructor(private pureNode: PureNode, private ipcMain: MainProcessIpc) {
    super()
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

  public async connectDevice(): Promise<DeviceResponse> {
    if (this.purePhoneId !== undefined) {
      return Promise.resolve({
        status: DeviceResponseStatus.Ok,
      })
    }

    const list = await PureNode.getPhones()
    const [purePhone] = list
    const id = purePhone?.id

    if (id) {
      const { status } = await this.pureNode.connect(id)
      if (status === ResponseStatus.Ok) {
        this.purePhoneId = id
        this.registerDisconnectedDeviceListener(id)

        return {
          status: DeviceResponseStatus.Ok,
        }
      } else {

        return {
          status: DeviceResponseStatus.Error,
        }
      }
    } else {

      return {
        status: DeviceResponseStatus.Error,
      }
    }
  }

  private registerDisconnectedDeviceListener(id: string) {
    this.pureNode.on(id, EventName.Disconnected, () => {
      this.ipcMain.sendToRenderers(IpcEmitter.DisconnectedDevice)
    })
  }
}

const createPurePhoneAdapter = (
  pureNode: PureNode,
  ipcMain: MainProcessIpc
): PurePhoneAdapter => new PurePhone(pureNode, ipcMain)

export default createPurePhoneAdapter
