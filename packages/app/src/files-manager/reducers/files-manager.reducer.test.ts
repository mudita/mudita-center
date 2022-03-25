/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import {
  filesManagerReducer,
  initialState,
} from "App/files-manager/reducers/files-manager.reducer"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers"
import { GetFilesError } from "App/files-manager/errors"
import { FilesManagerEvent } from "App/files-manager/constants"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"
import { McUsbFile, McUsbFileType } from "App/mc-usb"

test("empty event returns initial state", () => {
  expect(filesManagerReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Getting files functionality", () => {
  test("Event: `getFiles/pending` change `resultState` to Loading", () => {
    expect(
      filesManagerReducer(undefined, {
        type: pendingAction(FilesManagerEvent.GetFiles),
      })
    ).toEqual({
      ...initialState,
      resultState: ResultState.Loading,
    })
  })

  test("Event: `getFiles/fulfilled` change `resultState` to Loaded", () => {
    expect(
      filesManagerReducer(undefined, {
        type: fulfilledAction(FilesManagerEvent.GetFiles),
      })
    ).toEqual({
      ...initialState,
      resultState: ResultState.Loaded,
    })
  })

  test("Event: `getFiles/rejected` change `resultState` to Error", () => {
    const errorMock = new GetFilesError("I'm error")

    expect(
      filesManagerReducer(undefined, {
        type: rejectedAction(FilesManagerEvent.GetFiles),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      resultState: ResultState.Error,
      error: errorMock,
    })
  })
})

describe("Set Files data functionality", () => {
  const file: McUsbFile = {
    id: "1",
    size: 1234,
    name: "example_file_name",
    type: McUsbFileType.mp3,
  }

  test("Event: SetFiles set files field", () => {
    const setFilesAction: PayloadAction<McUsbFile[]> = {
      type: FilesManagerEvent.SetFiles,
      payload: [file],
    }

    expect(
      filesManagerReducer(
        {
          ...initialState,
          files: [file],
        },
        setFilesAction
      )
    ).toEqual({
      ...initialState,
      files: [file],
    })
  })
})
