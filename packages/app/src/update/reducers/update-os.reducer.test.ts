/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import {
  DownloadState,
  Product,
  ReleaseType,
  UpdateError,
  UpdateOsEvent,
} from "App/update/constants"
import { Release } from "App/update/dto"
import { updateOsReducer, initialState } from "App/update/reducers"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store"

const exampleError = new AppError(
  UpdateError.UpdateOsProcess,
  "Device updating process failed"
)

const mockedRelease: Release = {
  date: "2021-02-02",
  file: {
    name: "test file",
    size: 123,
    url: "some-url",
  },
  product: Product.PurePhone,
  type: ReleaseType.Daily,
  version: "123",
}

test("empty event returns initial state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(updateOsReducer(undefined, {} as any)).toMatchInlineSnapshot(`
    Object {
      "checkForUpdateState": 0,
      "data": Object {
        "allReleases": null,
        "releaseAvailableForUpdate": null,
      },
      "downloadState": 0,
      "error": null,
      "silentUpdateCheck": false,
      "updateOsState": 0,
    }
  `)
})

describe("setUpdateState action", () => {
  test("action sets the updating state", () => {
    expect(
      updateOsReducer(undefined, {
        type: UpdateOsEvent.SetUpdateState,
        payload: State.Loaded,
      })
    ).toEqual({
      ...initialState,
      updateOsState: State.Loaded,
    })

    expect(
      updateOsReducer(undefined, {
        type: UpdateOsEvent.SetUpdateState,
        payload: State.Failed,
      })
    ).toEqual({
      ...initialState,
      updateOsState: State.Failed,
    })
  })
})

describe("startUpdateOs action", () => {
  test("pending action sets proper updateOsState", () => {
    expect(
      updateOsReducer(undefined, {
        type: pendingAction(UpdateOsEvent.StartOsUpdateProcess),
      })
    ).toEqual({
      ...initialState,
      updateOsState: State.Loading,
    })
  })

  test("fulfilled action sets proper updateOsState and clears error", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
          error: exampleError,
        },
        {
          type: fulfilledAction(UpdateOsEvent.StartOsUpdateProcess),
        }
      )
    ).toEqual({
      ...initialState,
      updateOsState: State.Loaded,
    })
  })
  test("rejected action sets proper updateOsState and error", () => {
    const error = new AppError(
      UpdateError.UpdateOsProcess,
      "Device updating process failed"
    )
    expect(
      updateOsReducer(undefined, {
        type: rejectedAction(UpdateOsEvent.StartOsUpdateProcess),
        payload: error,
      })
    ).toEqual({
      ...initialState,
      updateOsState: State.Failed,
      error: error,
    })
  })
})

describe("checkForUpdate", () => {
  test("pending action sets proper states and clears error", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
          error: exampleError,
        },
        {
          type: pendingAction(UpdateOsEvent.CheckForUpdate),
          meta: {
            arg: {
              isSilentCheck: true,
            },
          },
        }
      )
    ).toEqual({
      ...initialState,
      checkForUpdateState: State.Loading,
      error: null,
      silentUpdateCheck: true,
    })
  })

  test("fulfilled action set proper state and data", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
        },
        {
          type: fulfilledAction(UpdateOsEvent.CheckForUpdate),
          payload: {
            releaseAvailableForUpdate: mockedRelease,
            allReleases: [mockedRelease],
          },
        }
      )
    ).toEqual({
      ...initialState,
      checkForUpdateState: State.Loaded,
      data: {
        releaseAvailableForUpdate: mockedRelease,
        allReleases: [mockedRelease],
      },
    })
  })

  test("rejected action sets proper state and error", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
        },
        {
          type: rejectedAction(UpdateOsEvent.CheckForUpdate),
          payload: exampleError,
        }
      )
    ).toEqual({
      ...initialState,
      checkForUpdateState: State.Failed,
      error: exampleError,
    })
  })
})

describe("downloadUpdate", () => {
  test("pending action sets proper states and clears error", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
          checkForUpdateState: State.Loaded,
          error: exampleError,
        },
        {
          type: pendingAction(UpdateOsEvent.DownloadUpdate),
        }
      )
    ).toEqual({
      ...initialState,
      checkForUpdateState: State.Initial,
      downloadState: DownloadState.Loading,
      error: null,
    })
  })

  test("fulfilled action set proper state and data", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
        },
        {
          type: fulfilledAction(UpdateOsEvent.DownloadUpdate),
        }
      )
    ).toEqual({
      ...initialState,
      downloadState: DownloadState.Loaded,
    })
  })

  test("rejected action sets cancelled state for cancelled error type", () => {
    const error = new AppError(
      UpdateError.DownloadCancelledByUser,
      "Device updating process failed"
    )

    expect(
      updateOsReducer(
        {
          ...initialState,
        },
        {
          type: rejectedAction(UpdateOsEvent.DownloadUpdate),
          payload: error,
        }
      )
    ).toEqual({
      ...initialState,
      downloadState: DownloadState.Cancelled,
    })
  })

  test("rejected action sets failed state for error types other than canelled", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
        },
        {
          type: rejectedAction(UpdateOsEvent.DownloadUpdate),
          payload: exampleError,
        }
      )
    ).toEqual({
      ...initialState,
      downloadState: DownloadState.Failed,
      error: exampleError,
    })
  })
})
