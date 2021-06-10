/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import CollectingDataModal from "Renderer/wrappers/collecting-data-modal/collecting-data-modal.component"
import { Provider } from "react-redux"
import * as appSettingsRequest from "Renderer/requests/app-settings.request"
import { fakeAppSettings } from "Backend/adapters/app-settings/app-settings-fake.adapter"
import { act, screen } from "@testing-library/react"
import settings from "Renderer/models/settings/settings"
import { init } from "@rematch/core"
import { CollectingDataModalTestIds } from "Renderer/wrappers/collecting-data-modal/collecting-data-modal-test-ids.enum"
import { noop } from "Renderer/utils/noop"

const store = init({
  models: { settings },
})

const renderer = () => {
  return renderWithThemeAndIntl(
    <Provider store={store}>
      <CollectingDataModal open onActionButtonClick={noop} closeModal={noop} />
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
    expect(
      screen.getByTestId(CollectingDataModalTestIds.Subtitle)
    ).toHaveTextContent("[value] component.collectingDataModalText")
  })
  test("to body", async () => {
    expect(
      screen.getByTestId(CollectingDataModalTestIds.Body)
    ).toHaveTextContent("[value] component.collectingDataModalBody")
  })
})
