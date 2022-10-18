/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { LongTextTooltip } from "App/ui/components/long-text-tooltip/long-text-tooltip.component"
import { LongTextTooltipTestIds } from "App/ui/components/long-text-tooltip/long-text-tooltip-test-ids"

type Props = ComponentProps<typeof LongTextTooltip>

const defaultProps: Props = {
  description: "Test text",
}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<LongTextTooltip {...props} />)
}

describe("LongTextTooltip component", () => {
  test("shows description properly", () => {
    const { getByTestId } = renderer()
    expect(getByTestId(LongTextTooltipTestIds.Text)).toHaveTextContent(
      "Test text"
    )
  })
  test("shows message properly", () => {
    const { getByTestId } = renderer({
      message: { id: "module.settings.backupLabel" },
      description: undefined,
    })
    expect(getByTestId(LongTextTooltipTestIds.Text)).toHaveTextContent(
      "[value] module.settings.backupLabel"
    )
  })
  test("shows message when description and message added", () => {
    const { getByTestId } = renderer({
      message: { id: "module.settings.backupLabel" },
    })
    expect(getByTestId(LongTextTooltipTestIds.Text)).toHaveTextContent(
      "[value] module.settings.backupLabel"
    )
  })
})
