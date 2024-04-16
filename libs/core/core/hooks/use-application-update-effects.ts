/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import registerAvailableAppUpdateListener from "Core/__deprecated__/main/functions/register-avaible-app-update-listener"
import { setCheckingForUpdateFailed } from "Core/settings/actions/base.action"
import {
  setCheckingForUpdate,
  setLatestVersion,
  toggleApplicationUpdateAvailable,
} from "Core/settings/actions"
import registerNotAvailableAppUpdateListener from "Core/__deprecated__/main/functions/register-not-avaible-app-update-listener"
import registerErrorAppUpdateListener from "Core/__deprecated__/main/functions/register-error-app-update-listener"

export const useApplicationUpdateEffects = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    const unregister = registerErrorAppUpdateListener(() => {
      dispatch(setCheckingForUpdateFailed(true))
      dispatch(setCheckingForUpdate(false))
    })
    return () => unregister()
  }, [dispatch])

  useEffect(() => {
    const unregister = registerAvailableAppUpdateListener((version) => {
      dispatch(setCheckingForUpdateFailed(false))
      dispatch(setCheckingForUpdate(false))
      dispatch(toggleApplicationUpdateAvailable(true))
      dispatch(setLatestVersion(version as string))
    })

    return () => unregister()
  }, [dispatch])

  useEffect(() => {
    const unregister = registerNotAvailableAppUpdateListener(() => {
      dispatch(toggleApplicationUpdateAvailable(false))
      dispatch(setCheckingForUpdate(false))
    })

    return () => unregister()
  }, [dispatch])
}
