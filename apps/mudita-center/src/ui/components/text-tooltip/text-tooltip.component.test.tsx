/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { TextTooltip } from "App/ui/components/text-tooltip/text-tooltip.component"
import { TextTooltipTestIds } from "App/ui/components/text-tooltip/text-tooltip-test-ids"

type Props = ComponentProps<typeof TextTooltip>

const defaultProps: Props = {
  description: "Test text",
}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<TextTooltip {...props} />)
}

describe("LongTextTooltip component", () => {
  test("shows description properly", () => {
    const { getByTestId } = renderer()
    expect(getByTestId(TextTooltipTestIds.Text)).toHaveTextContent("Test text")
  })
  test("shows message properly", () => {
    const { getByTestId } = renderer({
      message: { id: "module.settings.backupLabel" },
      description: undefined,
    })
    expect(getByTestId(TextTooltipTestIds.Text)).toHaveTextContent(
      "[value] module.settings.backupLabel"
    )
  })
  test("shows message when description and message added", () => {
    const { getByTestId } = renderer({
      message: { id: "module.settings.backupLabel" },
    })
    expect(getByTestId(TextTooltipTestIds.Text)).toHaveTextContent(
      "[value] module.settings.backupLabel"
    )
  })
})
