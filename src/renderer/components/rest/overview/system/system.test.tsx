import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { SystemProps } from "Renderer/components/rest/overview/system/system.interface"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { intl } from "Renderer/utils/intl"
import System from "Renderer/components/rest/overview/system/system.component"
import { fireEvent } from "@testing-library/dom"
import { wait } from "@testing-library/react"

const fakeSystemInfo = getFakeAdapters().purePhone
const lastUpdate = fakeSystemInfo.getOsUpdateDate()
const fakeOsVersion = fakeSystemInfo.getOsVersion()

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
  const { getByText } = renderSystem()
  expect(getByText(fakeOsVersion)).toBeInTheDocument()
  expect(
    getByText(intl.formatMessage({ id: "view.name.overview.system.version" }))
  ).toBeInTheDocument()
})

test("renders last update info properly", () => {
  const { getByText } = renderSystem({ lastUpdate })
  expect(
    getByText(
      intl.formatMessage(
        { id: "view.name.overview.system.lastUpdate" },
        { date: lastUpdate }
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
    intl.formatMessage({ id: "view.name.overview.system.updateAction" })
  )
})

test("checks for update after button click", async () => {
  const onUpdateCheck = jest.fn()
  const onUpdate = jest.fn()

  const { getByRole } = renderSystem({
    onUpdateCheck,
    onUpdate,
  })

  fireEvent.click(getByRole("button"))

  await wait(() => {
    expect(onUpdateCheck).toHaveBeenCalled()
    expect(onUpdate).not.toHaveBeenCalled()
  })
})

test("triggers update after button click", async () => {
  const onUpdateCheck = jest.fn()
  const onUpdate = jest.fn()

  const { getByRole } = renderSystem({
    updateAvailable: true,
    onUpdateCheck,
    onUpdate,
  })

  fireEvent.click(getByRole("button"))

  await wait(() => {
    expect(onUpdateCheck).not.toHaveBeenCalled()
    expect(onUpdate).toHaveBeenCalled()
  })
})
