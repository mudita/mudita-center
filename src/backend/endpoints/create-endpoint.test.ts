import Adapters from "Backend/adapters/adapters.interface"
import createFakeElectronAppAdapter from "Backend/adapters/electron-app/fake-electron-app.adapter"
import createFakePurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-fake.adapter"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

enum TestRequests {
  GetTestData = "get-test-data",
}

const adapters: Adapters = {
  app: createFakeElectronAppAdapter(),
  purePhone: createFakePurePhoneAdapter(),
}

jest.mock("electron-better-ipc", () => {
  const calls: Array<(...params: any[]) => any> = []
  return {
    ipcMain: {
      answerRenderer: jest.fn(
        (name, handler) =>
          name === TestRequests.GetTestData && calls.push(handler)
      ),
      _flush: (value: any) => calls.map(call => call(value)),
    },
  }
})

test("registers an endpoint on IPC", () => {
  const name = (TestRequests.GetTestData as unknown) as IpcRequest
  const testValue = "II"
  const handler = ({ app }: Adapters, testData: string) =>
    `${app.getName()} ${testData}`
  createEndpoint<string, string>({ name, handler })(adapters)
  const result = (ipcMain as any)._flush(testValue)
  expect(result).toHaveLength(1)
  expect(result[0]).toBe(`${adapters.app.getName()} ${testValue}`)
})
