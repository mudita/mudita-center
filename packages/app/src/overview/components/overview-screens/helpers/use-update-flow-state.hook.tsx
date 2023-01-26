/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { CheckForUpdateLocalState } from "App/overview/components/overview-screens/constants/overview.enum"
import { SilentCheckForUpdateState } from "App/update/constants"
import { RejectableThunk } from "App/__deprecated__/renderer/store"
import { useEffect, useState } from "react"

interface Params {
  silentCheckForUpdateState: SilentCheckForUpdateState
  checkingForUpdateState: State
  checkForUpdate: () => RejectableThunk
  forceUpdateNeeded: boolean
  osVersion: string | undefined
}

interface Result {
  checkForUpdateLocalState: CheckForUpdateLocalState | undefined
}

export const useUpdateFlowState = ({
  checkingForUpdateState,
  silentCheckForUpdateState,
  forceUpdateNeeded,
  checkForUpdate,
  osVersion,
}: Params): Result => {
  const [checkForUpdateLocalState, setCheckForUpdateLocalState] =
    useState<CheckForUpdateLocalState>()
  const [silentCheckForUpdatePromise, setSilentCheckForUpdatePromise] =
    useState<RejectableThunk>()

  useEffect(() => {
    if (
      silentCheckForUpdateState === SilentCheckForUpdateState.Initial &&
      !forceUpdateNeeded &&
      osVersion
    ) {
      const actionResult = checkForUpdate()
      setSilentCheckForUpdatePromise(actionResult)
    }

    return () => {
      if (
        silentCheckForUpdatePromise &&
        silentCheckForUpdateState === SilentCheckForUpdateState.Loading
      ) {
        silentCheckForUpdatePromise.abort()
        setSilentCheckForUpdatePromise(undefined)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [silentCheckForUpdateState, forceUpdateNeeded, osVersion])

  useEffect(() => {
    if (forceUpdateNeeded) {
      return
    }

    if (
      silentCheckForUpdateState === SilentCheckForUpdateState.Failed ||
      checkingForUpdateState === State.Failed
    ) {
      setCheckForUpdateLocalState(CheckForUpdateLocalState.Failed)
    }

    if (silentCheckForUpdateState === SilentCheckForUpdateState.Loading) {
      setCheckForUpdateLocalState(CheckForUpdateLocalState.SilentCheckLoading)
    }

    if (checkingForUpdateState === State.Loading) {
      setCheckForUpdateLocalState(CheckForUpdateLocalState.Loading)
    }

    if (
      silentCheckForUpdateState === SilentCheckForUpdateState.Loaded ||
      checkingForUpdateState === State.Loaded
    ) {
      setCheckForUpdateLocalState(CheckForUpdateLocalState.Loaded)
    }
  }, [silentCheckForUpdateState, checkingForUpdateState, forceUpdateNeeded])
  return {
    checkForUpdateLocalState,
  }
}
