/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { PureSystemTestIds } from "App/overview/components/pure-system/pure-system-test-ids.enum"
import SarComponent from "App/overview/components/pure-system//sar.component"

const render = () => {
  return renderWithThemeAndIntl(<SarComponent />)
}

describe("SAR window", () => {
  test("should render properly", () => {
    const { getByTestId } = render()
    expect(getByTestId(PureSystemTestIds.SarWrapper)).toBeInTheDocument()
  })

  test("should render first paragraph correctly", () => {
    const paragraphText =
      "THE EQUIPMENT MEETS INTERNATIONAL REQUIREMENTS FOR EXPOSURE TO RADIO WAVES. The mobile phone is a radio frequency receiver/transmitter."
    const { getByTestId } = render()
    expect(getByTestId(PureSystemTestIds.SarParagraph)).toHaveTextContent(
      paragraphText
    )
  })
})
