/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React, {ComponentProps} from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { intl } from "Renderer/utils/intl"
import System from "Renderer/components/rest/overview/system/system.component"
import { fireEvent } from "@testing-library/dom"
import { OverviewTestIds } from "Renderer/modules/overview/overview-test-ids.enum"


type Props = ComponentProps<typeof System>

const defaultProps: Props = {
  osVersion: "0.55.1",
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<System {...props} />)
}

test("matches snapshot", () => {
  const { container } = render()
  expect(container).toMatchSnapshot()
})

test("renders os version properly", () => {
  const { getByTestId } = render()
  expect(getByTestId(OverviewTestIds.OsVersion)).toHaveTextContent(
    "[value] module.overview.muditaOsUpdateTitle 0.55.1"
  )
})

test("renders available update info properly", () => {
  const { getByText } = render({ updateAvailable: true })
  expect(
    getByText(
      intl.formatMessage({ id: "module.overview.systemUpdateAvailable" })
    )
  ).toBeInTheDocument()
})

test("renders You're up to date info properly", () => {
  const { getByText } = render({ updateAvailable: false })
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
