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
  expectedState: ReturnType<typeof useUpdateFlowState>,
  stateEnum: CheckForUpdateLocalState
]
type TestCaseNormal = [
  testedState: CheckForUpdateState,
  expectedState: ReturnType<typeof useUpdateFlowState>,
  stateEnum: CheckForUpdateLocalState
]
type TestCaseBoth = [
  firstTestedState: CheckForUpdateState,
  secondTestedState: SilentCheckForUpdateState,
  expectedState: ReturnType<typeof useUpdateFlowState>,
  stateEnum: CheckForUpdateLocalState
]

const defaultParams = { deviceType: DeviceType.MuditaPure }
const defaultResult = {
  checkForUpdateInProgress: false,
  checkForUpdatePerformed: false,
  checkForUpdateFailed: false,
  updateAvailable: false,
  updateDownloaded: false,
}

const silentCheckTestCases: TestCaseSilent[] = [
  [
    SilentCheckForUpdateState.Failed,
    { ...defaultResult, checkForUpdateFailed: true },
    CheckForUpdateLocalState.Failed,
  ],
  [
    SilentCheckForUpdateState.Loading,
    { ...defaultResult, checkForUpdateInProgress: true },
    CheckForUpdateLocalState.Loading,
  ],
  [
    SilentCheckForUpdateState.Loaded,
    { ...defaultResult, checkForUpdatePerformed: true },
    CheckForUpdateLocalState.Loaded,
  ],
]

const checkForUpdateTestCases: TestCaseNormal[] = [
  [
    CheckForUpdateState.Failed,
    { ...defaultResult, checkForUpdateFailed: true },
    CheckForUpdateLocalState.Failed,
  ],
  [
    CheckForUpdateState.Loading,
    { ...defaultResult, checkForUpdateInProgress: true },
    CheckForUpdateLocalState.Loading,
  ],
  [
    CheckForUpdateState.Loaded,
    { ...defaultResult, checkForUpdatePerformed: true },
    CheckForUpdateLocalState.Loaded,
  ],
  [
    CheckForUpdateState.PerformedWithFailure,
    { ...defaultResult, checkForUpdateFailed: true },
    CheckForUpdateLocalState.Failed,
  ],
  [
    CheckForUpdateState.Performed,
    { ...defaultResult, checkForUpdatePerformed: true },
    CheckForUpdateLocalState.Loaded,
  ],
]

const bothStatusesTestCases: TestCaseBoth[] = [
  [
    CheckForUpdateState.Initial,
    SilentCheckForUpdateState.Initial,
    { ...defaultResult, checkForUpdateInProgress: true },
    CheckForUpdateLocalState.Loading,
  ],
  [
    CheckForUpdateState.Initial,
    SilentCheckForUpdateState.Skipped,
    { ...defaultResult, checkForUpdateFailed: true },
    CheckForUpdateLocalState.Failed,
  ],
  [
    CheckForUpdateState.Initial,
    SilentCheckForUpdateState.Failed,
    { ...defaultResult, checkForUpdateFailed: true },
    CheckForUpdateLocalState.Failed,
  ],
]
describe.each(silentCheckTestCases)(
  "when value for silentCheckForUpdateState equals to %p",
  (param, expectedResult, stateEnum) => {
    test(`checkForUpdateLocalState should equal to ${stateEnum}`, () => {
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

      expect(result.current).toEqual(expectedResult)
    })
  }
)

describe.each(checkForUpdateTestCases)(
  "when value for checkingForUpdateState equals to %p",
  (param, expectedResult, stateEnum) => {
    test(`checkForUpdateLocalState should equal to ${stateEnum}`, () => {
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

      expect(result.current).toEqual(expectedResult)
    })
  }
)

describe.each(bothStatusesTestCases)(
  "when value for silentCheckForUpdateState equals to %p",
  (firstParam, secondParam, expectedResult, stateEnum) => {
    test(`checkForUpdateLocalState should equal to ${stateEnum}`, () => {
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

      expect(result.current).toEqual(expectedResult)
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

    expect(result.current).toEqual({ ...defaultResult, updateDownloaded: true })
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

    expect(result.current).toEqual({ ...defaultResult, updateAvailable: true })
  })
})

describe("when silentCheckForUpdateState is set as initial", () => {
  test("check for update should be called", () => {
    const mockStore = createMockStore([thunk])(defaultState)

    const { result } = renderHookWithProviders(
      () => useUpdateFlowState(defaultParams),
      { store: mockStore }
    )

    expect(result.current).toEqual({
      ...defaultResult,
      checkForUpdateInProgress: true,
    })
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

    expect(result.current).toEqual({
      ...defaultResult,
      checkForUpdateInProgress: true,
    })
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

    expect(result.current).toEqual({
      ...defaultResult,
      checkForUpdateInProgress: true,
    })
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

    expect(result.current).toEqual(defaultResult)
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

    expect(result.current).toEqual(defaultResult)
  })
})
