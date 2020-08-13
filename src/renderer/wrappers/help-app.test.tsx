import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import HelpApp from "Renderer/wrappers/help-app.component"
import { createMemoryHistory } from "history"
import { URL_MAIN } from "Renderer/constants/urls"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { contentfulSecondQuestion, contentfulSeed } from "App/seeds/help"
import { waitFor } from "@testing-library/react"
import { HelpComponentTestIds } from "Renderer/modules/help/help.enum"
import { fireEvent } from "@testing-library/dom"

const renderer = () => {
  const saveToStore = jest.fn()
  const history = createMemoryHistory({ initialEntries: [URL_MAIN.help] })
  return renderWithThemeAndIntl(
    <HelpApp history={history} saveToStore={saveToStore} />
  )
}

const mockIpc = () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [HelpActions.DownloadContentfulData]: Promise.resolve({
      ...contentfulSeed,
    }),
  }
}

beforeEach(() => {
  mockIpc()
})

afterEach(() => {
  ;(ipcRenderer as any).__rendererCalls = {}
})

test("render questions correctly", async () => {
  const { getAllByTestId } = renderer()
  await waitFor(() =>
    expect(getAllByTestId(HelpComponentTestIds.Question)).toHaveLength(
      contentfulSeed.items.length
    )
  )
})

test("renders correct amount of questions after search", async () => {
  const { getByRole, findAllByTestId } = renderer()
  const searchInput = getByRole("searchbox")
  fireEvent.change(searchInput, {
    target: { value: contentfulSecondQuestion },
  })
  const questions = await findAllByTestId(HelpComponentTestIds.Question)
  expect(questions).toHaveLength(1)
})
