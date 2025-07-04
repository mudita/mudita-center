/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { AppUpdateAvailability } from "app-updater/models"
import { AppUpdater } from "app-updater/renderer"
import { AppActions } from "app-utils/renderer"
import { AppStore } from "app-store/models"

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
  dispatch(setAppUpdaterSilentMode(Boolean(silent)))
  dispatch(setAppUpdaterModalsOpened(true))
  dispatch(setAppUpdaterCheckingForUpdate(true))

  if (!silent) {
    // FIXME: Replace with delayUntilAtLeast
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  const response = await AppUpdater.check()

  if (response && "error" in response) {
    dispatch(setAppUpdaterError(true))
    dispatch(setAppUpdateAvailability(AppUpdateAvailability.NotAvailable))
  } else if (response) {
    dispatch(setAppUpdaterNewVersionInfo(response))
    dispatch(setAppUpdateAvailability(AppUpdateAvailability.Available))
  } else {
    dispatch(setAppUpdateAvailability(AppUpdateAvailability.NotAvailable))
  }
  dispatch(setAppUpdaterCheckingForUpdate(false))

  return response !== null
})

export const downloadAppUpdate = createAsyncThunk(
  "appUpdater/downloadAppUpdate",
  async (_, { dispatch }) => {
    dispatch(setAppUpdaterDownloadProgress(0))
    dispatch(setAppUpdaterModalsOpened(true))
    await AppUpdater.download()
  }
)

export const installAppUpdate = createAsyncThunk(
  "appUpdater/installAppUpdate",
  async (_) => {
    await AppUpdater.install()
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
