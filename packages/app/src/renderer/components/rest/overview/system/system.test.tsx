/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { SystemProps } from "Renderer/components/rest/overview/system/system.interface"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { intl } from "Renderer/utils/intl"
import System from "Renderer/components/rest/overview/system/system.component"
import { fireEvent } from "@testing-library/dom"
import { waitFor } from "@testing-library/react"

const fakeSystemInfo = getFakeAdapters().purePhone
const fakeLastUpdate = "2020-01-14T11:31:08.244Z"
let fakeOsVersion: string

beforeEach(async () => {
  const { data } = await fakeSystemInfo.getOsVersion()
  fakeOsVersion = data ?? ""
})

const renderSystem = ({
  osVersion = fakeOsVersion,
  lastUpdate = fakeLastUpdate,
  ...props
}: Partial<SystemProps> = {}) => {
  return renderWithThemeAndIntl(
    <System osVersion={osVersion} lastUpdate={lastUpdate} {...props} />
  )
}

test("matches snapshot", () => {
  const { container } = renderSystem()
  expect(container).toMatchSnapshot()
})

test("renders os version properly", () => {
  const { getByText } = renderSystem()
  expect(getByText(fakeOsVersion)).toBeInTheDocument()
  expect(
    getByText(intl.formatMessage({ id: "view.name.overview.system.version" }))
  ).toBeInTheDocument()
})

test("renders last update info properly", () => {
  const { getByText } = renderSystem()
  expect(
    getByText(
      intl.formatMessage(
        { id: "view.name.overview.system.lastUpdate" },
        { date: fakeLastUpdate }
      )
    )
  ).toBeInTheDocument()
})

test("renders available update info properly", () => {
  const { getByText } = renderSystem({ updateAvailable: true })
  expect(
    getByText(
      intl.formatMessage({ id: "view.name.overview.system.updateAvailable" })
    )
  ).toBeInTheDocument()
})

test("renders 'check for updates' button properly", () => {
  const { queryByRole } = renderSystem()
  expect(queryByRole("button")).toHaveTextContent(
    intl.formatMessage({ id: "view.name.overview.system.checkForUpdates" })
  )
})

test("renders 'update now' button properly", () => {
  const { queryByRole } = renderSystem({ updateAvailable: true })
  expect(queryByRole("button")).toHaveTextContent(
    intl.formatMessage({ id: "view.name.overview.system.downloadAction" })
  )
})

test("checks for update after button click", async () => {
  const onUpdateCheck = jest.fn()

  const { getByRole } = renderSystem({
    onUpdateCheck,
  })

  fireEvent.click(getByRole("button"))

  await waitFor(() => {
    expect(onUpdateCheck).toHaveBeenCalled()
  })
})

test("triggers download after button click", async () => {
  const onDownload = jest.fn()

  const { getByRole } = renderSystem({
    updateAvailable: true,
    onDownload,
  })

  fireEvent.click(getByRole("button"))

  await waitFor(() => {
    expect(onDownload).toHaveBeenCalled()
  })
})

test("triggers update after button click", async () => {
  const onUpdate = jest.fn()

  const { getByRole } = renderSystem({
    updateAvailable: true,
    updateDownloaded: true,
    onUpdate,
  })

  fireEvent.click(getByRole("button"))

  await waitFor(() => {
    expect(onUpdate).toHaveBeenCalled()
  })
})
