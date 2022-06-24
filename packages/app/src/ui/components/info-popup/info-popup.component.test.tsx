/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import { InfoPopupTestIds } from "App/ui/components/info-popup/info-popup-test-ids.enum"

type Props = ComponentProps<typeof InfoPopup>

const defaultProps: Props = {
  message: { id: "module.messages.conversationDelete" },
}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<InfoPopup {...props} />)
}

describe("InfoPopup component", () => {
  test("shows text properly", () => {
    const { getByTestId } = renderer()
    expect(getByTestId(InfoPopupTestIds.Text)).toHaveTextContent(
      "[value] module.messages.conversationDelete"
    )
  })
})
