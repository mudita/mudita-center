/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import { fireEvent } from "@testing-library/react"
import React from "react"
import Tooltip from "Renderer/components/core/tooltip/tooltip.component"
import { mockDefineMessages } from "Renderer/utils/mock-define-messages"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { TooltipTestIds } from "Renderer/components/core/tooltip/tooltip.enum"

test("should render tooltip description", () => {
  const description = mockDefineMessages("Example")
  const { getByText, getByTestId } = renderWithThemeAndIntl(
    <Tooltip description={description} />
  )
  fireEvent.mouseOver(getByTestId(TooltipTestIds.Icon))
  expect(getByText(description.id)).toBeInTheDocument()
})
