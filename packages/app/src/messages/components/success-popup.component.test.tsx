/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import SuccessPopup from "App/messages/components/success-popup.component"
import { SuccessPopupTestIds } from "App/messages/components/success-popup-test-ids.enum"

type Props = ComponentProps<typeof SuccessPopup>

const defaultProps: Props = {
  ids: ["1"],
}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<SuccessPopup {...props} />)
}

describe("SuccessPopup component", () => {
  test("shows one deleted thread text", () => {
    const { getByTestId } = renderer()
    expect(getByTestId(SuccessPopupTestIds.Text)).toHaveTextContent(
      "[value] module.messages.conversationDelete"
    )
  })

  test("show multiple messages info", () => {
    const { getByTestId } = renderer({ ids: ["1", "2", "3"] })
    expect(getByTestId(SuccessPopupTestIds.Text)).toHaveTextContent(
      "[value] module.messages.conversationsDelete"
    )
  })
})
