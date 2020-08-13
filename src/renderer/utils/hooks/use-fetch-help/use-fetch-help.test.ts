import { renderHook } from "@testing-library/react-hooks"
import { useFetchHelp } from "Renderer/utils/hooks/use-fetch-help/use-fetch-help"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { contentfulSeed } from "App/seeds/help"

afterEach(() => {
  ;(ipcRenderer as any).__rendererCalls = {}
})

const mockIpc = () =>
  ((ipcRenderer as any).__rendererCalls = {
    [HelpActions.DownloadContentfulData]: Promise.resolve({
      ...contentfulSeed,
    }),
  })

test("return correct amount of data", async () => {
  mockIpc()
  const { result, waitForNextUpdate } = renderHook(() => useFetchHelp())
  await waitForNextUpdate()
  expect(result.current.data.collection).toHaveLength(
    contentfulSeed.items.length
  )
})

test("callback works", async () => {
  mockIpc()
  const saveToStore = jest.fn()
  const { waitForNextUpdate } = renderHook(() => useFetchHelp(saveToStore))
  await waitForNextUpdate()
  expect(saveToStore).toBeCalled()
})
