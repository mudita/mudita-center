/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import CollectingModal from "App/collecting-data-modal/collecting-modal.component"
import { Provider } from "react-redux"
import * as appSettingsRequest from "Renderer/requests/app-settings.request"
import { fakeAppSettings } from "Backend/adapters/app-settings/app-settings-fake.adapter"
import { fireEvent, act, screen } from "@testing-library/react"
import settings from "Renderer/models/settings/settings"
import { init } from "@rematch/core"
import { CollectingDataModalTestIds } from "App/collecting-data-modal/collecting-data-modal-test-ids.enum"

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
  beforeEach(async () => {
    jest
      .spyOn(appSettingsRequest, "getAppSettings")
      .mockImplementation(() => Promise.resolve(fakeAppSettings))
    await act(async () => {
      renderer()
    })
  })
  afterEach(() => jest.resetAllMocks())
  test("modal is rendered", async () => {
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })
  describe("when user clicks cancel button", () => {
    test("collecting data setting is set to false", async () => {
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
  describe("when user clicks agree button", () => {
    test("collecting data setting is set to true", async () => {
      jest.spyOn(store.dispatch.settings, "setCollectingData")
      fireEvent.click(
        screen.getByRole("button", {
          name: "[value] app.collecting.data.modal.agree",
        })
      )
      expect(store.dispatch.settings.setCollectingData).toHaveBeenCalledWith(
       true
      )
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })
  })
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

describe("correct translations are applied", () => {
  beforeEach(async () => {
    jest
      .spyOn(appSettingsRequest, "getAppSettings")
      .mockImplementation(() => Promise.resolve(fakeAppSettings))
    await act(async () => {
      renderer()
    })
  })
  test("to subtitle", async () => {
    expect(screen.getByTestId(CollectingDataModalTestIds.Subtitle)).toHaveTextContent(
      "[value] app.collecting.data.modal.text"
    )
  })
  test("to body", async () => {
    expect(screen.getByTestId(CollectingDataModalTestIds.Body)).toHaveTextContent(
      "[value] app.collecting.data.modal.body"
    )
  })
})
