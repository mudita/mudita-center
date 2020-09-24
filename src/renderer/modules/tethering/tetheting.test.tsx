import "@testing-library/jest-dom"
import React from "react"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Tethering from "Renderer/modules/tethering/tethering.component"
import { TetheringTestIds } from "Renderer/modules/tethering/screens/tethering.enum"

const renderer = (enabled = false) =>
  renderWithThemeAndIntl(
    <Router history={history}>
      <Tethering test enabled={enabled} />
    </Router>
  )

describe("Disabled tethering tests", () => {
  test("disabled screen is shown", () => {
    const { queryByTestId } = renderer()
    expect(queryByTestId(TetheringTestIds.DisabledWrapper)).toBeInTheDocument()
    expect(
      queryByTestId(TetheringTestIds.EnabledWrapper)
    ).not.toBeInTheDocument()
  })

  test("header is visible", () => {
    const { queryByTestId } = renderer()
    expect(
      queryByTestId(TetheringTestIds.DisabledNotificationTitle)
    ).toBeInTheDocument()
  })

  test("second notification is visible", () => {
    const { queryByTestId } = renderer()
    expect(
      queryByTestId(TetheringTestIds.DisabledSecondNotification)
    ).toBeInTheDocument()
  })

  test("third notification is visible", () => {
    const { queryByTestId } = renderer()
    expect(
      queryByTestId(TetheringTestIds.DisabledThirdNotification)
    ).toBeInTheDocument()
  })

  test("button redirecting to settings is visible", () => {
    const { queryByTestId } = renderer()
    expect(
      queryByTestId(TetheringTestIds.DisabledGotoButton)
    ).toBeInTheDocument()
  })

  test("image is visible", () => {
    const { queryByTestId } = renderer()
    expect(queryByTestId(TetheringTestIds.DisabledImage)).toBeInTheDocument()
  })
})

describe("Enabled tethering tests", () => {
  test("enabled screen is shown", () => {
    const { queryByTestId } = renderer(true)
    expect(queryByTestId(TetheringTestIds.EnabledWrapper)).toBeInTheDocument()
    expect(
      queryByTestId(TetheringTestIds.DisabledWrapper)
    ).not.toBeInTheDocument()
  })
})
