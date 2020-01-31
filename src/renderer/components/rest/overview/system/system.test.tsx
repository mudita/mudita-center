import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { SystemProps } from "Renderer/components/rest/overview/system/system.interface"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { intl } from "Renderer/utils/intl"
import { CustomizableSystem } from "Renderer/components/rest/overview/system/system.stories"

const fakeSystemInfo = getFakeAdapters().purePhone
const osVersion = fakeSystemInfo.getOsVersion()
const lastUpdate = fakeSystemInfo.getOsUpdateDate()

const renderSystem = ({ ...props }: Partial<SystemProps> = {}) => {
  const outcome = renderWithThemeAndIntl(<CustomizableSystem {...props} />)
  return {
    ...outcome,
    getButton: () => outcome.queryByRole("button"),
  }
}

test("matches snapshot", () => {
  const { container } = renderSystem()
  expect(container).toMatchSnapshot()
})

test("renders os version properly", () => {
  const { queryByText } = renderSystem()
  expect(queryByText(osVersion)).toBeInTheDocument()
  expect(
    queryByText(intl.formatMessage({ id: "view.name.overview.system.version" }))
  ).toBeInTheDocument()
})

test("renders last update info properly", () => {
  const { queryByText } = renderSystem({
    lastUpdate,
  })
  expect(
    queryByText(
      intl.formatMessage(
        { id: "view.name.overview.system.lastUpdate" },
        { date: new Date(lastUpdate).toLocaleDateString() }
      )
    )
  ).toBeInTheDocument()
})
