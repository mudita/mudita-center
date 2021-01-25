import "@testing-library/jest-dom"
import React from "react"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import TetheringUI from "Renderer/modules/tethering/tethering-ui.component"
import { TetheringTestIds } from "Renderer/modules/tethering/screens/tethering.enum"
import { SettingsTogglerTestIds } from "Renderer/components/rest/settings/settings-toggler-test-ids.enum"
import { Provider } from "react-redux"
import store from "Renderer/store"

const renderer = (props = {}) =>
  renderWithThemeAndIntl(
    <Router history={history}>
      <Provider store={store}>
        <TetheringUI {...props} />
      </Provider>
    </Router>
  )

describe("Pure disconnected screen tests", () => {
  const props = { deviceConnected: false }
  test("disabled screen is shown", () => {
    const { getByTestId, queryByTestId } = renderer(props)
    expect(getByTestId(TetheringTestIds.DisconnectedWrapper)).toBeVisible()
    expect(
      queryByTestId(TetheringTestIds.EnabledWrapper)
    ).not.toBeInTheDocument()
  })

  test("header is visible", () => {
    const { getByTestId } = renderer(props)
    expect(
      getByTestId(TetheringTestIds.DisconnectedNotificationTitle)
    ).toBeVisible()
  })

  test("Start tethering notification is visible", () => {
    const { getByTestId } = renderer(props)
    expect(
      getByTestId(TetheringTestIds.StartTetheringNotification)
    ).toBeVisible()
  })

  test("modem notification is visible", () => {
    const { getByTestId } = renderer(props)
    expect(getByTestId(TetheringTestIds.ModemNotification)).toBeVisible()
  })

  test("button redirecting to settings is visible", () => {
    const { getByTestId } = renderer(props)
    expect(getByTestId(TetheringTestIds.GoToButton)).toBeVisible()
  })

  test("disconnected image is visible", () => {
    const { getByTestId } = renderer(props)
    expect(getByTestId(TetheringTestIds.DisconnectedImage)).toBeVisible()
  })
})

describe("Enabled tethering tests", () => {
  const props = {
    tetheringEnabled: true,
    deviceConnected: true,
  }
  test("enabled screen is shown", () => {
    const { getByTestId, queryByTestId } = renderer(props)
    expect(getByTestId(TetheringTestIds.EnabledWrapper)).toBeVisible()
    expect(
      queryByTestId(TetheringTestIds.DisconnectedWrapper)
    ).not.toBeInTheDocument()
  })

  test("Start tethering notification is visible", () => {
    const { getByTestId } = renderer(props)
    expect(
      getByTestId(TetheringTestIds.StartTetheringNotification)
    ).toBeVisible()
  })

  test("button redirecting to settings is visible", () => {
    const { getByTestId } = renderer(props)
    expect(getByTestId(TetheringTestIds.GoToButton)).toBeVisible()
  })
})

describe("Disabled tethering tests", () => {
  const props = { tetheringEnabled: false, deviceConnected: true }
  test("disabled screen is shown", () => {
    const { getByTestId, queryByTestId } = renderer(props)
    expect(getByTestId(TetheringTestIds.DisabledWrapper)).toBeVisible()
    expect(
      queryByTestId(TetheringTestIds.DisconnectedWrapper)
    ).not.toBeInTheDocument()
  })

  test("Start tethering notification is visible", () => {
    const { getByTestId } = renderer(props)
    expect(
      getByTestId(TetheringTestIds.StartTetheringNotification)
    ).toBeVisible()
  })

  test("Modem notification is visible", () => {
    const { getByTestId } = renderer(props)
    expect(getByTestId(TetheringTestIds.ModemNotification)).toBeVisible()
  })

  test("button redirecting to settings is visible", () => {
    const { getByTestId } = renderer(props)
    expect(getByTestId(TetheringTestIds.GoToButton)).toBeVisible()
  })

  test("image is visible", () => {
    const { getByTestId } = renderer(props)
    expect(getByTestId(TetheringTestIds.DisabledImage)).toBeVisible()
  })

  test("toggler works correctly", () => {
    const onToggleTethering = jest.fn()
    const { getByTestId } = renderer({ onToggleTethering, ...props })
    getByTestId(SettingsTogglerTestIds.Inactive).click()
    expect(onToggleTethering).toBeCalledWith(true)
  })
})
