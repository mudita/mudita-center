/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Provider } from "react-redux"
import createMockStore, { MockStore } from "redux-mock-store"
import thunk from "redux-thunk"
import {
  renderHook,
  act,
  RenderHookResult,
  RenderOptions,
} from "@testing-library/react"
import useUploadFile from "App/files-manager/components/files-manager/use-upload-file"
import { AnyAction, createAsyncThunk, PreloadedState } from "@reduxjs/toolkit"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { uploadFile } from "App/files-manager/actions"

jest.mock("App/files-manager/actions/upload-file.action")

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<ReduxRootState>
  store?: MockStore
}
const defaultState = {} as ReduxRootState

export function renderHookWithProviders<Result, Props>(
  render: (initialProps: Props) => Result,
  {
    preloadedState = {},
    store = createMockStore([thunk])({ ...defaultState, ...preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): RenderHookResult<Result, Props> & {
  store: MockStore<unknown, AnyAction>
} {
  return {
    store,
    ...renderHook(render, {
      ...renderOptions,
      wrapper: ({ children }) => {
        return <Provider store={store}>{children}</Provider>
      },
    }),
  }
}

describe("useUploadFile", () => {
  beforeAll(() => {
    ;(uploadFile as unknown as jest.Mock).mockImplementation(
      createAsyncThunk<void, void, { state: ReduxRootState }>(
        "files/uploadFile",
        async () => {}
      )
    )
  })
  it("should handle file upload", () => {
    const { result, unmount } = renderHookWithProviders(() => useUploadFile())

    // Call the function to handle file upload
    act(() => {
      result.current.handleUploadFiles()
    })

    // Simulate the effect of unmounting
    act(() => {
      unmount()
    })

    // Check if the abort function has been called
    expect(uploadFile).toHaveBeenCalled()
  })
})
