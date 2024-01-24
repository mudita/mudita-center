/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { theme } from "generic-view/theme"
import { ThemeProvider } from "styled-components"
import { IconText } from "./icon-text"
import { IconType } from "generic-view/utils"
import dataTestIds from "./data-test-ids"

jest.mock("../../icon/icon", () => () => {
  return <div>icon</div>
})

describe("Icon text component", () => {
  it("Render", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <IconText
          data={{
            icon: IconType.Battery1,
            text: "Dummy text",
            subText: "Dummy subtext",
          }}
        />
      </ThemeProvider>
    )
    expect(getByTestId(dataTestIds.IconText)).toHaveTextContent(
      "Dummy text"
    )
    expect(getByTestId(dataTestIds.IconSubtext)).toHaveTextContent(
      "Dummy subtext"
    )
  })
  it("Render without detail text", () => {
    const { getByTestId, queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <IconText
          data={{
            icon: IconType.Battery1,
            text: "Dummy text",
          }}
        />
      </ThemeProvider>
    )
    expect(getByTestId(dataTestIds.IconText)).toHaveTextContent(
      "Dummy text"
    )
    expect(
      queryByTestId(dataTestIds.IconSubtext)
    ).not.toBeInTheDocument()
  })
})
