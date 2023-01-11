/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import {
  DownloadState,
  Product,
  OsReleaseType,
  UpdateError,
  UpdateOsEvent,
  ReleaseProcessState,
  SilentCheckForUpdateState,
  CheckForUpdateMode,
} from "App/update/constants"
import { OsRelease } from "App/update/dto"
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

const mockedRelease: OsRelease = {
  date: "2021-02-02",
  file: {
    name: "test file",
    size: 123,
    url: "some-url",
  },
  product: Product.PurePhone,
  type: OsReleaseType.Daily,
  version: "123",
  mandatoryVersions: [],
}

test("empty event returns initial state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(updateOsReducer(undefined, {} as any)).toMatchInlineSnapshot(`
    Object {
      "checkForUpdateState": 0,
      "data": Object {
        "allReleases": null,
        "availableReleasesForUpdate": null,
        "downloadedProcessedReleases": null,
        "updateProcessedReleases": null,
      },
      "downloadState": 0,
      "error": null,
      "silentCheckForUpdate": 0,
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

describe("setCheckForUpdateState action", () => {
  test("action sets the checking state", () => {
    expect(
      updateOsReducer(undefined, {
        type: UpdateOsEvent.SetCheckForUpdateState,
        payload: State.Loaded,
      })
    ).toEqual({
      ...initialState,
      checkForUpdateState: State.Loaded,
    })

    expect(
      updateOsReducer(undefined, {
        type: UpdateOsEvent.SetCheckForUpdateState,
        payload: State.Failed,
      })
    ).toEqual({
      ...initialState,
      checkForUpdateState: State.Failed,
    })
  })
})

describe("startUpdateOs action", () => {
  test("pending action sets proper updateOsState", () => {
    expect(
      updateOsReducer(undefined, {
        type: pendingAction(UpdateOsEvent.StartOsUpdateProcess),
        meta: {
          arg: {
            releases: [mockedRelease],
          },
        },
      })
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        updateProcessedReleases: [
          {
            release: mockedRelease,
            state: ReleaseProcessState.Initial,
          },
        ],
      },
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
  const testCases: CheckForUpdateMode[] = Object.values(CheckForUpdateMode)
  const expectedStates = {
    pending: {
      [CheckForUpdateMode.Normal]: {
        silentCheckForUpdate: SilentCheckForUpdateState.Initial,
        checkForUpdateState: State.Loading,
      },
      [CheckForUpdateMode.SilentCheck]: {
        silentCheckForUpdate: SilentCheckForUpdateState.Loading,
        checkForUpdateState: State.Initial,
      },
      [CheckForUpdateMode.TryAgain]: {
        silentCheckForUpdate: SilentCheckForUpdateState.Skipped,
        checkForUpdateState: State.Loading,
      },
    },
    fulfilled: {
      [CheckForUpdateMode.Normal]: {
        silentCheckForUpdate: SilentCheckForUpdateState.Initial,
        checkForUpdateState: State.Loaded,
      },
      [CheckForUpdateMode.SilentCheck]: {
        silentCheckForUpdate: SilentCheckForUpdateState.Loaded,
        checkForUpdateState: State.Initial,
      },
      [CheckForUpdateMode.TryAgain]: {
        silentCheckForUpdate: SilentCheckForUpdateState.Initial,
        checkForUpdateState: State.Loaded,
      },
    },
    rejected: {
      [CheckForUpdateMode.Normal]: {
        silentCheckForUpdate: SilentCheckForUpdateState.Initial,
        checkForUpdateState: State.Failed,
      },
      [CheckForUpdateMode.SilentCheck]: {
        silentCheckForUpdate: SilentCheckForUpdateState.Failed,
        checkForUpdateState: State.Initial,
      },
      [CheckForUpdateMode.TryAgain]: {
        silentCheckForUpdate: SilentCheckForUpdateState.Initial,
        checkForUpdateState: State.Failed,
      },
    },
  }

  describe.each(testCases)("when mode equals to %p", (mode) => {
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
                mode,
              },
            },
          }
        )
      ).toEqual({
        ...initialState,
        ...expectedStates.pending[mode],
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
            type: fulfilledAction(UpdateOsEvent.CheckForUpdate),
            meta: {
              arg: {
                mode,
              },
            },
            payload: {
              availableReleasesForUpdate: [mockedRelease],
              allReleases: [mockedRelease],
            },
          }
        )
      ).toEqual({
        ...initialState,
        ...expectedStates.fulfilled[mode],
        data: {
          ...initialState.data,
          availableReleasesForUpdate: [mockedRelease],
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
            meta: {
              arg: {
                mode,
              },
            },
            payload: exampleError,
          }
        )
      ).toEqual({
        ...initialState,
        ...expectedStates.rejected[mode],
        error: exampleError,
      })
    })

    test("areAllReleasesAlreadyDownloaded equal to true marks releases as downloaded", () => {
      expect(
        updateOsReducer(
          {
            ...initialState,
          },
          {
            type: fulfilledAction(UpdateOsEvent.CheckForUpdate),
            meta: {
              arg: {
                mode,
              },
            },
            payload: {
              availableReleasesForUpdate: [mockedRelease],
              allReleases: [mockedRelease],
              areAllReleasesAlreadyDownloaded: true,
            },
          }
        )
      ).toEqual({
        ...initialState,
        ...expectedStates.fulfilled[mode],
        data: {
          ...initialState.data,
          availableReleasesForUpdate: [mockedRelease],
          allReleases: [mockedRelease],
          downloadedProcessedReleases: [
            { release: mockedRelease, state: ReleaseProcessState.Done },
          ],
        },
      })
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
          meta: {
            arg: {
              releases: [mockedRelease],
            },
          },
        }
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        downloadedProcessedReleases: [
          { release: mockedRelease, state: ReleaseProcessState.Initial },
        ],
      },
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

