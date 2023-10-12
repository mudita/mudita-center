/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  RenderHookResult,
  WrapperComponent,
  renderHook,
} from "@testing-library/react-hooks"
import { CaseColor, DeviceType, PureDeviceData } from "App/device"
import { CheckForUpdateLocalState } from "App/overview/components/overview-screens/constants/overview.enum"
import { useUpdateFlowState } from "App/overview/components/overview-screens/helpers/use-update-flow-state.hook"
import {
  OsReleaseType,
  Product,
  ReleaseProcessState,
  SilentCheckForUpdateState,
} from "App/update/constants"
import { CheckForUpdateState } from "App/update/constants/check-for-update-state.constant"
import React from "react"
import { Provider } from "react-redux"
import createMockStore, { MockStore } from "redux-mock-store"
import thunk from "redux-thunk"
import { waitFor, type RenderOptions } from "@testing-library/react"
import type { PreloadedState } from "@reduxjs/toolkit"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { initialState as update } from "App/update/reducers"
import { initialState as device } from "App/device/reducers/device.reducer"
import { OsRelease } from "App/update/dto"

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

const pureDeviceMock: PureDeviceData = {
  networkName: "Network",
  networkLevel: "5",
  osVersion: "0.75.1",
  batteryLevel: 0.99,
  simCards: [
    {
      slot: 1,
      active: true,
      number: 12345678,
      network: "",
      networkLevel: 0.75,
    },
  ],
  serialNumber: "303",
  phoneLockTime: 1630703219,
  memorySpace: {
    reservedSpace: 124,
    usedUserSpace: 1021,
    total: 16000000000,
  },
  caseColour: CaseColor.Gray,
  backupFilePath: "path/to/directory/fileBase.tar",
}

const defaultState = {
  update,
  device: {
    ...device,
    data: pureDeviceMock,
  },
} as ReduxRootState

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<ReduxRootState>
  store?: MockStore
}

export function renderHookWithProviders<Result, Props>(
  render: (initialProps: Props) => Result,
  {
    preloadedState = {},
    store = createMockStore([thunk])({ ...defaultState, ...preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): { store: MockStore } & RenderHookResult<Props, Result> {
  const wrapper: WrapperComponent<Props> | undefined = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    store,
    ...renderHook(render, { ...renderOptions, wrapper }),
  }
}
type TestCaseSilent = [
  testedState: SilentCheckForUpdateState,
  expectedState: CheckForUpdateLocalState
]
type TestCaseNormal = [
  testedState: CheckForUpdateState,
  expectedState: CheckForUpdateLocalState
]
type TestCaseBoth = [
  firstTestedState: CheckForUpdateState,
  secondTestedState: SilentCheckForUpdateState,
  expectedState: CheckForUpdateLocalState
]

const defaultParams = { deviceType: DeviceType.MuditaPure }

const silentCheckTestCases: TestCaseSilent[] = [
  [SilentCheckForUpdateState.Failed, CheckForUpdateLocalState.Failed],
  [SilentCheckForUpdateState.Loading, CheckForUpdateLocalState.Loading],
  [SilentCheckForUpdateState.Loaded, CheckForUpdateLocalState.Loaded],
]

const checkForUpdateTestCases: TestCaseNormal[] = [
  [CheckForUpdateState.Failed, CheckForUpdateLocalState.Failed],
  [CheckForUpdateState.Loading, CheckForUpdateLocalState.Loading],
  [CheckForUpdateState.Loaded, CheckForUpdateLocalState.Loaded],
  [CheckForUpdateState.PerformedWithFailure, CheckForUpdateLocalState.Failed],
  [CheckForUpdateState.Performed, CheckForUpdateLocalState.Loaded],
]

const bothStatusesTestCases: TestCaseBoth[] = [
  [
    CheckForUpdateState.Initial,
    SilentCheckForUpdateState.Initial,
    CheckForUpdateLocalState.Loading,
  ],
  [
    CheckForUpdateState.Initial,
    SilentCheckForUpdateState.Skipped,
    CheckForUpdateLocalState.Failed,
  ],
  [
    CheckForUpdateState.Initial,
    SilentCheckForUpdateState.Failed,
    CheckForUpdateLocalState.Failed,
  ],
]
describe.each(silentCheckTestCases)(
  "when value for silentCheckForUpdateState equals to %p",
  (param, expectedResult) => {
    test(`checkForUpdateLocalState should equal to ${expectedResult}`, () => {
      const { result } = renderHookWithProviders(
        () =>
          useUpdateFlowState({
            ...defaultParams,
          }),
        {
          preloadedState: {
            update: {
              ...update,
              silentCheckForUpdate: param,
            },
          },
        }
      )

      expect(result.current.checkForUpdateLocalState).toEqual(expectedResult)
    })
  }
)

describe.each(checkForUpdateTestCases)(
  "when value for checkingForUpdateState equals to %p",
  (param, expectedResult) => {
    test(`checkForUpdateLocalState should equal to ${expectedResult}`, () => {
      const { result } = renderHookWithProviders(
        () =>
          useUpdateFlowState({
            ...defaultParams,
          }),
        {
          preloadedState: {
            update: {
              ...update,
              checkForUpdateState: param,
            },
          },
        }
      )

      expect(result.current.checkForUpdateLocalState).toEqual(expectedResult)
    })
  }
)

describe.each(bothStatusesTestCases)(
  "when value for silentCheckForUpdateState equals to %p",
  (firstParam, secondParam, expectedResult) => {
    test(`checkForUpdateLocalState should equal to ${expectedResult}`, () => {
      const { result } = renderHookWithProviders(
        () =>
          useUpdateFlowState({
            ...defaultParams,
          }),
        {
          preloadedState: {
            update: {
              ...update,
              checkForUpdateState: firstParam,
              silentCheckForUpdate: secondParam,
            },
          },
        }
      )

      expect(result.current.checkForUpdateLocalState).toEqual(expectedResult)
    })
  }
)

describe("when all releases were downloaded", () => {
  test("checkForUpdateLocalState should equal to Install", () => {
    const { result } = renderHookWithProviders(
      () =>
        useUpdateFlowState({
          ...defaultParams,
        }),
      {
        preloadedState: {
          update: {
            ...update,
            silentCheckForUpdate: SilentCheckForUpdateState.Loaded,
            data: {
              ...update.data,
              downloadedProcessedReleases: [
                { release: mockedRelease, state: ReleaseProcessState.Done },
              ],
            },
          },
        },
      }
    )

    expect(result.current.checkForUpdateLocalState).toEqual(
      CheckForUpdateLocalState.Install
    )
  })
})

describe("when there are new releases to download", () => {
  test("checkForUpdateLocalState should equal to Download", () => {
    const { result } = renderHookWithProviders(
      () =>
        useUpdateFlowState({
          ...defaultParams,
        }),
      {
        preloadedState: {
          update: {
            ...update,
            silentCheckForUpdate: SilentCheckForUpdateState.Loaded,
            data: {
              ...update.data,
              availableReleasesForUpdate: [mockedRelease],
            },
          },
        },
      }
    )

    expect(result.current.checkForUpdateLocalState).toEqual(
      CheckForUpdateLocalState.Download
    )
  })
})

describe("when silentCheckForUpdateState is set as initial", () => {
  test("check for update should be called", () => {
    const mockStore = createMockStore([thunk])(defaultState)

    const { result } = renderHookWithProviders(
      () => useUpdateFlowState(defaultParams),
      { store: mockStore }
    )

    expect(result.current.checkForUpdateLocalState).toEqual(
      CheckForUpdateLocalState.Loading
    )
    expect(mockStore.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "CHECK_FOR_UPDATE/pending",
        }),
      ])
    )
  })
})

