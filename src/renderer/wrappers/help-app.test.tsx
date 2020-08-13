import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import HelpApp from "Renderer/wrappers/help-app.component"
import { createMemoryHistory } from "history"
import { URL_MAIN } from "Renderer/constants/urls"
import { data } from "App/seeds/help"
import { waitFor } from "@testing-library/react"
import { HelpComponentTestIds } from "Renderer/modules/help/help.enum"
import { useFetchHelp } from "../utils/hooks/use-fetch-help/use-fetch-help"

const renderer = () => {
  return renderWithThemeAndIntl(
    <HelpApp
      history={createMemoryHistory({ initialEntries: [URL_MAIN.help] })}
    />
  )
}

jest.mock("../utils/hooks/use-fetch-help/use-fetch-help")

test("render questions correctly", async () => {
  ;(useFetchHelp as jest.Mock).mockReturnValue({ data })
  const { getAllByTestId } = renderer()
  await waitFor(() =>
    expect(getAllByTestId(HelpComponentTestIds.Question)).toHaveLength(
      data.collection.length
    )
  )
  ;(useFetchHelp as jest.Mock).mockRestore()
})