describe("setStateForDownloadedRelease", () => {
  test("sets new state for downloaded release version", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            downloadedProcessedReleases: [
              { release: mockedRelease, state: ReleaseProcessState.Initial },
            ],
          },
        },
        {
          type: UpdateOsEvent.SetStateForDownloadedRelease,
          payload: {
            version: mockedRelease.version,
            state: ReleaseProcessState.Done,
          },
        }
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        downloadedProcessedReleases: [
          { release: mockedRelease, state: ReleaseProcessState.Done },
        ],
      },
    })
  })
})

describe("setStateForInstalledRelease", () => {
  test("sets new state for downloaded release version", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            updateProcessedReleases: [
              { release: mockedRelease, state: ReleaseProcessState.Initial },
            ],
          },
        },
        {
          type: UpdateOsEvent.SetStateForInstalledRelease,
          payload: {
            version: mockedRelease.version,
            state: ReleaseProcessState.Done,
          },
        }
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        updateProcessedReleases: [
          { release: mockedRelease, state: ReleaseProcessState.Done },
        ],
      },
    })
  })
})

describe("closeUpdateFlow", () => {
  test("clear states and leaves data", () => {
    const data = {
      ...initialState.data,
      downloadedProcessedReleases: [
        { release: mockedRelease, state: ReleaseProcessState.Done },
      ],
      availableReleasesForUpdate: [mockedRelease],
      allReleases: [mockedRelease],
      updateProcessedReleases: [
        { release: mockedRelease, state: ReleaseProcessState.Initial },
      ],
    }

    expect(
      updateOsReducer(
        {
          ...initialState,
          error: exampleError,
          updateOsState: State.Failed,
          data,
        },
        {
          type: UpdateOsEvent.CloseUpdateFlow,
        }
      )
    ).toEqual({
      ...initialState,
      data,
    })
  })
  test("sets silentCheckForUpdate as skipped when it failed previously", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
          error: exampleError,
          silentCheckForUpdate: SilentCheckForUpdateState.Failed,
        },
        {
          type: UpdateOsEvent.CloseUpdateFlow,
        }
      )
    ).toEqual({
      ...initialState,
      silentCheckForUpdate: SilentCheckForUpdateState.Skipped,
    })
  })
})

describe("clearStateAndData", () => {
  test("clear states and data", () => {
    const data = {
      ...initialState.data,
      downloadedProcessedReleases: [
        { release: mockedRelease, state: ReleaseProcessState.Done },
      ],
      availableReleasesForUpdate: [mockedRelease],
      allReleases: [mockedRelease],
      updateProcessedReleases: [
        { release: mockedRelease, state: ReleaseProcessState.Initial },
      ],
    }

    expect(
      updateOsReducer(
        {
          ...initialState,
          error: exampleError,
          updateOsState: State.Failed,
          data,
        },
        {
          type: UpdateOsEvent.ClearStateAndData,
        }
      )
    ).toEqual({
      ...initialState,
    })
  })
})
