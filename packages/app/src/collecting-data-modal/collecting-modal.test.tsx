import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import CollectingModal from "App/collecting-data-modal/collecting-modal.component"
import { Provider } from "react-redux"
import * as appSettingsRequest from "Renderer/requests/app-settings.request"
import { fakeAppSettings } from "Backend/adapters/app-settings/app-settings-fake.adapter"
import { fireEvent, act, screen } from "@testing-library/react"
import settings from "Renderer/models/settings/settings"
import { init } from "@rematch/core"

const store = init({
  models: { settings },
})

const renderer = () => {
  return renderWithThemeAndIntl(
    <Provider store={store}>
      <CollectingModal />
    </Provider>
  )
}

describe("when user has no settings regarding collection of data", () => {
  beforeEach(() => {
    jest
      .spyOn(appSettingsRequest, "getAppSettings")
      .mockImplementation(() => Promise.resolve(fakeAppSettings))
  })
  afterEach(() => jest.resetAllMocks())
  test("modal is rendered", async () => {
    await act(async () => {
      renderer()
    })
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })
  describe("when user clicks not now button", () => {
    test("collecting data setting is set to false", async () => {
      await act(async () => {
        renderer()
      })
      jest.spyOn(store.dispatch.settings, "setCollectingData")
      fireEvent.click(
        screen.getByRole("button", {
          name: "[value] app.collecting.data.modal.cancel",
        })
      )
      expect(store.dispatch.settings.setCollectingData).toHaveBeenCalledWith(
        false
      )
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })
  })
  // TODO: test na klikniecie agree
})

describe.each([
  ["agreed", true],
  ["have not agreed", false],
])("when user %s to collecting data", (_, agreement) => {
  beforeEach(() => {
    jest
      .spyOn(appSettingsRequest, "getAppSettings")
      .mockImplementation(() =>
        Promise.resolve({ ...fakeAppSettings, appCollectingData: agreement })
      )
  })
  afterEach(() => jest.resetAllMocks())
  test("modal is not rendered", async () => {
    await act(async () => {
      renderer()
    })
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})
