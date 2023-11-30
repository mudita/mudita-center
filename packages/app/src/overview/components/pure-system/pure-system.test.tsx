/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import PureSystem from "App/overview/components/pure-system/pure-system.component"
import { PureSystemTestIds } from "App/overview/components/pure-system//pure-system-test-ids.enum"

type Props = ComponentProps<typeof PureSystem>

const defaultProps: Props = {
  serialNumber: "123",
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<PureSystem {...props} />)
}

describe("PureSystem", () => {
  test("should render serial number properly", () => {
    const { getByTestId } = render()
    expect(getByTestId(PureSystemTestIds.SerialNumber)).toHaveTextContent("123")
  })

  test("should render 'back to overview' button properly", () => {
    const { getByTestId } = render()
    expect(getByTestId(PureSystemTestIds.BackButton)).toHaveTextContent(
      intl.formatMessage({ id: "module.overview.pureSystemBack" })
    )
  })
})
