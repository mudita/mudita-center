/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { answerMain } from "shared/utils"
import { AppUpdateEvent } from "electron/application-updater"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { setCheckingForUpdateFailed } from "Core/settings/actions/base.action"
import {
  setCheckingForUpdate,
  setLatestVersion,
  toggleApplicationUpdateAvailable,
} from "Core/settings/actions"
import { settingsStateSelector } from "Core/settings/selectors"

export const useApplicationUpdateEffects = () => {
  const dispatch = useDispatch<Dispatch>()
  const { checkingForUpdate } = useSelector(settingsStateSelector)

  useEffect(() => {
    return answerMain(AppUpdateEvent.Error, () => {
      dispatch(setCheckingForUpdateFailed(true))
      dispatch(setCheckingForUpdate(false))
    })
  }, [dispatch])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (checkingForUpdate) {
        dispatch(setCheckingForUpdateFailed(true))
        dispatch(setCheckingForUpdate(false))
      }
    }, 10000)

    return () => clearTimeout(timeoutId)
  }, [dispatch, checkingForUpdate])

  useEffect(() => {
    return answerMain(AppUpdateEvent.Available, (version) => {
      dispatch(setCheckingForUpdateFailed(false))
      dispatch(setCheckingForUpdate(false))
      dispatch(toggleApplicationUpdateAvailable(true))
      dispatch(setLatestVersion(version as string))
    })
  }, [dispatch])

  useEffect(() => {
    return answerMain(AppUpdateEvent.NotAvailable, () => {
      dispatch(toggleApplicationUpdateAvailable(false))
      dispatch(setCheckingForUpdate(false))
    })
  }, [dispatch])
}
