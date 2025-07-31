/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { AppUpdateAvailability } from "app-updater/models"
import { AppUpdater } from "app-updater/renderer"
import { AppActions } from "app-utils/renderer"
import { AppStore } from "app-store/models"
import { delayUntilAtLeast } from "app-utils/common"

export const setAppUpdaterCurrentVersion = createAction<string>(
  "appUpdater/setCurrentVersion"
)

export const setAppUpdaterNewVersionInfo = createAction<{
  version: string
  forced: boolean
}>("appUpdater/setNewVersionInfo")

export const setAppUpdateAvailability = createAction<AppUpdateAvailability>(
  "appUpdater/setUpdateAvailability"
)

export const setAppUpdaterDownloadProgress = createAction<number | undefined>(
  "appUpdater/setDownloadProgress"
)

export const setAppUpdaterCheckingForUpdate = createAction<boolean>(
  "appUpdater/setIsCheckingForUpdate"
)

export const setAppUpdaterSilentMode = createAction<boolean>(
  "appUpdater/setSilentMode"
)

export const setAppUpdaterError = createAction<boolean | undefined>(
  "appUpdater/setError"
)

export const setAppUpdaterModalsOpened = createAction<boolean>(
  "appUpdater/setModalOpened"
)

export const checkForAppUpdate = createAsyncThunk<
  boolean,
  { silent?: boolean } | undefined
>("appUpdater/checkForAppUpdate", async ({ silent } = {}, { dispatch }) => {
  let available = false

  dispatch(setAppUpdaterSilentMode(Boolean(silent)))
  dispatch(setAppUpdaterModalsOpened(true))
  dispatch(setAppUpdaterCheckingForUpdate(true))

  const response = await delayUntilAtLeast(AppUpdater.check, silent ? 0 : 1000)

  if (!response.ok) {
    dispatch(setAppUpdaterError(true))
  } else if (response.data) {
    available = true
    dispatch(setAppUpdaterError(false))
    dispatch(setAppUpdaterNewVersionInfo(response.data))
    dispatch(setAppUpdateAvailability(AppUpdateAvailability.Available))
  } else {
    dispatch(setAppUpdaterError(false))
    dispatch(setAppUpdateAvailability(AppUpdateAvailability.NotAvailable))
  }

  dispatch(setAppUpdaterCheckingForUpdate(false))

  return available
})

export const downloadAndInstallAppUpdate = createAsyncThunk(
  "appUpdater/downloadAndInstallAppUpdate",
  async (_, { dispatch }) => {
    dispatch(setAppUpdaterSilentMode(false))
    dispatch(setAppUpdaterDownloadProgress(0))
    dispatch(setAppUpdaterModalsOpened(true))
    const downloadResult = await AppUpdater.download()

    if (!downloadResult.ok) {
      dispatch(setAppUpdaterError(true))
      return
    }

    const installResult = await AppUpdater.install()

    if (!installResult.ok) {
      dispatch(setAppUpdaterError(true))
      return
    }
  }
)

export const checkAppVersion = createAsyncThunk(
  "appUpdater/checkAppVersion",
  async (_, { dispatch }) => {
    const currentVersion = await AppActions.getAppVersion()
    dispatch(setAppUpdaterCurrentVersion(currentVersion))
  }
)

export const cancelAppUpdate = createAsyncThunk<
  void,
  void,
  { state: AppStore }
>("appUpdater/cancelAppUpdateCheck", async (_, { dispatch }) => {
  await AppUpdater.cancel()
  dispatch(setAppUpdaterDownloadProgress(undefined))
  dispatch(setAppUpdaterCheckingForUpdate(false))
  dispatch(setAppUpdaterModalsOpened(false))
  dispatch(setAppUpdaterError(undefined))
})
