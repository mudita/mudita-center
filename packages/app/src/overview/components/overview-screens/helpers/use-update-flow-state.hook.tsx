/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// AUTO DISABLED - fix me if you like :)
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment */
import { CheckForUpdateLocalState } from "App/overview/components/overview-screens/constants/overview.enum"
import {
  CheckForUpdateMode,
  SilentCheckForUpdateState,
} from "App/update/constants"
import {
  ReduxRootState,
  RejectableThunk,
  TmpDispatch,
} from "App/__deprecated__/renderer/store"
import { useEffect, useState } from "react"
import { CheckForUpdateState } from "App/update/constants/check-for-update-state.constant"
import { useDispatch, useSelector } from "react-redux"
import { checkForUpdate } from "App/update/actions"
import { DeviceType } from "App/device"
import { areAllReleasesDownloaded } from "App/update/selectors"

interface Props {
  deviceType: DeviceType
}

interface Result {
  checkForUpdateLocalState: CheckForUpdateLocalState | undefined
}

export const useUpdateFlowState = ({ deviceType }: Props): Result => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<TmpDispatch>()
  const [checkForUpdateLocalState, setCheckForUpdateLocalState] =
    useState<CheckForUpdateLocalState>()
  const [silentCheckForUpdatePromise, setSilentCheckForUpdatePromise] =
    useState<RejectableThunk>()
  const {
    data,
    checkForUpdateState,
    error,
    silentCheckForUpdate,
    needsForceUpdate,
  } = useSelector((state: ReduxRootState) => state.update)
  const osVersion = useSelector(
    (state: ReduxRootState) => state.device.data?.osVersion || ""
  )
  const allDownloaded = useSelector(areAllReleasesDownloaded)

  const { availableReleasesForUpdate } = data
  const silentCheck = () =>
    dispatch(
      checkForUpdate({ deviceType, mode: CheckForUpdateMode.SilentCheck })
    )

  useEffect(() => {
    if (
      silentCheckForUpdate === SilentCheckForUpdateState.Initial &&
      !needsForceUpdate &&
      osVersion
    ) {
      const actionResult = silentCheck()
      setSilentCheckForUpdatePromise(actionResult)
    }

    return () => {
      if (
        silentCheckForUpdatePromise &&
        silentCheckForUpdate === SilentCheckForUpdateState.Loading
      ) {
        silentCheckForUpdatePromise.abort()
        setSilentCheckForUpdatePromise(undefined)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [silentCheckForUpdate, needsForceUpdate, osVersion])

  useEffect(() => {
    if (needsForceUpdate) {
      return
    }
    if (
      silentCheckForUpdate === SilentCheckForUpdateState.Loading ||
      checkForUpdateState === CheckForUpdateState.Loading ||
      (checkForUpdateState === CheckForUpdateState.Initial &&
        silentCheckForUpdate === SilentCheckForUpdateState.Initial)
    ) {
      setCheckForUpdateLocalState(CheckForUpdateLocalState.Loading)
    } else if (allDownloaded) {
      setCheckForUpdateLocalState(CheckForUpdateLocalState.Install)
    } else if ((availableReleasesForUpdate || []).length > 0) {
      setCheckForUpdateLocalState(CheckForUpdateLocalState.Download)
    } else if (
      error ||
      [
        CheckForUpdateState.PerformedWithFailure,
        CheckForUpdateState.Failed,
      ].includes(checkForUpdateState) ||
      (checkForUpdateState === CheckForUpdateState.Initial &&
        [
          SilentCheckForUpdateState.Skipped,
          SilentCheckForUpdateState.Failed,
        ].includes(silentCheckForUpdate))
    ) {
      setCheckForUpdateLocalState(CheckForUpdateLocalState.Failed)
    } else if (
      [CheckForUpdateState.Loaded, CheckForUpdateState.Performed].includes(
        checkForUpdateState
      ) ||
      SilentCheckForUpdateState.Loaded === silentCheckForUpdate
    ) {
      setCheckForUpdateLocalState(CheckForUpdateLocalState.Loaded)
    }
  }, [
    silentCheckForUpdate,
    checkForUpdateState,
    needsForceUpdate,
    allDownloaded,
    availableReleasesForUpdate,
    error,
  ])
  return {
    checkForUpdateLocalState,
  }
}
