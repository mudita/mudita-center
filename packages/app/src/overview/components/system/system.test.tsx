/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import System from "App/overview/components/system/system.component"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"

type Props = ComponentProps<typeof System>

const defaultProps: Props = {
  osVersion: "1.0.0",
  checkForUpdateInProgress: false,
  checkForUpdatePerformed: true,
  checkForUpdateFailed: false,
  updateAvailable: false,
  updateDownloaded: false,
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<System {...props} />)
}

test("renders os version properly", () => {
  const { getByTestId } = render()
  expect(getByTestId(SystemTestIds.OsVersion)).toHaveTextContent(
    "[value] module.overview.muditaOsUpdateTitle 1.0.0"
  )
})

test("renders available update info properly", () => {
  const { getByText } = render({
    updateAvailable: true,
    checkForUpdatePerformed: true,
  })
  expect(
    getByText(
      intl.formatMessage({ id: "module.overview.systemUpdateAvailable" })
    )
  ).toBeInTheDocument()
})

test("renders You're up to date info properly", () => {
  const { getByText } = render({
    updateAvailable: false,
    checkForUpdatePerformed: true,
  })
  expect(
    getByText(
      intl.formatMessage({ id: "module.overview.systemUpdateUpToDate" })
    )
  ).toBeInTheDocument()
})

test("renders 'check for updates' button properly", () => {
  const { queryByRole } = render()
  expect(queryByRole("button")).toHaveTextContent(
    intl.formatMessage({ id: "module.overview.systemCheckForUpdates" })
  )
})

test("renders 'update now' button properly", () => {
  const { queryByRole } = render({ updateAvailable: true })
  expect(queryByRole("button")).toHaveTextContent(
    intl.formatMessage({ id: "module.overview.systemDownloadAction" })
  )
})

test("does not render any label when check for update was not performed", () => {
  const { queryByText } = render({
    updateAvailable: true,
    checkForUpdatePerformed: false,
  })
  expect(
    queryByText(
      intl.formatMessage({ id: "module.overview.systemUpdateAvailable" })
    )
  ).not.toBeInTheDocument()
  expect(
    queryByText(
      intl.formatMessage({ id: "module.overview.systemUpdateUpToDate" })
    )
  ).not.toBeInTheDocument()
  expect(
    queryByText(
      intl.formatMessage({ id: "module.overview.systemUpdateDownloaded" })
    )
  ).not.toBeInTheDocument()
})
test("does not render any label when check for update is in progress", () => {
  const { queryByText } = render({
    updateAvailable: true,
    checkForUpdatePerformed: true,
    checkForUpdateInProgress: true,
  })
  expect(
    queryByText(
      intl.formatMessage({ id: "module.overview.systemUpdateAvailable" })
    )
  ).not.toBeInTheDocument()
  expect(
    queryByText(
      intl.formatMessage({ id: "module.overview.systemUpdateUpToDate" })
    )
  ).not.toBeInTheDocument()
  expect(
    queryByText(
      intl.formatMessage({ id: "module.overview.systemUpdateDownloaded" })
    )
  ).not.toBeInTheDocument()
})

test("checks for update after button click", () => {
  const onUpdateCheck = jest.fn()

  const { getByRole } = render({
    onUpdateCheck,
  })

  fireEvent.click(getByRole("button"))

  expect(onUpdateCheck).toHaveBeenCalled()
})

test("triggers download after button click", () => {
  const onDownload = jest.fn()

  const { getByRole } = render({
    updateAvailable: true,
    onDownload,
  })

  fireEvent.click(getByRole("button"))

  expect(onDownload).toHaveBeenCalled()
})

test("triggers update after button click", () => {
  const onUpdate = jest.fn()

  const { getByRole } = render({
    updateAvailable: true,
    updateDownloaded: true,
    onUpdate,
  })

  fireEvent.click(getByRole("button"))

  expect(onUpdate).toHaveBeenCalled()
})
