/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { setConversionFormat } from "./set-conversion-format.action"
import { ConversionFormat } from "App/settings/constants"
import { updateSettings } from "App/settings/requests"

jest.mock("App/settings/requests", () => ({
  updateSettings: jest.fn(),
}))

const mockStore = createMockStore([thunk])()

afterEach(() => {
  jest.clearAllMocks()
  mockStore.clearActions()
})

test.each([ConversionFormat.FLAC, ConversionFormat.MP3, ConversionFormat.WAV])(
  "calls `setConversionFormat` with payload: %s, and `updateSettings` request with value: %s",
  async (key) => {
    expect(updateSettings).not.toHaveBeenCalled()

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      setConversionFormat(key) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      setConversionFormat.pending(requestId, key),
      setConversionFormat.fulfilled(key, requestId, key),
    ])
    expect(updateSettings).toHaveBeenCalledWith({
      key: "conversionFormat",
      value: key,
    })
  }
)
