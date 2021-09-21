/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import AboutUI from "./about-ui.component"
import { noop } from "App/renderer/utils/noop"
import { AboutTestIds } from "./about.enum"

const renderer = (
  config = {
    openLicense: noop,
    openTermsOfService: noop,
    openPrivacyPolicy: noop,
    appLatestVersion: "0.20.2",
    appCurrentVersion: "0.19.0",
    appUpdateAvailable: true,
    click: noop
  }
) => renderWithThemeAndIntl(<AboutUI {...config} />)

test("renders wrapper properly", () => {
  const { queryByTestId } = renderer()
  expect(queryByTestId(AboutTestIds.Wrapper)).toBeInTheDocument()
})

test("renders at least one table row", () => {
  const { queryAllByTestId } = renderer()
  expect(queryAllByTestId(AboutTestIds.TableRow).length).toBeGreaterThanOrEqual(
    1
  )
})
