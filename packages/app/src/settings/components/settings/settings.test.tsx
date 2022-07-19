/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { SettingsUI } from "App/settings/components/settings/settings-ui.component"
import { SettingsTestIds } from "App/settings/components/settings/settings.enum"

const renderer = (
  config = {
    autostart: false,
    tethering: false,
    collectingData: false,
    toggleTethering: jest.fn(),
    toggleCollectionData: jest.fn(),
  }
) => renderWithThemeAndIntl(<SettingsUI {...config} />)

test("renders wrapper properly", () => {
  const { queryByTestId } = renderer()
  expect(queryByTestId(SettingsTestIds.Wrapper)).toBeInTheDocument()
})

test("renders at least one table row", () => {
  const { queryAllByTestId } = renderer()
  expect(
    queryAllByTestId(SettingsTestIds.TableRow).length
  ).toBeGreaterThanOrEqual(1)
})
