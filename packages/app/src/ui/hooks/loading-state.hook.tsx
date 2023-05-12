/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useRef, useState } from "react"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/ban-types
export const useLoadingState = <InitialStateType extends object>(
  initialState: InitialStateType
) => {
  const [states, setState] = useState<InitialStateType>(initialState)
  const statesRef = useRef<InitialStateType>()

  const updateFieldState = (key: keyof InitialStateType, value: boolean) => {
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

  useEffect(() => {
    statesRef.current = states
  }, [states])

  const resetState = (exceptFields?: Array<keyof InitialStateType>) => {
    const keepStates: Partial<InitialStateType> = {}

    if (exceptFields) {
      exceptFields.forEach((key) => {
        if (statesRef.current) {
          keepStates[key] = statesRef.current[key]
        }
      })
    }

    setState({ ...initialState, ...keepStates })
  }

  return {
    states,
    updateFieldState,
    resetState,
  }
}
