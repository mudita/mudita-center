/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import HelpApp from "Renderer/wrappers/help-app.component"
import { createMemoryHistory } from "history"
import { URL_MAIN } from "Renderer/constants/urls"
import { data } from "App/seeds/help"
import { waitFor } from "@testing-library/react"
import { HelpComponentTestIds } from "Renderer/modules/help/help.enum"
import { useHelpSearch } from "../utils/hooks/use-help-search/use-help-search"

const renderer = () => {
  return renderWithThemeAndIntl(
    <HelpApp
      history={createMemoryHistory({ initialEntries: [URL_MAIN.help] })}
    />
  )
}

jest.mock("../utils/hooks/use-help-search/use-help-search")

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn,
      append: jest.fn,
    }),
    MenuItem: () => jest.fn(),
  },
}))

beforeEach(() =>
  (useHelpSearch as jest.Mock).mockReturnValue({
    data,
    searchQuestion: jest.fn(),
  })
)
afterEach(() => (useHelpSearch as jest.Mock).mockRestore())

test("render questions correctly", async () => {
  const { getAllByTestId } = renderer()
  await waitFor(() =>
    expect(getAllByTestId(HelpComponentTestIds.Question)).toHaveLength(
      data.collection.length
    )
  )
})
