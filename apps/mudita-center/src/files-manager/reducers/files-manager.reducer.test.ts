/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import {
  filesManagerReducer,
  initialState,
} from "App/files-manager/reducers/files-manager.reducer"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"
import { FilesManagerEvent } from "App/files-manager/constants"
import { File } from "App/files-manager/dto"
import { CoreEvent } from "App/core/constants"

const payload: File[] = [
  {
    id: "user/music/example_file_name.mp3",
    size: 1234,
    name: "example_file_name.mp3",
    type: "mp3",
  },
  {
    id: "user/music/second_example_file_name.wav",
    size: 12345,
    name: "second_example_file_name.wav",
    type: "wav",
  },
]

test("empty event returns initial state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(filesManagerReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Getting files functionality", () => {
  test("Event: `getFiles/pending` change `loading` to State.Loading", () => {
    expect(
      filesManagerReducer(undefined, {
        type: pendingAction(FilesManagerEvent.GetFiles),
      })
    ).toEqual({
      ...initialState,
      loading: State.Loading,
    })
  })

  test("Event: `getFiles/fulfilled` change `loading` to State.Loaded", () => {
    expect(
      filesManagerReducer(undefined, {
        type: fulfilledAction(FilesManagerEvent.GetFiles),
        payload,
      })
    ).toEqual({
      ...initialState,
      files: payload,
      loading: State.Loaded,
    })
  })

  test("Event: `getFiles/rejected` change `loading` to State.Failed", () => {
    const errorMock = new AppError("SOME_ERROR_TYPE", "I'm error")

    expect(
      filesManagerReducer(undefined, {
        type: rejectedAction(FilesManagerEvent.GetFiles),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      loading: State.Failed,
      error: errorMock,
    })
  })
})

describe("Select files functionality", () => {
  test("Event: FilesManagerEven.SelectAllItems set provided ids to `selectedItems.rows`", () => {
    expect(
      filesManagerReducer(initialState, {
        type: fulfilledAction(FilesManagerEvent.SelectAllItems),
        payload: ["1", "2"],
      })
    ).toEqual({
      ...initialState,
      selectedItems: {
        ...initialState.selectedItems,
        rows: ["1", "2"],
      },
    })
  })

  test("Event: FilesManagerEven.ToggleItem set provided ids to `selectedItems.rows`", () => {
    expect(
      filesManagerReducer(initialState, {
        type: fulfilledAction(FilesManagerEvent.ToggleItem),
        payload: ["1", "2"],
      })
    ).toEqual({
      ...initialState,
      selectedItems: {
        ...initialState.selectedItems,
        rows: ["1", "2"],
      },
    })
  })

  test("Event: FilesManagerEven.ResetAllItems removes all selected items", () => {
    expect(
      filesManagerReducer(
        {
          ...initialState,
          selectedItems: {
            ...initialState.selectedItems,
            rows: ["1", "2"],
          },
        },
        {
          type: FilesManagerEvent.ResetAllItems,
          payload: undefined,
        }
      )
    ).toEqual({
      ...initialState,
      selectedItems: {
        ...initialState.selectedItems,
        rows: [],
      },
    })
  })
  test("Event: CoreEvent.ChangeLocation removes all selected items", () => {
    expect(
      filesManagerReducer(
        {
          ...initialState,
          selectedItems: {
            ...initialState.selectedItems,
            rows: ["1", "2"],
          },
        },
        {
          type: CoreEvent.ChangeLocation,
          payload: undefined,
        }
      )
    ).toEqual({
      ...initialState,
      selectedItems: {
        ...initialState.selectedItems,
        rows: [],
      },
    })
  })
})

describe("Uploading files functionality", () => {
  test("Event: `uploadFiles/rejected` change `uploading` to Failed", () => {
    const errorMock = new AppError("SOME_ERROR_TYPE", "Luke, I'm your error")

    expect(
      filesManagerReducer(undefined, {
        type: rejectedAction(FilesManagerEvent.UploadFiles),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      uploading: State.Failed,
      error: errorMock,
    })
  })

  test("Event: `setUploadingState` change `uploading` to payload", () => {
    expect(
      filesManagerReducer(
        {
          ...initialState,
          uploading: State.Loaded,
        },
        {
          type: FilesManagerEvent.SetUploadingState,
          payload: State.Loading,
        }
      )
    ).toEqual({
      ...initialState,
      uploading: State.Loading,
    })
  })

  test("Event: `setUploadBlocked` change `uploadBlocked` to payload", () => {
    expect(
      filesManagerReducer(
        {
          ...initialState,
          uploadBlocked: false,
        },
        {
          type: FilesManagerEvent.SetUploadBlocked,
          payload: true,
        }
      )
    ).toEqual({
      ...initialState,
      uploadBlocked: true,
    })
  })
})

describe("delete files functionality", () => {
  test("Event: `deleteFiles/pending` change `deleting` to Loading", () => {
    expect(
      filesManagerReducer(undefined, {
        type: pendingAction(FilesManagerEvent.DeleteFiles),
        payload: ["user/music/example_file_name.mp3"],
      })
    ).toEqual({
      ...initialState,
      deleting: State.Loading,
    })
  })
  test("Event: `deleteFiles/fulfilled` change `deleting` to Loaded", () => {
    expect(
      filesManagerReducer(
        {
          ...initialState,
          files: [
            {
              id: "user/music/example_file_name.mp3",
              size: 1234,
              name: "example_file_name.mp3",
              type: "mp3",
            },
            {
              id: "user/music/second_example_file_name.wav",
              size: 12345,
              name: "second_example_file_name.wav",
              type: "wav",
            },
          ],
        },
        {
          type: fulfilledAction(FilesManagerEvent.DeleteFiles),
          payload: ["user/music/example_file_name.mp3"],
        }
      )
    ).toEqual({
      ...initialState,
      deleting: State.Loaded,
      files: [
        {
          id: "user/music/second_example_file_name.wav",
          size: 12345,
          name: "second_example_file_name.wav",
          type: "wav",
        },
      ],
    })
  })
  test("Event: `deleteFiles/rejected` change `deleting` to Failed", () => {
    const errorMock = new AppError("SOME_ERROR_TYPE", "Luke, I'm your error")

    expect(
      filesManagerReducer(undefined, {
        type: rejectedAction(FilesManagerEvent.DeleteFiles),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      deleting: State.Failed,
      error: errorMock,
    })
  })
})

describe("reset deleting state functionality", () => {
  test("Event: `resetDeletingState` change `deleting` to Initial and `error` to null", () => {
    const errorMock = new AppError("SOME_ERROR_TYPE", "Luke, I'm your error")

    expect(
      filesManagerReducer(
        {
          ...initialState,
          deleting: State.Failed,
          error: errorMock,
        },
        {
          type: FilesManagerEvent.ResetDeletingState,
          payload: errorMock,
        }
      )
    ).toEqual({
      ...initialState,
      deleting: State.Initial,
      error: errorMock,
    })
  })
})

describe("reset uploading state functionality", () => {
  test("Event: `resetUploadingState` change `uploading` to Initial and `error` to null", () => {
    const errorMock = new AppError("SOME_ERROR_TYPE", "Luke, I'm your error")

    expect(
      filesManagerReducer(
        {
          ...initialState,
          uploading: State.Failed,
          error: errorMock,
        },
        {
          type: FilesManagerEvent.ResetUploadingState,
          payload: errorMock,
        }
      )
    ).toEqual({
      ...initialState,
      uploading: State.Initial,
      error: null,
    })
  })
})

describe("setting uploading and deleting counts functionality", () => {
  test("Event: `setUploadingFileCount` set uploading file count", () => {
    expect(
      filesManagerReducer(
        {
          ...initialState,
        },
        {
          type: FilesManagerEvent.SetUploadingFileCount,
          payload: 2,
        }
      )
    ).toEqual({
      ...initialState,
      uploadingFileCount: 2,
    })
  })

  test("Event: `setDeletingFileCount` set uploading file count", () => {
    expect(
      filesManagerReducer(
        {
          ...initialState,
        },
        {
          type: FilesManagerEvent.SetDeletingFileCount,
          payload: 5,
        }
      )
    ).toEqual({
      ...initialState,
      deletingFileCount: 5,
    })
  })
})
