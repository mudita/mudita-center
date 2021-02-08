import { act, renderHook } from "@testing-library/react-hooks"
import { useHelpSearch } from "Renderer/utils/hooks/use-help-search/use-help-search"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { testSeed, testQuestion, testSeedCollectionIds } from "App/seeds/help"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { fakeAppSettings } from "Backend/adapters/app-settings/app-settings-fake.adapter"
import { defaultHelpItems } from "App/main/store/default-help-items"

const mockIpc = () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [HelpActions.DownloadContentfulData]: Promise.resolve({
      ...testSeed,
    }),
    [IpcRequest.GetAppSettings]: Promise.resolve(fakeAppSettings),
  }
}

jest.mock("lodash/debounce", () => (fn: unknown) => fn)

const onLine = jest.spyOn(window.navigator, "onLine", "get")
const mockOnlineStatus = () => onLine.mockReturnValue(true)
const saveToStore = jest.fn()
const getStoreData = jest.fn()

const mockOnlineScenario = () => {
  mockOnlineStatus()
  mockIpc()
  getStoreData.mockReturnValue(testSeed.data)
}

const renderer = () => {
  return renderHook(() => useHelpSearch(saveToStore, getStoreData))
}

describe("Online scenario", () => {
  beforeEach(() => mockOnlineScenario())
  afterEach(() => {
    ;(ipcRenderer as any).__rendererCalls = {}
  })
  test("return correct amount of data", async () => {
    const { result, waitForNextUpdate } = renderer()
    await waitForNextUpdate()
    expect(result.current.data.collection).toHaveLength(
      testSeed.data.collection.length
    )
  })

  test("callback works", async () => {
    const { waitForNextUpdate } = renderer()
    await waitForNextUpdate()
    expect(saveToStore).toBeCalled()
  })

  test("search works", async () => {
    const { result, waitForNextUpdate } = renderer()
    await waitForNextUpdate()
    act(() => {
      result.current.searchQuestion(testQuestion.substring(0, 10))
    })
    expect(result.current.data.collection).toHaveLength(1)
  })

  test("collection contains desired ids", async () => {
    const { result, waitForNextUpdate } = renderer()
    await waitForNextUpdate()
    expect(result.current.data.collection).toEqual(testSeedCollectionIds)
  })
})

test("returns default data when offline", async () => {
  onLine.mockReturnValue(false)
  const { result, waitForNextUpdate } = renderHook(() =>
    useHelpSearch(saveToStore, getStoreData)
  )
  await waitForNextUpdate()
  expect(result.current.data.collection).toHaveLength(
    defaultHelpItems.collection.length
  )
})
