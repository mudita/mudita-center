import getFakeAdapters from "App/tests/get-fake-adapters"
import registerBatteryInfoRequest from "Backend/requests/battery/get-battery-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

jest.mock("electron-better-ipc", () => {
  const calls: Array<(...params: any[]) => any> = []
  return {
    ipcMain: {
      answerRenderer: jest.fn(
        (name, handler) =>
          name === IpcRequest.GetBatteryInfo && calls.push(handler)
      ),
      _flush: (value?: any) => calls.map(call => call(value)),
    },
  }
})

test("returns required device info", () => {
  registerBatteryInfoRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush()
  expect(result).toMatchInlineSnapshot(`
    Object {
      "charging": false,
      "level": 0.5,
      "maximumCapacity": 0.95,
    }
  `)
})
