/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import PasscodeLocked from "App/passcode-modal/components/PasscodeLocked/passcode-locked.component"
import { PasscodeLockedTestIds } from "App/passcode-modal/components/PasscodeLocked/passcode-locked-test-ids.enum"
import * as MockDate from "mockdate"

type Props = ComponentProps<typeof PasscodeLocked>

const defaultProps: Props = {
  time: 1630888183,
}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(<PasscodeLocked {...props} />)
}

MockDate.set("2021-9-6")

describe("Time lock info", () => {
  test("should show properly hours", () => {
    const { getByTestId } = renderer({ time: 1630902523 })
    expect(getByTestId(PasscodeLockedTestIds.Timer)).toHaveTextContent(
      `[value] component.passcodeModalTryAgain in 4 hours.`
    )
  })
  test("should show time properly", () => {
    const { getByTestId } = renderer()
    expect(getByTestId(PasscodeLockedTestIds.Timer)).toHaveTextContent(
      `[value] component.passcodeModalTryAgain in 30 minutes.`
    )
  })
})
