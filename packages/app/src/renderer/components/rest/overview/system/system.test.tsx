/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { SystemProps } from "Renderer/components/rest/overview/system/system.interface"
import { intl } from "Renderer/utils/intl"
import System from "Renderer/components/rest/overview/system/system.component"
import { fireEvent } from "@testing-library/dom"
import { OverviewTestIds } from "Renderer/modules/overview/overview-test-ids.enum"

const fakeOsVersion = "release-0.55.1"

const renderSystem = ({
  osVersion = fakeOsVersion,
  ...props
}: Partial<SystemProps> = {}) => {
  return renderWithThemeAndIntl(<System osVersion={osVersion} {...props} />)
}

test("matches snapshot", () => {
  const { container } = renderSystem()
  expect(container).toMatchSnapshot()
})

test("renders os version properly", () => {
  const { getByTestId } = renderSystem()
  expect(getByTestId(OverviewTestIds.OsVersion)).toHaveTextContent(
    "[value] module.overview.muditaOsUpdateTitle 0.55.1"
  )
})

test("renders available update info properly", () => {
  const { getByText } = renderSystem({ updateAvailable: true })
  expect(
    getByText(
      intl.formatMessage({ id: "module.overview.systemUpdateAvailable" })
    )
  ).toBeInTheDocument()
})

test("renders You're up to date info properly", () => {
  const { getByText } = renderSystem({ updateAvailable: false })
  expect(
    getByText(
      intl.formatMessage({ id: "module.overview.systemUpdateUpToDate" })
    )
  ).toBeInTheDocument()
})

test("renders 'check for updates' button properly", () => {
  const { queryByRole } = renderSystem()
  expect(queryByRole("button")).toHaveTextContent(
    intl.formatMessage({ id: "module.overview.systemCheckForUpdates" })
  )
})

test("renders 'update now' button properly", () => {
  const { queryByRole } = renderSystem({ updateAvailable: true })
  expect(queryByRole("button")).toHaveTextContent(
    intl.formatMessage({ id: "module.overview.systemDownloadAction" })
  )
})

test("checks for update after button click", () => {
  const onUpdateCheck = jest.fn()

  const { getByRole } = renderSystem({
    onUpdateCheck,
  })

  fireEvent.click(getByRole("button"))

  expect(onUpdateCheck).toHaveBeenCalled()
})

test("triggers download after button click", () => {
  const onDownload = jest.fn()

  const { getByRole } = renderSystem({
    updateAvailable: true,
    onDownload,
  })

  fireEvent.click(getByRole("button"))

  expect(onDownload).toHaveBeenCalled()
})

test("triggers update after button click", () => {
  const onUpdate = jest.fn()

  const { getByRole } = renderSystem({
    updateAvailable: true,
    updateDownloaded: true,
    onUpdate,
  })

  fireEvent.click(getByRole("button"))

  expect(onUpdate).toHaveBeenCalled()
})
