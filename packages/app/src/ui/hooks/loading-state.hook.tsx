/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useState } from "react"

export const useLoadingState = <InitialStateType extends object>(
  initialState: InitialStateType
) => {
  const [states, setState] = useState<InitialStateType>(initialState)

  const updateFieldState = (key: keyof typeof initialState, value: boolean) => {
    if (initialState[key] === undefined) {
      return
    }

    setState((previousState) => {
      return {
        ...previousState,
        [key]: value,
      }
    })
  }

  const resetState = () => {
    setState(initialState)
  }

  return {
    states,
    updateFieldState,
    resetState,
  }
}