describe("when silentCheckForUpdateState is not set as initial", () => {
  test("check for update should not be called", () => {
    const mockStore = createMockStore([thunk])({
      ...defaultState,
      update: {
        ...update,
        silentCheckForUpdate: SilentCheckForUpdateState.Loading,
      },
    })

    const { result } = renderHookWithProviders(
      () => useUpdateFlowState(defaultParams),
      { store: mockStore }
    )

    expect(result.current.checkForUpdateLocalState).toEqual(
      CheckForUpdateLocalState.Loading
    )
    expect(mockStore.getActions()).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "CHECK_FOR_UPDATE/pending",
        }),
      ])
    )
  })
})

describe("when os version is not specified", () => {
  test("check for update should not be called", () => {
    const mockStore = createMockStore([thunk])({
      ...defaultState,
      device: {
        ...defaultState.device,
        data: {
          ...pureDeviceMock,
          osVersion: undefined,
        },
      },
    })

    const { result } = renderHookWithProviders(
      () => useUpdateFlowState(defaultParams),
      { store: mockStore }
    )

    expect(result.current.checkForUpdateLocalState).toEqual(
      CheckForUpdateLocalState.Loading
    )
    expect(mockStore.getActions()).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "CHECK_FOR_UPDATE/pending",
        }),
      ])
    )
  })
})

describe("when hook is going to be destroyed", () => {
  test("should abort pending check for update action", async () => {
    let state = defaultState
    const mockStore = createMockStore([thunk])
    const store = mockStore(() => state)

    const { rerender, unmount } = renderHookWithProviders(
      () => useUpdateFlowState(defaultParams),
      { store }
    )
    state = {
      ...defaultState,
      update: {
        ...update,
        silentCheckForUpdate: SilentCheckForUpdateState.Loading,
      },
    }

    rerender()
    unmount()

    await waitFor(() => {
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: "CHECK_FOR_UPDATE/rejected",
            error: { name: "AbortError", message: "Aborted" },
          }),
        ])
      )
    })
  })
  test("should not abort check for update action that is not pending", async () => {
    let state = defaultState
    const mockStore = createMockStore([thunk])
    const store = mockStore(() => state)

    const { rerender, unmount } = renderHookWithProviders(
      () => useUpdateFlowState(defaultParams),
      { store }
    )
    state = {
      ...defaultState,
      update: {
        ...update,
        silentCheckForUpdate: SilentCheckForUpdateState.Loaded,
      },
    }

    rerender()
    unmount()

    await waitFor(() => {
      expect(store.getActions()).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: "CHECK_FOR_UPDATE/rejected",
            error: { name: "AbortError", message: "Aborted" },
          }),
        ])
      )
    })
  })
})

describe("when force update is needed", () => {
  test("checkForUpdate should not be called", () => {
    const mockStore = createMockStore([thunk])({
      ...defaultState,
      update: {
        ...update,
        needsForceUpdate: true,
      },
    })

    const { result } = renderHookWithProviders(
      () => useUpdateFlowState(defaultParams),
      { store: mockStore }
    )

    expect(result.current.checkForUpdateLocalState).toEqual(undefined)
    expect(mockStore.getActions()).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "CHECK_FOR_UPDATE/pending",
        }),
      ])
    )
  })

  test("checkForUpdateLocalState should not be changed", () => {
    const { result } = renderHookWithProviders(
      () =>
        useUpdateFlowState({
          ...defaultParams,
        }),
      {
        preloadedState: {
          update: {
            ...update,
            needsForceUpdate: true,
          },
        },
      }
    )

    expect(result.current.checkForUpdateLocalState).toEqual(undefined)
  })
})
