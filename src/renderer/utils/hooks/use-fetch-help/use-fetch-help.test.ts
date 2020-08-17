import { act, renderHook } from "@testing-library/react-hooks"
import { useFetchHelp } from "Renderer/utils/hooks/use-fetch-help/use-fetch-help"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { contentfulSeed, exampleQuestion } from "App/seeds/help"
import { ChangeEvent } from "react"

const mockIpc = () =>
  ((ipcRenderer as any).__rendererCalls = {
    [HelpActions.DownloadContentfulData]: Promise.resolve({
      ...contentfulSeed,
    }),
  })

beforeEach(() => mockIpc())

afterEach(() => {
  ;(ipcRenderer as any).__rendererCalls = {}
})

test("return correct amount of data", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useFetchHelp())
  await waitForNextUpdate()
  expect(result.current.data.collection).toHaveLength(
    contentfulSeed.items.length
  )
})

test("callback works", async () => {
  const saveToStore = jest.fn()
  const { waitForNextUpdate } = renderHook(() => useFetchHelp(saveToStore))
  await waitForNextUpdate()
  expect(saveToStore).toBeCalled()
})

test("search works", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useFetchHelp())
  await waitForNextUpdate()
  const event = { target: { value: exampleQuestion } }
  act(() => {
    result.current.searchQuestion(
      (event as unknown) as ChangeEvent<HTMLInputElement>
    )
  })

  expect(result.current.searchValue).toEqual(exampleQuestion)
  expect(result.current.data.collection).toHaveLength(1)
})
