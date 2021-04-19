import { renderHook, act } from "@testing-library/react-hooks"
import { useContactSupport } from "Renderer/utils/contact-support/use-contact-support"
import { ipcRenderer } from "electron-better-ipc"
import { AppLogsEvents } from "App/main/functions/register-app-logs-listener"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"

let axiosMock = new MockAdapter(axios)

const appLogs = "Example mudita app logs"
beforeEach(() => {
  ;(ipcRenderer as any).__rendererCalls = {
    [AppLogsEvents.Get]: Promise.resolve(appLogs),
  }
})

test("initially all modals are closed", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useContactSupport())
  await act(waitForNextUpdate)
  expect(result.current.openModal).toStrictEqual({
    contactModal: false,
    successModal: false,
    failModal: false,
  })
})

test("logs are appended correctly", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useContactSupport())
  await act(waitForNextUpdate)
  expect(result.current.log).toContain(appLogs)
})

test("success modal is opened when request is successful", async () => {
  axiosMock.onPost().reply(200)
  const { result } = renderHook(() => useContactSupport())

  await act(async () => {
    await result.current.sendForm({
      email: "hello@mudita.com",
      message: "Some message",
    })
  })
  expect(result.current.openModal.successModal).toBeTruthy()
})

test("fail modal is opened when request failed", async () => {
  axiosMock.onPost().reply(400)
  const { result } = renderHook(() => useContactSupport())
  await act(async () => {
    await result.current.sendForm({
      email: "hello@mudita.com",
      message: "Some message",
    })
  })
  expect(result.current.openModal.failModal).toBeTruthy()
})
