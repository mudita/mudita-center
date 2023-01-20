/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderHook } from "@testing-library/react-hooks"
import { State } from "App/core/constants"
import { CheckForUpdateLocalState } from "App/overview/components/overview-screens/constants/overview.enum"
import { useUpdateFlowState } from "App/overview/components/overview-screens/helpers/use-update-flow-state.hook"
import { SilentCheckForUpdateState } from "App/update/constants"

type TestCase = [
  testedState: SilentCheckForUpdateState | State,
  expectedState: CheckForUpdateLocalState
]

const defaultParams = {
  checkForUpdate: jest.fn(),
  checkingForUpdateState: State.Initial,
  silentCheckForUpdateState: SilentCheckForUpdateState.Initial,
}

const silentCheckTestCases: TestCase[] = [
  [SilentCheckForUpdateState.Failed, CheckForUpdateLocalState.Failed],
  [
    SilentCheckForUpdateState.Loading,
    CheckForUpdateLocalState.SilentCheckLoading,
  ],
  [SilentCheckForUpdateState.Loaded, CheckForUpdateLocalState.Loaded],
]

const checkForUpdateTestCases: TestCase[] = [
  [State.Failed, CheckForUpdateLocalState.Failed],
  [State.Loading, CheckForUpdateLocalState.Loading],
  [State.Loaded, CheckForUpdateLocalState.Loaded],
]

describe.each(silentCheckTestCases)(
  "when value for silentCheckForUpdateState equals to %p",
  (param, expectedResult) => {
    test(`checkForUpdateLocalState should equal to ${expectedResult}`, () => {
      const { result } = renderHook(() =>
        useUpdateFlowState({
          ...defaultParams,
          silentCheckForUpdateState: param as SilentCheckForUpdateState,
        })
      )

      expect(result.current.checkForUpdateLocalState).toEqual(expectedResult)
    })
  }
)

describe.each(checkForUpdateTestCases)(
  "when value for checkingForUpdateState equals to %p",
  (b, c) => {
    test(`checkForUpdateLocalState should equal to ${c}`, () => {
      const { result } = renderHook(() =>
        useUpdateFlowState({
          ...defaultParams,
          checkingForUpdateState: b as State,
        })
      )

      expect(result.current.checkForUpdateLocalState).toEqual(c)
    })
  }
)

describe("when silentCheckForUpdateState is set as initial", () => {
  test("check for update should be called", () => {
    const spy = jest.fn()
    renderHook(() =>
      useUpdateFlowState({
        ...defaultParams,
        silentCheckForUpdateState: SilentCheckForUpdateState.Initial,
        checkForUpdate: spy,
      })
    )
    expect(spy).toHaveBeenCalledTimes(1)
  })
})

describe("when silentCheckForUpdateState is not set as initial", () => {
  test("check for update should not be called", () => {
    const spy = jest.fn()
    renderHook(() =>
      useUpdateFlowState({
        ...defaultParams,
        silentCheckForUpdateState: SilentCheckForUpdateState.Loaded,
        checkForUpdate: spy,
      })
    )
    expect(spy).toHaveBeenCalledTimes(0)
  })
})

describe("when hook is going to be destroyed", () => {
  test("should abort pending check for update action", () => {
    const abortSpy = jest.fn()
    const mockedCheckForUpdate = jest.fn().mockReturnValue({
      abort: abortSpy,
    })
    let params = {
      ...defaultParams,
      silentCheckForUpdateState: SilentCheckForUpdateState.Initial,
      checkForUpdate: mockedCheckForUpdate,
    }

    const { rerender, unmount } = renderHook(() => useUpdateFlowState(params))

    params = {
      ...defaultParams,
      silentCheckForUpdateState: SilentCheckForUpdateState.Loading,
      checkForUpdate: mockedCheckForUpdate,
    }

    rerender()
    unmount()

    expect(abortSpy).toHaveBeenCalledTimes(1)
  })
  test("should not abort check for update action that is not pending", () => {
    const abortSpy = jest.fn()
    const mockedCheckForUpdate = jest.fn().mockReturnValue({
      abort: abortSpy,
    })
    let params = {
      ...defaultParams,
      silentCheckForUpdateState: SilentCheckForUpdateState.Initial,
      checkForUpdate: mockedCheckForUpdate,
    }

    const { rerender, unmount } = renderHook(() => useUpdateFlowState(params))

    params = {
      ...defaultParams,
      silentCheckForUpdateState: SilentCheckForUpdateState.Loaded,
      checkForUpdate: mockedCheckForUpdate,
    }

    rerender()
    unmount()

    expect(abortSpy).toHaveBeenCalledTimes(0)
  })
})
