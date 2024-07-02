/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "Core/core/constants"
import { AppError } from "Core/core/errors"
import {
  DownloadState,
  Product,
  OsReleaseType,
  UpdateError,
  UpdateOsEvent,
  ReleaseProcessState,
  SilentCheckForUpdateState,
  CheckForUpdateMode,
} from "Core/update/constants"
import { OsRelease } from "Core/update/dto"
import { updateOsReducer, initialState } from "Core/update/reducers"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Core/__deprecated__/renderer/store"
import { CheckForUpdateState } from "../constants/check-for-update-state.constant"

const mockHistory = {
  push: jest.fn(),
  replace: jest.fn(),
  go: jest.fn(),
  block: jest.fn(),
  listen: jest.fn(),
  location: { pathname: "", search: "", hash: "", state: null },
}

jest.mock("history", () => ({
  createHashHistory: jest.fn(() => mockHistory),
}))

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
  version: "1.1.0",
  mandatoryVersions: [],
}

test("empty event returns initial state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(updateOsReducer(undefined, {} as any)).toMatchInlineSnapshot(`
    Object {
      "checkForUpdateState": 0,
      "checkedForForceUpdateNeed": false,
      "data": Object {
        "availableReleasesForUpdate": null,
        "downloadedProcessedReleases": null,
        "updateProcessedReleases": null,
      },
      "downloadState": 0,
      "error": null,
      "forceUpdateState": 0,
      "needsForceUpdate": false,
      "silentCheckForUpdate": 0,
      "tmpMuditaHarmonyPortInfo": undefined,
      "updateOsState": 0,
    }
  `)
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
      data: {
        ...initialState.data,
        availableReleasesForUpdate: [],
        downloadedProcessedReleases: [],
        updateProcessedReleases: [],
      },
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
            },
          }
        )
      ).toEqual({
        ...initialState,
        ...expectedStates.fulfilled[mode],
        data: {
          ...initialState.data,
          availableReleasesForUpdate: [mockedRelease],
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
          downloadedProcessedReleases: [
            { release: mockedRelease, state: ReleaseProcessState.Done },
          ],
        },
      })
    })
  })

  describe("when check for update action is aborted and mode equals to silent check", () => {
    test("state is set as initial", () => {
      expect(
        updateOsReducer(
          {
            ...initialState,
            error: exampleError,
          },
          {
            type: rejectedAction(UpdateOsEvent.CheckForUpdate),
            meta: {
              aborted: true,
              arg: {
                mode: CheckForUpdateMode.SilentCheck,
              },
            },
          }
        )
      ).toEqual({
        ...initialState,
        error: null,
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
          checkForUpdateState: CheckForUpdateState.Loaded,
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
      silentCheckForUpdate: SilentCheckForUpdateState.Loaded,
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
            availableReleasesForUpdate: [mockedRelease],
            updateProcessedReleases: [
              { release: mockedRelease, state: ReleaseProcessState.Initial },
            ],
          },
        },
        {
          type: UpdateOsEvent.SetStateForInstalledRelease,
          payload: {
            version: mockedRelease.version,
            state: ReleaseProcessState.InProgress,
          },
        }
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        availableReleasesForUpdate: [mockedRelease],
        updateProcessedReleases: [
          { release: mockedRelease, state: ReleaseProcessState.InProgress },
        ],
      },
    })
  })
  test("removes release from availableReleasesForUpdate if payload state equals to 'done'", () => {
    const anotherMockedRelease: OsRelease = {
      ...mockedRelease,
      version: "1.2.0",
    }
    expect(
      updateOsReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            availableReleasesForUpdate: [mockedRelease, anotherMockedRelease],
            updateProcessedReleases: [
              { release: mockedRelease, state: ReleaseProcessState.Initial },
              {
                release: anotherMockedRelease,
                state: ReleaseProcessState.Initial,
              },
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
          { release: anotherMockedRelease, state: ReleaseProcessState.Initial },
        ],
        availableReleasesForUpdate: [anotherMockedRelease],
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
      checkForUpdateState: CheckForUpdateState.Initial,
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
      checkForUpdateState: CheckForUpdateState.Initial,
      silentCheckForUpdate: SilentCheckForUpdateState.Skipped,
    })
  })
})

describe("checkForForceUpdateNeed", () => {
  test("sets needsForceUpdate according to the action result and checkedForForceUpdateNeed as true", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
        },
        {
          type: fulfilledAction(UpdateOsEvent.CheckForForceUpdate),
          payload: true,
        }
      )
    ).toEqual({
      ...initialState,
      needsForceUpdate: true,
      checkedForForceUpdateNeed: true,
    })

    expect(
      updateOsReducer(
        {
          ...initialState,
        },
        {
          type: fulfilledAction(UpdateOsEvent.CheckForForceUpdate),
          payload: false,
        }
      )
    ).toEqual({
      ...initialState,
      needsForceUpdate: false,
      checkedForForceUpdateNeed: true,
    })
  })
})

describe("forceUpdate", () => {
  test("pending action sets proper state for forceUpdateState, clears error and resets processed releases info", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
          error: exampleError,
          data: {
            ...initialState.data,
            downloadedProcessedReleases: [
              { release: mockedRelease, state: ReleaseProcessState.Done },
            ],
            updateProcessedReleases: [
              { release: mockedRelease, state: ReleaseProcessState.Done },
            ],
          },
        },
        {
          type: pendingAction(UpdateOsEvent.StartOsForceUpdateProcess),
          meta: {
            arg: {
              releases: [mockedRelease],
            },
          },
        }
      )
    ).toEqual({
      ...initialState,
      forceUpdateState: State.Loading,
      error: null,
      data: {
        ...initialState.data,
        downloadedProcessedReleases: [
          { release: mockedRelease, state: ReleaseProcessState.Initial },
        ],
        updateProcessedReleases: [
          { release: mockedRelease, state: ReleaseProcessState.Initial },
        ],
      },
    })
  })
  test("fulfilled action sets proper states and clears force update need", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
          downloadState: DownloadState.Loaded,
          updateOsState: State.Loaded,
          needsForceUpdate: true,
        },
        {
          type: fulfilledAction(UpdateOsEvent.StartOsForceUpdateProcess),
        }
      )
    ).toEqual({
      ...initialState,
      forceUpdateState: State.Loaded,
      downloadState: DownloadState.Initial,
      updateOsState: State.Initial,
      needsForceUpdate: false,
    })
  })
  test("rejected action sets proper state and sets error", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
          forceUpdateState: State.Loading,
        },
        {
          type: rejectedAction(UpdateOsEvent.StartOsForceUpdateProcess),
          payload: exampleError,
        }
      )
    ).toEqual({
      ...initialState,
      forceUpdateState: State.Failed,
      error: exampleError,
    })
  })
})

describe("closeForceUpdateFlow action", () => {
  test("sets forceUpdateState to initial value", () => {
    expect(
      updateOsReducer(
        {
          ...initialState,
          forceUpdateState: State.Loaded,
        },
        {
          type: UpdateOsEvent.CloseForceUpdateFlow,
        }
      )
    ).toEqual({
      ...initialState,
      updateOsState: State.Initial,
    })
  })
})
