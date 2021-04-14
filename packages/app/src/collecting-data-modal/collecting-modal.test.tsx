import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import CollectingModal from "App/collecting-data-modal/collecting-modal.component"
import { Provider } from "react-redux"
import store from "Renderer/store"
import * as appSettingsRequest from "Renderer/requests/app-settings.request"
import { fakeAppSettings } from "Backend/adapters/app-settings/app-settings-fake.adapter"
import { act, screen } from "@testing-library/react"

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
})

describe("when user agreed to collecting data", () => {
  beforeEach(() => {
    jest
      .spyOn(appSettingsRequest, "getAppSettings")
      .mockImplementation(() =>
        Promise.resolve({ ...fakeAppSettings, appCollectingData: true })
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

describe("when user have not agreed to collecting data", () => {
  beforeEach(() => {
    jest
      .spyOn(appSettingsRequest, "getAppSettings")
      .mockImplementation(() =>
        Promise.resolve({ ...fakeAppSettings, appCollectingData: false })
      )
  })
  afterEach(() => jest.resetAllMocks())
  test("modal is not rendered ", async () => {
    await act(async () => {
      renderer()
    })
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})

