/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SystemUpdateText } from "App/overview/components/system-update-text/system-update-text.component"
import { SystemUpdateTextProps } from "App/overview/components/system-update-text/system-update-text.interface"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"

const defaultProps: SystemUpdateTextProps = {
  checkForUpdateFailed: false,
  checkForUpdateInProgress: false,
  checkForUpdatePerformed: false,
  updateAvailable: false,
  updateDownloaded: false,
}

const render = (extraProps?: Partial<SystemUpdateTextProps>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<SystemUpdateText {...props} />)
}

test("renders nothing for update in progress state", () => {
  const { container } = render({
    checkForUpdateInProgress: true,
  })

  expect(container).toBeEmptyDOMElement()
})

test("renders update check failed", () => {
  const { queryByText } = render({
    checkForUpdateFailed: true,
  })

  expect(
    queryByText("[value] module.overview.systemUpdateCheckFailed")
  ).toBeInTheDocument()
})

test("renders update downloaded info", () => {
  const { queryByText } = render({
    checkForUpdatePerformed: true,
    updateAvailable: true,
    updateDownloaded: true,
  })

  expect(
    queryByText("[value] module.overview.systemUpdateDownloaded")
  ).toBeInTheDocument()
})

test("renders update available info", () => {
  const { queryByText } = render({
    checkForUpdatePerformed: true,
    updateAvailable: true,
    updateDownloaded: false,
  })

  expect(
    queryByText("[value] module.overview.systemUpdateAvailable")
  ).toBeInTheDocument()
})

test("renders system up to date info", () => {
  const { queryByText } = render({
    checkForUpdatePerformed: true,
    updateAvailable: false,
    updateDownloaded: false,
    checkForUpdateFailed: false,
    checkForUpdateInProgress: false,
  })

  expect(
    queryByText("[value] module.overview.systemUpdateUpToDate")
  ).toBeInTheDocument()
})
