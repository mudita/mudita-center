/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { act, renderHook } from "@testing-library/react-hooks"
import { useLoadingState } from "App/ui/hooks/loading-state.hook"

interface Props {
  creating: boolean
  editing: boolean
  deleting: boolean
  loading: boolean
}

const stateObject = {
  creating: false,
  editing: false,
  deleting: false,
  loading: false,
}

describe("Hook: `useLoadingState`", () => {
  describe("Method: `updateFieldState`", () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    test("Put existed key updated state", async () => {
      const { result } = renderHook(() => useLoadingState<Props>(stateObject))

      expect(result.current.states.creating).toBeFalsy()

      act(() => {
        result.current.updateFieldState("creating", true)
      })

      expect(result.current.states.creating).toBeTruthy()
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    test("Put not existed key updated state", async () => {
      const { result } = renderHook(() => useLoadingState<Props>(stateObject))

      expect(result.current.states).toEqual(stateObject)

      act(() => {
        result.current.updateFieldState(
          "not existed" as unknown as keyof typeof stateObject,
          true
        )
      })

      expect(result.current.states).toEqual(stateObject)
    })
  })

  describe("Method: `resetState`", () => {
    test("Resetting state to initial when method has been called", () => {
      const { result } = renderHook(() => useLoadingState<Props>(stateObject))

      act(() => {
        result.current.updateFieldState("creating", true)
        result.current.updateFieldState("deleting", true)
        result.current.updateFieldState("editing", true)
        result.current.updateFieldState("loading", true)
      })

      expect(result.current.states).toEqual({
        creating: true,
        editing: true,
        deleting: true,
        loading: true,
      })

      act(() => {
        result.current.resetState()
      })

      expect(result.current.states).toEqual(stateObject)
    })
  })
})
