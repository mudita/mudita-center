import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import HelpApp from "Renderer/wrappers/help-app.component"
import { createMemoryHistory } from "history"
import { URL_MAIN } from "Renderer/constants/urls"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { contentfulSeed } from "App/seeds/help"
import { waitFor } from "@testing-library/react"

test("render questions correctly", async () => {
  const saveToStore = jest.fn()
  const history = createMemoryHistory({ initialEntries: [URL_MAIN.help] })
  ;(ipcRenderer as any).__rendererCalls = {
    [HelpActions.DownloadContentfulData]: Promise.resolve({
      ...contentfulSeed,
    }),
  }
  const { getAllByTestId } = renderWithThemeAndIntl(
    <HelpApp history={history} saveToStore={saveToStore} />
  )
  await waitFor(() =>
    expect(getAllByTestId("question")).toHaveLength(contentfulSeed.items.length)
  )
})
