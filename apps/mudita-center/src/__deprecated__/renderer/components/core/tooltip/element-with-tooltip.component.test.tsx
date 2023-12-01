/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { fireEvent } from "@testing-library/react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import ElementWithTooltip from "App/__deprecated__/renderer/components/core/tooltip/element-with-tooltip.component"

type Props = ComponentProps<typeof ElementWithTooltip>

const defaultProps: Props = {
  Element: <div data-testid="element-div">Element text</div>,
  children: <div data-test-id="tooltip">Tooltip text</div>,
}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<ElementWithTooltip {...props} />)
}

describe("ElementWithTooltip component", () => {
  test("doesn't shows tooltip when text is not hover", () => {
    const { queryByText } = renderer()
    expect(queryByText("Tooltip text")).not.toBeVisible()
  })
  test("shows tooltip on hover when no need to ellipsis text", () => {
    const { getByTestId, getByText } = renderer()
    fireEvent.mouseOver(getByTestId("element-div"))
    expect(getByText("Tooltip text")).toBeInTheDocument()
  })
  describe("when showIfTextEllipsis is set to true", () => {
    test("don't show tooltip on hover when text is not ellipsis", () => {
      const { getByTestId, queryByText } = renderer({
        showIfTextEllipsis: true,
      })
      fireEvent.mouseOver(getByTestId("element-div"))
      expect(queryByText("Tooltip text")).not.toBeInTheDocument()
    })
  })
})
