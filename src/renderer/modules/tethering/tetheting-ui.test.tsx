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
  const props = { disconnectedDevice: true }
  test("disabled screen is shown", () => {
    const { queryByTestId } = renderer(props)
    expect(
      queryByTestId(TetheringTestIds.DisconnectedWrapper)
    ).toBeInTheDocument()
    expect(
      queryByTestId(TetheringTestIds.EnabledWrapper)
    ).not.toBeInTheDocument()
  })

  test("header is visible", () => {
    const { queryByTestId } = renderer(props)
    expect(
      queryByTestId(TetheringTestIds.DisconnectedNotificationTitle)
    ).toBeInTheDocument()
  })

  test("second notification is visible", () => {
    const { queryByTestId } = renderer(props)
    expect(
      queryByTestId(TetheringTestIds.SecondNotification)
    ).toBeInTheDocument()
  })

  test("third notification is visible", () => {
    const { queryByTestId } = renderer(props)
    expect(
      queryByTestId(TetheringTestIds.ThirdNotification)
    ).toBeInTheDocument()
  })

  test("button redirecting to settings is visible", () => {
    const { queryByTestId } = renderer(props)
    expect(queryByTestId(TetheringTestIds.GoToButton)).toBeInTheDocument()
  })

  test("image is visible", () => {
    const { queryByTestId } = renderer(props)
    expect(
      queryByTestId(TetheringTestIds.DisconnectedImage)
    ).toBeInTheDocument()
  })
})

describe("Enabled tethering tests", () => {
  test("enabled screen is shown", () => {
    const { queryByTestId } = renderer({
      tetheringEnabled: true,
      disconnectedDevice: false,
    })
    expect(queryByTestId(TetheringTestIds.EnabledWrapper)).toBeInTheDocument()
    expect(
      queryByTestId(TetheringTestIds.DisconnectedWrapper)
    ).not.toBeInTheDocument()
  })
})

describe("Disabled tethering tests", () => {
  const props = { tetheringEnabled: false, disconnectedDevice: false }
  test("disabled screen is shown", () => {
    const { queryByTestId } = renderer(props)
    expect(queryByTestId(TetheringTestIds.DisabledWrapper)).toBeInTheDocument()
    expect(
      queryByTestId(TetheringTestIds.DisconnectedWrapper)
    ).not.toBeInTheDocument()
  })

  test("second notification is visible", () => {
    const { queryByTestId } = renderer(props)
    expect(
      queryByTestId(TetheringTestIds.SecondNotification)
    ).toBeInTheDocument()
  })

  test("third notification is visible", () => {
    const { queryByTestId } = renderer(props)
    expect(
      queryByTestId(TetheringTestIds.ThirdNotification)
    ).toBeInTheDocument()
  })

  test("button redirecting to settings is visible", () => {
    const { queryByTestId } = renderer(props)
    expect(queryByTestId(TetheringTestIds.GoToButton)).toBeInTheDocument()
  })

  test("image is visible", () => {
    const { queryByTestId } = renderer(props)
    expect(queryByTestId(TetheringTestIds.DisabledImage)).toBeInTheDocument()
  })

  test("toggler works correctly", () => {
    const onToggleTethering = jest.fn()
    const { getByTestId } = renderer({ onToggleTethering, ...props })
    getByTestId(SettingsTogglerTestIds.Inactive).click()
    expect(onToggleTethering).toBeCalledWith(true)
  })
})
