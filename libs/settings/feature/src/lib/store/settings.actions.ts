/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"

export const setCheckingForUpdate = createAction<boolean>(
  "settings/setCheckingForUpdate"
)

export const setCheckingForUpdateFailed = createAction<boolean>(
  "settings/setCheckingForUpdateFailed"
)

export const toggleApplicationUpdateAvailable = createAction<boolean>(
  "settings/toggleApplicationUpdateAvailable"
)

export const setLatestVersion = createAction<string>(
  "settings/setLatestVersion"
)

export const setCurrentVersion = createAction<string>(
  "settings/setCurrentVersion"
)

export const showUpdateAvailableModal = createAction(
  "settings/showUpdateAvailableModal"
)

export const hideUpdateAvailableModal = createAction(
  "settings/hideUpdateAvailableModal"
)

export const showUpdateNotAvailableModal = createAction(
  "settings/showUpdateNotAvailableModal"
)

export const hideUpdateNotAvailableModal = createAction(
  "settings/hideUpdateNotAvailableModal"
)

export const showUpdateDownloadProgressModal = createAction(
  "settings/showUpdateDownloadProgressModal"
)

export const hideUpdateDownloadProgressModal = createAction(
  "settings/hideUpdateDownloadProgressModal"
)

export const showUpdateDownloadedModal = createAction(
  "settings/showUpdateDownloadedModal"
)

export const hideUpdateDownloadedModal = createAction(
  "settings/hideUpdateDownloadedModal"
)

export const showUpdateInstallProgressModal = createAction(
  "settings/showUpdateInstallProgressModal"
)

export const hideUpdateInstallProgressModal = createAction(
  "settings/hideUpdateInstallProgressModal"
)

export const showUpdateCompletedModal = createAction(
  "settings/showUpdateCompletedModal"
)

export const hideUpdateCompletedModal = createAction(
  "settings/hideUpdateCompletedModal"
)

export const showUpdateFailedModal = createAction(
  "settings/showUpdateFailedModal"
)

export const hideUpdateFailedModal = createAction(
  "settings/hideUpdateFailedModal"
)

export const setUpdateDownloadProgress = createAction<number>(
  "settings/setUpdateDownloadProgress"
)

export const setUpdateInstallProgress = createAction<number>(
  "settings/setUpdateInstallProgress"
)
